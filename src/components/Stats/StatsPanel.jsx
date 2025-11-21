import { useMemo } from 'react'
import './StatsPanel.css'

function StatsPanel({ recordings }) {
    const stats = useMemo(() => {
        if (!recordings || recordings.length === 0) {
            return {
                totalRecordings: 0,
                averageScore: 0,
                bestScore: 0,
                totalDuration: 0,
                totalNotes: 0,
                averageClarity: 0
            }
        }

        const validRecordings = recordings.filter(r => r.performance)

        const totalScore = validRecordings.reduce((sum, r) => sum + (r.performance.score || 0), 0)
        const totalDuration = validRecordings.reduce((sum, r) => sum + (r.performance.duration || 0), 0)
        const totalNotes = validRecordings.reduce((sum, r) => sum + (r.performance.notesDetected || 0), 0)
        const totalClarity = validRecordings.reduce((sum, r) => sum + (r.performance.avgClarity || 0), 0)

        const bestScore = Math.max(...validRecordings.map(r => r.performance.score || 0), 0)

        return {
            totalRecordings: recordings.length,
            averageScore: validRecordings.length > 0 ? Math.round(totalScore / validRecordings.length) : 0,
            bestScore,
            totalDuration: Math.round(totalDuration / 1000), // en secondes
            totalNotes,
            averageClarity: validRecordings.length > 0 ? Math.round(totalClarity / validRecordings.length) : 0
        }
    }, [recordings])

    const getScoreColor = (score) => {
        if (score >= 80) return '#10b981'
        if (score >= 60) return '#8b5cf6'
        if (score >= 40) return '#3b82f6'
        return '#f59e0b'
    }

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}m ${secs}s`
    }

    return (
        <div className="stats-panel glass-effect">
            <div className="stats-header">
                <span className="stats-icon">📊</span>
                <h3>Statistiques</h3>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon-large">🎤</div>
                    <div className="stat-value">{stats.totalRecordings}</div>
                    <div className="stat-label">Enregistrements</div>
                </div>

                <div className="stat-card" style={{ borderColor: getScoreColor(stats.averageScore) }}>
                    <div className="stat-icon-large">⭐</div>
                    <div className="stat-value" style={{ color: getScoreColor(stats.averageScore) }}>
                        {stats.averageScore}
                    </div>
                    <div className="stat-label">Score Moyen</div>
                </div>

                <div className="stat-card" style={{ borderColor: getScoreColor(stats.bestScore) }}>
                    <div className="stat-icon-large">🏆</div>
                    <div className="stat-value" style={{ color: getScoreColor(stats.bestScore) }}>
                        {stats.bestScore}
                    </div>
                    <div className="stat-label">Meilleur Score</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-large">⏱️</div>
                    <div className="stat-value">{formatDuration(stats.totalDuration)}</div>
                    <div className="stat-label">Temps Total</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-large">🎵</div>
                    <div className="stat-value">{stats.totalNotes}</div>
                    <div className="stat-label">Notes Détectées</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-large">✨</div>
                    <div className="stat-value">{stats.averageClarity}%</div>
                    <div className="stat-label">Justesse Moyenne</div>
                </div>
            </div>

            {stats.totalRecordings > 0 && (
                <div className="progress-message">
                    <p>
                        {stats.averageScore >= 80 && "🌟 Excellent travail ! Continue comme ça !"}
                        {stats.averageScore >= 60 && stats.averageScore < 80 && "🎉 Très bien ! Tu progresses !"}
                        {stats.averageScore >= 40 && stats.averageScore < 60 && "💪 Bon début ! Continue à t'entraîner !"}
                        {stats.averageScore < 40 && "🎯 Persévère ! Chaque entraînement compte !"}
                    </p>
                </div>
            )}
        </div>
    )
}

export default StatsPanel
