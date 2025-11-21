import { useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player/youtube'
import { searchYouTubeVideos, getYouTubeSuggestions } from '../../utils/youtubeApi'
import './YouTubePlayer.css'

function YouTubePlayer({ videoUrl, setVideoUrl }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const dropdownRef = useRef(null)

    // Fermer le dropdown si on clique ailleurs
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Obtenir les suggestions quand l'utilisateur tape
    useEffect(() => {
        const getSuggestions = async () => {
            if (searchQuery.length > 2) {
                const results = await getYouTubeSuggestions(searchQuery + ' karaoke')
                setSuggestions(results.slice(0, 8))
                setShowDropdown(true)
            } else {
                setSuggestions([])
                setShowDropdown(false)
            }
        }

        const debounceTimer = setTimeout(getSuggestions, 300)
        return () => clearTimeout(debounceTimer)
    }, [searchQuery])

    const handleSearch = async (query) => {
        setIsSearching(true)
        setShowDropdown(false)

        const results = await searchYouTubeVideos(query || searchQuery, 6)
        setSearchResults(results)
        setIsSearching(false)
    }

    const handleSelectVideo = (video) => {
        setVideoUrl(video.url)
        setIsPlaying(true)
        setSearchResults([])
        setSearchQuery('')
    }

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion)
        setShowDropdown(false)
        handleSearch(suggestion)
    }

    return (
        <div className="youtube-player-container">
            <div className="video-input-section glass-effect">
                <h2>🎵 Rechercher sur YouTube</h2>

                <div className="search-container" ref={dropdownRef}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Rechercher une chanson karaoké..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                            className="search-input"
                        />
                        <button
                            onClick={() => handleSearch()}
                            className="btn-primary"
                            disabled={isSearching}
                        >
                            {isSearching ? '⏳' : '🔍'} Rechercher
                        </button>
                    </div>

                    {showDropdown && suggestions.length > 0 && (
                        <div className="suggestions-dropdown">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    <span className="suggestion-icon">🔍</span>
                                    <span className="suggestion-text">{suggestion}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {searchResults.length > 0 && (
                    <div className="search-results">
                        <p className="results-title">Résultats de recherche :</p>
                        <div className="results-grid">
                            {searchResults.map((video) => (
                                <div
                                    key={video.id}
                                    className="video-card"
                                    onClick={() => handleSelectVideo(video)}
                                >
                                    <img src={video.thumbnail} alt={video.title} />
                                    <div className="video-info">
                                        <h4>{video.title}</h4>
                                        <p>{video.channelTitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {videoUrl && (
                <div className="player-wrapper glass-effect">
                    <ReactPlayer
                        url={videoUrl}
                        playing={isPlaying}
                        controls
                        width="100%"
                        height="100%"
                        className="react-player"
                        config={{
                            youtube: {
                                playerVars: {
                                    origin: window.location.origin,
                                    enablejsapi: 1,
                                    modestbranding: 1,
                                    rel: 0
                                }
                            }
                        }}
                        onError={(e) => {
                            console.error('Erreur de lecture:', e)
                            alert('⚠️ Cette vidéo ne peut pas être lue ici.\n\nEssayez une autre vidéo karaoké ou recherchez des chaînes qui autorisent la lecture externe.')
                        }}
                    />
                </div>
            )}

            {!videoUrl && searchResults.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">🎬</div>
                    <p>Recherchez une chanson karaoké pour commencer</p>
                </div>
            )}
        </div>
    )
}

export default YouTubePlayer
