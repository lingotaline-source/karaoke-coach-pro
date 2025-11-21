import { useState } from 'react'
import { vocalExercises, programs, findExerciseById } from './VocalExercises/ExerciseLibrary'
import './VocalExercisesPanel.css'

function VocalExercisesPanel({ onClose }) {
    const [selectedLevel, setSelectedLevel] = useState('beginner')
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [timer, setTimer] = useState(0)
    const [completedExercises, setCompletedExercises] = useState([])

    const currentProgram = programs[selectedLevel]
    const currentExerciseId = currentProgram.exercises[currentExerciseIndex]
    const currentExercise = findExerciseById(currentExerciseId)

    const handleNext = () => {
        if (currentExerciseIndex < currentProgram.exercises.length - 1) {
            setCompletedExercises([...completedExercises, currentExerciseId])
            setCurrentExerciseIndex(currentExerciseIndex + 1)
            setTimer(0)
            setIsPlaying(false)
        } else {
            // Programme terminé
            alert('🎉 Félicitations ! Programme terminé !')
            onClose()
        }
    }

    const handlePrevious = () => {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(currentExerciseIndex - 1)
            setTimer(0)
            setIsPlaying(false)
        }
    }

    const handleSkip = () => {
        handleNext()
    }

    const progress = ((currentExerciseIndex + 1) / currentProgram.exercises.length) * 100

    if (!currentExercise) {
        return <div>Exercice non trouvé</div>
    }

    return (
        <div className="vocal-exercises-panel glass-effect">
            <div className="panel-header">
                <h2>🎤 Coach Vocal Pro</h2>
                <button onClick={onClose} className="btn-close">✕</button>
            </div>

            {/* Sélection du niveau */}
            <div className="level-selector">
                <button
                    className={selectedLevel === 'beginner' ? 'active' : ''}
                    onClick={() => {
                        setSelectedLevel('beginner')
                        setCurrentExerciseIndex(0)
                        setCompletedExercises([])
                    }}
                >
                    🌱 Débutant (10 min)
                </button>
                <button
                    className={selectedLevel === 'intermediate' ? 'active' : ''}
                    onClick={() => {
                        setSelectedLevel('intermediate')
                        setCurrentExerciseIndex(0)
                        setCompletedExercises([])
                    }}
                >
                    🌿 Intermédiaire (20 min)
                </button>
                <button
                    className={selectedLevel === 'advanced' ? 'active' : ''}
                    onClick={() => {
                        setSelectedLevel('advanced')
                        setCurrentExerciseIndex(0)
                        setCompletedExercises([])
                    }}
                >
                    🌳 Avancé (30 min)
                </button>
            </div>

            {/* Barre de progression */}
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                <span className="progress-text">
                    {currentExerciseIndex + 1} / {currentProgram.exercises.length}
                </span>
            </div>

            {/* Exercice actuel */}
            <div className="current-exercise">
                <div className="exercise-header">
                    <h3>{currentExercise.name}</h3>
                    <span className="exercise-duration">⏱️ {currentExercise.duration}s</span>
                </div>

                {currentExercise.benefits && (
                    <div className="exercise-benefits">
                        <strong>💡 Bénéfice :</strong> {currentExercise.benefits}
                    </div>
                )}

                <div className="exercise-instructions">
                    <h4>📋 Instructions :</h4>
                    <ol>
                        {currentExercise.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                </div>

                {currentExercise.hasAudio && (
                    <div className="audio-demo">
                        <p>🎵 Démonstration audio disponible</p>
                        <p className="audio-info">
                            Note de départ : {currentExercise.startNote || 'C4'}
                        </p>
                    </div>
                )}
            </div>

            {/* Contrôles */}
            <div className="exercise-controls">
                <button
                    onClick={handlePrevious}
                    disabled={currentExerciseIndex === 0}
                    className="btn-secondary"
                >
                    ⬅️ Précédent
                </button>

                <button
                    onClick={handleSkip}
                    className="btn-secondary"
                >
                    ⏭️ Passer
                </button>

                <button
                    onClick={handleNext}
                    className="btn-primary"
                >
                    {currentExerciseIndex === currentProgram.exercises.length - 1
                        ? '✅ Terminer'
                        : 'Suivant ➡️'}
                </button>
            </div>

            {/* Résumé du programme */}
            <div className="program-summary">
                <h4>📊 Programme {currentProgram.name}</h4>
                <p>Durée totale : ~{currentProgram.duration} minutes</p>
                <p>Exercices complétés : {completedExercises.length} / {currentProgram.exercises.length}</p>
            </div>
        </div>
    )
}

export default VocalExercisesPanel
