import { useState, useEffect, useRef } from 'react'
import { read, utils } from 'xlsx'
import './FavoritesList.css'

function FavoritesList({ onSelectSong, currentVideoUrl }) {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('karaoke-favorites')
        return saved ? JSON.parse(saved) : []
    })

    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('karaoke-history')
        return saved ? JSON.parse(saved) : []
    })

    const [activeTab, setActiveTab] = useState('favorites')
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('date') // 'date', 'title', 'artist'
    const [sortOrder, setSortOrder] = useState('desc') // 'asc', 'desc'
    const [notification, setNotification] = useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef(null)

    // Sauvegarder les favoris dans localStorage
    useEffect(() => {
        localStorage.setItem('karaoke-favorites', JSON.stringify(favorites))
    }, [favorites])

    // Sauvegarder l'historique dans localStorage
    useEffect(() => {
        localStorage.setItem('karaoke-history', JSON.stringify(history))
    }, [history])

    // Ajouter à l'historique quand une vidéo est sélectionnée
    useEffect(() => {
        if (currentVideoUrl) {
            addToHistory(currentVideoUrl)
        }
    }, [currentVideoUrl])

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 3000)
    }

    const extractVideoId = (url) => {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
        return match ? match[1] : null
    }

    const addToHistory = async (url) => {
        const videoId = extractVideoId(url)
        if (!videoId) return

        // Vérifier si la vidéo existe déjà pour éviter les appels API inutiles
        const exists = history.find(item => item.videoId === videoId)
        if (exists) return

        let title = 'Vidéo YouTube'
        try {
            const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`)
            const data = await response.json()
            if (data.title) {
                title = data.title
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du titre:', error)
        }

        setHistory(prev => {
            // Double vérification au cas où l'état a changé pendant le fetch
            const exists = prev.find(item => item.videoId === videoId)
            if (exists) return prev

            const newItem = {
                id: Date.now(),
                videoId,
                url,
                title,
                playedDate: new Date().toISOString()
            }

            const updated = [newItem, ...prev].slice(0, 50)
            return updated
        })
    }

    const addToFavorites = (item) => {
        const exists = favorites.find(fav => fav.url === item.url)
        if (exists) {
            showNotification('Cette vidéo est déjà dans vos favoris', 'info')
            return
        }

        const newFavorite = {
            id: Date.now(),
            title: item.title,
            artist: 'YouTube',
            url: item.url,
            addedDate: new Date().toISOString()
        }
        setFavorites(prev => [newFavorite, ...prev])
        showNotification('Ajouté aux favoris ! ⭐')
    }

    const removeFromFavorites = (id) => {
        setFavorites(prev => prev.filter(fav => fav.id !== id))
    }

    const removeFromHistory = (id) => {
        setHistory(prev => prev.filter(item => item.id !== id))
    }

    const clearHistory = () => {
        if (window.confirm('Voulez-vous vraiment effacer tout l\'historique ?')) {
            setHistory([])
        }
    }

    // Drag & Drop handlers
    const handleDragEnter = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const files = e.dataTransfer.files
        if (files.length > 0) {
            handleFileUpload({ target: { files } })
        }
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        setIsLoading(true)
        const reader = new FileReader()

        reader.onload = (event) => {
            try {
                const data = new Uint8Array(event.target.result)
                const workbook = read(data, { type: 'array' })
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
                const jsonData = utils.sheet_to_json(firstSheet)

                const newFavorites = jsonData.map((row, index) => ({
                    id: Date.now() + index,
                    title: row.Titre || row.Title || row.titre || 'Sans titre',
                    artist: row.Artiste || row.Artist || row.artiste || 'Inconnu',
                    url: row.URL || row.url || row.Lien || row.lien || '',
                    addedDate: new Date().toISOString()
                })).filter(song => song.url)

                setFavorites(prev => [...newFavorites, ...prev])
                setIsLoading(false)
                showNotification(`${newFavorites.length} chansons importées !`)
            } catch (error) {
                console.error('Erreur lors de la lecture du fichier:', error)
                setIsLoading(false)
                showNotification('Erreur lors de l\'import', 'error')
            }
        }

        reader.readAsArrayBuffer(file)
    }

    // Tri et filtrage
    const getSortedAndFilteredItems = (items) => {
        let filtered = items.filter(item => {
            const searchLower = searchTerm.toLowerCase()
            const title = (item.title || '').toLowerCase()
            const artist = (item.artist || '').toLowerCase()
            return title.includes(searchLower) || artist.includes(searchLower)
        })

        filtered.sort((a, b) => {
            let comparison = 0

            switch (sortBy) {
                case 'title':
                    comparison = (a.title || '').localeCompare(b.title || '')
                    break
                case 'artist':
                    comparison = (a.artist || '').localeCompare(b.artist || '')
                    break
                case 'date':
                default:
                    const dateA = new Date(a.addedDate || a.playedDate || 0)
                    const dateB = new Date(b.addedDate || b.playedDate || 0)
                    comparison = dateB - dateA
                    break
            }

            return sortOrder === 'asc' ? comparison : -comparison
        })

        return filtered
    }

    const currentItems = activeTab === 'favorites' ? favorites : history
    const displayItems = getSortedAndFilteredItems(currentItems)

    return (
        <div className="favorites-container">
            {notification && (
                <div className={`notification-toast ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            {/* Header avec titre et compteurs */}
            <div className="favorites-header">
                <div className="header-title">
                    <span className="header-icon">📚</span>
                    <h2>Ma Bibliothèque</h2>
                </div>
                <div className="header-counters">
                    <div className="counter-badge favorites-badge">
                        <span className="counter-icon">⭐</span>
                        <span className="counter-value">{favorites.length}</span>
                    </div>
                    <div className="counter-badge history-badge">
                        <span className="counter-icon">🕒</span>
                        <span className="counter-value">{history.length}</span>
                    </div>
                </div>
            </div>

            {/* Navigation verticale */}
            <div className="vertical-nav">
                <button
                    className={`nav-tab ${activeTab === 'favorites' ? 'active' : ''}`}
                    onClick={() => setActiveTab('favorites')}
                >
                    <span className="tab-icon">⭐</span>
                    <span className="tab-label">Favoris</span>
                    <span className="tab-count">{favorites.length}</span>
                </button>

                <button
                    className={`nav-tab ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    <span className="tab-icon">🕒</span>
                    <span className="tab-label">Historique</span>
                    <span className="tab-count">{history.length}</span>
                </button>
            </div>

            {/* Zone d'import avec drag & drop */}
            <div
                className={`import-zone ${isDragging ? 'dragging' : ''}`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                />
                <div className="import-content">
                    <span className="import-icon">📁</span>
                    <span className="import-text">
                        {isDragging ? 'Déposez le fichier ici' : 'Importer Excel'}
                    </span>
                    <span className="import-hint">ou glissez-déposez</span>
                </div>
            </div>

            {/* Barre de recherche et tri */}
            <div className="search-sort-bar">
                <div className="search-input-wrapper">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="sort-controls">
                    <select
                        className="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="date">📅 Date</option>
                        <option value="title">🎵 Titre</option>
                        <option value="artist">🎤 Artiste</option>
                    </select>

                    <button
                        className="sort-order-btn"
                        onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                        title={sortOrder === 'asc' ? 'Croissant' : 'Décroissant'}
                    >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
            </div>

            {/* Liste des éléments */}
            <div className="items-list">
                {isLoading && (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Chargement...</p>
                    </div>
                )}

                {!isLoading && displayItems.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">
                            {activeTab === 'favorites' ? '⭐' : '🕒'}
                        </div>
                        <p className="empty-title">
                            {activeTab === 'favorites' ? 'Aucun favori' : 'Aucun historique'}
                        </p>
                        <p className="empty-subtitle">
                            {activeTab === 'favorites'
                                ? 'Importez un Excel ou ajoutez depuis l\'historique'
                                : 'Lancez une vidéo pour commencer'}
                        </p>
                    </div>
                )}

                {!isLoading && displayItems.map(item => (
                    <div key={item.id} className="song-item">
                        <div className="song-info">
                            <div className="song-title" title={item.title}>{item.title}</div>
                            <div className="song-artist" title={item.artist}>{item.artist || 'YouTube'}</div>
                            <div className="song-date">
                                {new Date(item.addedDate || item.playedDate).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="song-actions">
                            <button
                                className="action-btn play-btn"
                                onClick={() => onSelectSong(item.url)}
                                title="Lire"
                            >
                                ▶️
                            </button>

                            {activeTab === 'history' && (
                                <button
                                    className="action-btn favorite-btn"
                                    onClick={() => addToFavorites(item)}
                                    title="Ajouter aux favoris"
                                >
                                    ⭐
                                </button>
                            )}

                            <button
                                className="action-btn delete-btn"
                                onClick={() => activeTab === 'favorites'
                                    ? removeFromFavorites(item.id)
                                    : removeFromHistory(item.id)}
                                title="Supprimer"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bouton effacer historique */}
            {activeTab === 'history' && history.length > 0 && (
                <button className="clear-history-btn" onClick={clearHistory}>
                    🗑️ Effacer l'historique
                </button>
            )}
        </div>
    )
}

export default FavoritesList
