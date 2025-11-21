import React from 'react'
import { ACHIEVEMENTS } from '../../data/achievements'
import './TrophiesPanel.css'

function TrophiesPanel({ unlockedTrophies, onClose }) {
    return (
        <div className="trophies-overlay" onClick={onClose}>
            <div className="trophies-modal glass-effect" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>🏆 Salle des Trophées</h2>

                <div className="trophies-grid">
                    {ACHIEVEMENTS.map(achievement => {
                        const isUnlocked = unlockedTrophies.includes(achievement.id)
                        return (
                            <div key={achievement.id} className={`trophy-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                                <div className="trophy-icon">
                                    {isUnlocked ? achievement.icon : '🔒'}
                                </div>
                                <div className="trophy-info">
                                    <h3>{achievement.title}</h3>
                                    <p>{achievement.description}</p>
                                </div>
                                {isUnlocked && <div className="trophy-badge">Débloqué</div>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default TrophiesPanel
