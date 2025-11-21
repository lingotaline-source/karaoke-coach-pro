import { useState, useEffect } from 'react'
import * as Tone from 'tone'
import './VocalEngine.css'

function VocalEngine({ exercise }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentNote, setCurrentNote] = useState('')

    const playScale = async () => {
        await Tone.start()

        const synth = new Tone.Synth({
            oscillator: { type: 'sine' },
            envelope: {
                attack: 0.1,
                decay: 0.2,
                sustain: 0.5,
                release: 1
            }
        }).toDestination()

        const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
        const now = Tone.now()

        setIsPlaying(true)

        notes.forEach((note, index) => {
            const time = now + index * 0.8
            synth.triggerAttackRelease(note, '0.6', time)

            setTimeout(() => {
                setCurrentNote(note)
            }, index * 800)
        })

        setTimeout(() => {
            setIsPlaying(false)
            setCurrentNote('')
            synth.dispose()
        }, notes.length * 800 + 500)
    }

    const playArpeggio = async () => {
        await Tone.start()

        const synth = new Tone.Synth({
            oscillator: { type: 'triangle' },
            envelope: {
                attack: 0.05,
                decay: 0.1,
                sustain: 0.3,
                release: 0.8
            }
        }).toDestination()

        const notes = ['C4', 'E4', 'G4', 'C5', 'G4', 'E4', 'C4']
        const now = Tone.now()

        setIsPlaying(true)

        notes.forEach((note, index) => {
            const time = now + index * 0.5
            synth.triggerAttackRelease(note, '0.4', time)

            setTimeout(() => {
                setCurrentNote(note)
            }, index * 500)
        })

        setTimeout(() => {
            setIsPlaying(false)
            setCurrentNote('')
            synth.dispose()
        }, notes.length * 500 + 500)
    }

    const handlePlay = () => {
        if (exercise.id === 'warmup-scale') {
            playScale()
        } else if (exercise.id === 'arpeggio') {
            playArpeggio()
        } else if (exercise.id === 'breathing') {
            // Breathing exercise - visual guide only
            setIsPlaying(true)
            setTimeout(() => setIsPlaying(false), 8000)
        } else if (exercise.id === 'pitch-accuracy') {
            playScale()
        }
    }

    return (
        <div className="vocal-engine">
            <div className="engine-controls">
                <button
                    className={`btn-primary play-btn ${isPlaying ? 'playing' : ''}`}
                    onClick={handlePlay}
                    disabled={isPlaying}
                >
                    {isPlaying ? '⏸️ En cours...' : '▶️ Démarrer l\'exercice'}
                </button>
            </div>

            {currentNote && (
                <div className="note-display fade-in">
                    <div className="note-circle">
                        <span className="note-text">{currentNote}</span>
                    </div>
                    <p className="note-instruction">Chantez cette note</p>
                </div>
            )}

            {exercise.id === 'breathing' && isPlaying && (
                <div className="breathing-guide fade-in">
                    <div className="breath-circle">
                        <div className="breath-animation"></div>
                    </div>
                    <p className="breath-instruction">Inspirez profondément... puis expirez lentement</p>
                </div>
            )}

            <div className="exercise-tips glass-effect">
                <h3>💡 Conseils</h3>
                <ul>
                    {exercise.id === 'warmup-scale' && (
                        <>
                            <li>Écoutez chaque note avant de la chanter</li>
                            <li>Gardez une posture droite</li>
                            <li>Respirez entre chaque note</li>
                        </>
                    )}
                    {exercise.id === 'breathing' && (
                        <>
                            <li>Inspirez par le nez pendant 4 secondes</li>
                            <li>Retenez votre souffle 2 secondes</li>
                            <li>Expirez lentement par la bouche pendant 6 secondes</li>
                        </>
                    )}
                    {exercise.id === 'arpeggio' && (
                        <>
                            <li>Suivez le rythme des notes</li>
                            <li>Travaillez la fluidité entre les notes</li>
                            <li>Maintenez une intensité constante</li>
                        </>
                    )}
                    {exercise.id === 'pitch-accuracy' && (
                        <>
                            <li>Concentrez-vous sur la justesse de chaque note</li>
                            <li>Utilisez un casque pour mieux vous entendre</li>
                            <li>Répétez jusqu\'à ce que la note soit parfaite</li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default VocalEngine
