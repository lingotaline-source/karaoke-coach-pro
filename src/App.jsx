import { useState, useRef, useEffect } from 'react'
import './App.css'
import FavoritesList from './components/Player/FavoritesList'
import YouTubePlayer from './components/Player/YouTubePlayer'
import VoiceRecorder from './components/Recorder/VoiceRecorder'
import CoachAvatar from './components/Coach/CoachAvatar'
import VocalExercisesPanel from './components/Coach/VocalExercisesPanel'
import PerformancePopup from './components/Recorder/PerformancePopup'
import StatsPanel from './components/Stats/StatsPanel'
import VocalRangeTester from './components/Coach/VocalRangeTester'
import TrophiesPanel from './components/Gamification/TrophiesPanel'
import HelpPanel from './components/Help/HelpPanel'
import { ACHIEVEMENTS } from './data/achievements'
import { useKeyboardShortcuts, KeyboardShortcutsHelp } from './hooks/useKeyboardShortcuts'
import { exportToCSV, exportToJSON } from './utils/exportData'
import { useTheme } from './contexts/ThemeContext'

function App() {
    const [videoUrl, setVideoUrl] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [recordings, setRecordings] = useState(() => {
        // Charger l'historique depuis localStorage
        const saved = localStorage.getItem('karaoke-recordings')
        return saved ? JSON.parse(saved) : []
    })
    const [coachMood, setCoachMood] = useState('neutral')
    const [coachMessage, setCoachMessage] = useState('Prêt à chanter ? Clique sur Enregistrer !')
    const [showExercises, setShowExercises] = useState(false)
    const [showPerformancePopup, setShowPerformancePopup] = useState(false)
    const [latestPerformance, setLatestPerformance] = useState(null)
    const [showShortcutsHelp, setShowShortcutsHelp] = useState(false)
    const [showVocalTester, setShowVocalTester] = useState(false)
    const [showHelp, setShowHelp] = useState(false)
    const { theme, toggleTheme } = useTheme()
    const playerRef = useRef(null)

    const handleStartRecording = () => {
        setIsRecording(true)
        setCoachMood('encouraging')
        setCoachMessage('Allez, montre-moi ce que tu sais faire ! 🎤')
    }

    const handleStopRecording = () => {
        setIsRecording(false)
        setCoachMood('happy')
        setCoachMessage('Bien joué ! Analysons ta performance...')
    }

    const [showTrophies, setShowTrophies] = useState(false)
    const [unlockedTrophies, setUnlockedTrophies] = useState(() => {
        const saved = localStorage.getItem('karaoke-trophies')
        return saved ? JSON.parse(saved) : []
    })

    const checkAchievements = (newRecording, allRecordings) => {
        const newUnlocked = []

        ACHIEVEMENTS.forEach(achievement => {
            if (!unlockedTrophies.includes(achievement.id)) {
                if (achievement.condition(newRecording.performance, allRecordings.length)) {
                    newUnlocked.push(achievement.id)
                }
            }
        })

        if (newUnlocked.length > 0) {
            const updatedTrophies = [...unlockedTrophies, ...newUnlocked]
            setUnlockedTrophies(updatedTrophies)
            localStorage.setItem('karaoke-trophies', JSON.stringify(updatedTrophies))
            // On pourrait ajouter une notification ici
            setCoachMessage(`🏆 Bravo ! Tu as débloqué ${newUnlocked.length} nouveau(x) trophée(s) !`)
            setCoachMood('excited')
        }
    }

    const handleRecordingComplete = (audioUrl, audioBlob, performanceStats) => {
        const newRecording = {
            id: Date.now(),
            url: audioUrl,
            blob: audioBlob,
            date: new Date().toLocaleString(),
            performance: performanceStats
        }

        const updatedRecordings = [newRecording, ...recordings]
        setRecordings(updatedRecordings)

        // Sauvegarder dans localStorage (sans les blobs)
        const recordingsToSave = updatedRecordings.map(rec => ({
            id: rec.id,
            date: rec.date,
            performance: rec.performance
        }))
        localStorage.setItem('karaoke-recordings', JSON.stringify(recordingsToSave))

        // Vérifier les trophées
        checkAchievements(newRecording, updatedRecordings)

        // Afficher le popup de performance
        setLatestPerformance(performanceStats)
        setShowPerformancePopup(true)
    }

    const toggleRecording = () => {
        if (isRecording) {
            handleStopRecording()
        } else {
            handleStartRecording()
        }
    }

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    }

    // Raccourcis clavier
    useKeyboardShortcuts({
        onToggleRecording: toggleRecording,
        onTogglePlayPause: () => {
            // Cette fonction sera gérée par le YouTubePlayer
        },
        onToggleFullscreen: toggleFullscreen,
        isRecording
    })


    return (
        <div className="app">
            <header className="app-header glass-effect">
                <div className="logo">
                    <span className="logo-icon">🎤</span>
                    <span className="logo-text">Karaoké <span className="gradient-text">Coach Pro</span></span>
                </div>

                <div className="header-actions">
                    <button
                        className="icon-btn"
                        onClick={() => exportToCSV(recordings)}
                        title="Exporter en CSV"
                    >
                        📊
                    </button>

                    <button
                        className="icon-btn"
                        onClick={() => exportToJSON(recordings)}
                        title="Exporter en JSON"
                    >
                        💾
                    </button>

                    <button
                        className="icon-btn"
                        onClick={() => setShowTrophies(true)}
                        title="Trophées"
                    >
                        🏆
                    </button>

                    <button
                        className="icon-btn"
                        onClick={() => setShowHelp(true)}
                        title="Aide et Guide d'utilisation"
                    >
                        ❓
                    </button>

                    <button
                        className="icon-btn"
                        onClick={() => setShowShortcutsHelp(!showShortcutsHelp)}
                        title="Raccourcis clavier"
                    >
                        ⌨️
                    </button>

                    <button
                        className="icon-btn theme-toggle"
                        onClick={toggleTheme}
                        title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>
            </header>

            {showTrophies && (
                <TrophiesPanel
                    unlockedTrophies={unlockedTrophies}
                    onClose={() => setShowTrophies(false)}
                />
            )}

            {showShortcutsHelp && (
                <div className="shortcuts-overlay" onClick={() => setShowShortcutsHelp(false)}>
                    <div className="shortcuts-modal" onClick={(e) => e.stopPropagation()}>
                        <KeyboardShortcutsHelp />
                        <button className="btn-primary" onClick={() => setShowShortcutsHelp(false)}>
                            Fermer
                        </button>
                    </div>
                </div>
            )}

            {showHelp && (
                <HelpPanel onClose={() => setShowHelp(false)} />
            )}

            <main className="main-content">
                <div className="karaoke-container">
                    <div className="left-sidebar">
                        <FavoritesList onSelectSong={setVideoUrl} currentVideoUrl={videoUrl} />

                        {recordings.length > 0 && (
                            <div className="recordings-list glass-effect">
                                <h3>📼 Historique</h3>
                                {recordings.slice(0, 5).map((recording) => (
                                    <div key={recording.id} className="recording-item">
                                        <div className="recording-header">
                                            <span className="recording-date">📅 {recording.date}</span>
                                            {recording.performance && (
                                                <span className={`recording-score score-${recording.performance.rating.toLowerCase().replace(/\s/g, '-')}`}>
                                                    {recording.performance.score}/100
                                                </span>
                                            )}
                                        </div>

                                        {recording.performance && (
                                            <div className="performance-details">
                                                <div className="performance-stat">
                                                    <span className="stat-label">🎯 {recording.performance.rating}</span>
                                                </div>
                                                <div className="performance-stat">
                                                    <span className="stat-label">⏱️ {recording.performance.duration}s</span>
                                                </div>
                                            </div>
                                        )}

                                        {recording.url && <audio controls src={recording.url} style={{ width: '100%', marginTop: '10px' }} />}
                                    </div>
                                ))}
                                {recordings.length > 5 && (
                                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px' }}>
                                        +{recordings.length - 5} autres enregistrements
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="player-section">
                        <YouTubePlayer videoUrl={videoUrl} setVideoUrl={setVideoUrl} />

                        {/* Bloc-notes Paroles */}
                        <div className="lyrics-notepad glass-effect" style={{ marginBottom: 'var(--spacing-md)', padding: 'var(--spacing-md)' }}>
                            <details>
                                <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)' }}>📝 Paroles (Bloc-notes)</summary>
                                <textarea
                                    placeholder="Collez les paroles ici..."
                                    style={{
                                        width: '100%',
                                        height: '150px',
                                        background: 'var(--bg-tertiary)',
                                        color: 'var(--text-primary)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 'var(--radius-sm)',
                                        padding: 'var(--spacing-sm)',
                                        resize: 'vertical'
                                    }}
                                />
                            </details>
                        </div>

                        <div className="recording-panel glass-effect">
                            <div className="recording-controls">
                                <button
                                    className={isRecording ? 'btn-danger' : 'btn-primary'}
                                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                                >
                                    {isRecording ? '⏹️ Arrêter' : '🎤 Enregistrer'}
                                </button>
                                <button
                                    className="btn-secondary"
                                    onClick={() => setShowExercises(true)}
                                    style={{ marginLeft: 'var(--spacing-sm)' }}
                                >
                                    🎵 Exercices Vocaux
                                </button>
                                <button
                                    className="btn-secondary"
                                    onClick={() => setShowVocalTester(true)}
                                    style={{ marginLeft: 'var(--spacing-sm)' }}
                                >
                                    🎤 Test de Tessiture
                                </button>
                            </div>

                            <div style={{ display: isRecording ? 'block' : 'none' }}>
                                <VoiceRecorder
                                    isRecording={isRecording}
                                    onRecordingComplete={handleRecordingComplete}
                                />
                            </div>

                            <CoachAvatar mood={coachMood} message={coachMessage} />

                            {/* Affichage simple des résultats */}
                            {latestPerformance && !isRecording && (
                                <div className="performance-summary glass-effect">
                                    <h3>🎯 Dernière Performance</h3>
                                    <div className="summary-score" style={{
                                        background: `linear-gradient(135deg, ${latestPerformance.score >= 80 ? '#10b981, #059669' :
                                            latestPerformance.score >= 60 ? '#8b5cf6, #7c3aed' :
                                                latestPerformance.score >= 40 ? '#3b82f6, #2563eb' :
                                                    '#f59e0b, #d97706'
                                            })`
                                    }}>
                                        <div className="summary-score-number">{latestPerformance.score}/100</div>
                                        <div className="summary-rating">{latestPerformance.rating}</div>
                                    </div>
                                    <div className="summary-stats">
                                        <div><strong>⏱️ Durée:</strong> {latestPerformance.duration}s</div>
                                        <div><strong>🎵 Notes:</strong> {latestPerformance.notesDetected}</div>
                                        <div><strong>✨ Justesse:</strong> {latestPerformance.avgClarity}%</div>
                                        <div><strong>🔊 Volume:</strong> {latestPerformance.avgAudioLevel}%</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Panneau de statistiques */}
                        <StatsPanel recordings={recordings} />
                    </div>
                </div>
            </main>

            {/* Panneau d'exercices vocaux */}
            {showExercises && (
                <>
                    <div className="vocal-exercises-overlay" onClick={() => setShowExercises(false)} />
                    <VocalExercisesPanel onClose={() => setShowExercises(false)} />
                </>
            )}

            {/* Test de tessiture */}
            {showVocalTester && (
                <VocalRangeTester onClose={() => setShowVocalTester(false)} />
            )}

            {/* Popup de performance */}
            {showPerformancePopup && latestPerformance && (
                <PerformancePopup
                    performance={latestPerformance}
                    onClose={() => setShowPerformancePopup(false)}
                />
            )}
        </div>
    )
}

export default App

