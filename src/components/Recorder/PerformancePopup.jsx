import { useEffect, useState } from 'react'
import './PerformancePopup.css'

function PerformancePopup({ performance, onClose }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Animation d'entrée
        setTimeout(() => setIsVisible(true), 100)
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(onClose, 300)
    }

    if (!performance) return null

    const getScoreColor = () => {
        if (performance.score >= 80) return '#10b981'
        if (performance.score >= 60) return '#8b5cf6'
        if (performance.score >= 40) return '#3b82f6'
        return '#f59e0b'
    }

    const getScoreEmoji = () => {
        if (performance.score >= 80) return '🌟'
        if (performance.score >= 60) return '🎉'
        if (performance.score >= 40) return '😊'
        return '💪'
    }

    return (
        <>
            <div className="popup-overlay" onClick={handleClose} />
            <div className={`performance-popup ${isVisible ? 'visible' : ''}`}>
                <button className="popup-close" onClick={handleClose}>✕</button>

                <div className="popup-header">
                    <div className="popup-emoji">{getScoreEmoji()}</div>
                    <h2>Analyse de Performance</h2>
                </div>

                <div className="popup-score" style={{ borderColor: getScoreColor() }}>
                    <div className="score-circle" style={{ background: `conic-gradient(${getScoreColor()} ${performance.score * 3.6}deg, var(--bg-tertiary) 0deg)` }}>
                        <div className="score-inner">
                            <div className="score-number">{performance.score}</div>
                            <div className="score-max">/100</div>
                        </div>
                    </div>
                    <div className="score-rating" style={{ color: getScoreColor() }}>
                        {performance.rating}
                    </div>
                </div>

                <div className="popup-stats">
                    <div className="stat-card">
                        <div className="stat-icon">⏱️</div>
                        <div className="stat-info">
                            <div className="stat-label">Durée</div>
                            <div className="stat-value">{performance.duration}s</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🎵</div>
                        <div className="stat-info">
                            <div className="stat-label">Notes détectées</div>
                            <div className="stat-value">{performance.notesDetected}</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">✨</div>
                        <div className="stat-info">
                            <div className="stat-label">Justesse</div>
                            <div className="stat-value">{performance.avgClarity}%</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🔊</div>
                        <div className="stat-info">
                            <div className="stat-label">Volume</div>
                            <div className="stat-value">{performance.avgAudioLevel}%</div>
                        </div>
                    </div>
                </div>

                <div className="popup-message">
                    <p>{performance.coachMessage}</p>
                </div>

                <button className="btn-primary popup-action" onClick={handleClose}>
                    Continuer 🎤
                </button>
            </div>
        </>
    )
}

export default PerformancePopup
