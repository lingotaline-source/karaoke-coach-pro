import { useState } from 'react'
import './CoachPanel.css'
import VocalEngine from './VocalEngine'

function CoachPanel() {
    const [selectedExercise, setSelectedExercise] = useState(null)

    const exercises = [
        {
            id: 'warmup-scale',
            name: 'Gamme Majeure',
            icon: '🎹',
            description: 'Échauffement vocal avec une gamme Do majeur',
            category: 'Échauffement',
            difficulty: 'Débutant'
        },
        {
            id: 'breathing',
            name: 'Exercice de Respiration',
            icon: '🫁',
            description: 'Contrôle du souffle et de la capacité pulmonaire',
            category: 'Respiration',
            difficulty: 'Tous niveaux'
        },
        {
            id: 'arpeggio',
            name: 'Arpèges',
            icon: '🎼',
            description: 'Travail de l\'agilité vocale sur des arpèges',
            category: 'Technique',
            difficulty: 'Intermédiaire'
        },
        {
            id: 'pitch-accuracy',
            name: 'Justesse',
            icon: '🎯',
            description: 'Entraînement à la précision des notes',
            category: 'Justesse',
            difficulty: 'Tous niveaux'
        }
    ]

    return (
        <div className="coach-panel">
            <div className="coach-header">
                <h1>🎯 Coach Vocal Pro</h1>
                <p className="coach-subtitle">
                    Exercices professionnels pour développer votre technique vocale
                </p>
            </div>

            <div className="exercises-grid">
                {exercises.map((exercise) => (
                    <div
                        key={exercise.id}
                        className={`exercise-card glass-effect ${selectedExercise?.id === exercise.id ? 'selected' : ''}`}
                        onClick={() => setSelectedExercise(exercise)}
                    >
                        <div className="exercise-icon">{exercise.icon}</div>
                        <h3>{exercise.name}</h3>
                        <p className="exercise-description">{exercise.description}</p>
                        <div className="exercise-meta">
                            <span className="badge">{exercise.category}</span>
                            <span className="badge difficulty">{exercise.difficulty}</span>
                        </div>
                    </div>
                ))}
            </div>

            {selectedExercise && (
                <div className="exercise-player glass-effect fade-in">
                    <h2>
                        {selectedExercise.icon} {selectedExercise.name}
                    </h2>
                    <VocalEngine exercise={selectedExercise} />
                </div>
            )}

            {!selectedExercise && (
                <div className="empty-state">
                    <div className="empty-icon">🎼</div>
                    <p>Sélectionnez un exercice pour commencer</p>
                </div>
            )}
        </div>
    )
}

export default CoachPanel
