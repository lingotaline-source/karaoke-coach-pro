import { useState, useRef, useEffect } from 'react'
import { PitchDetector } from 'pitchy'
import './VocalRangeTester.css'

function VocalRangeTester({ onClose }) {
    const [step, setStep] = useState('intro') // intro, recording_low, recording_high, result
    const [detectedFreq, setDetectedFreq] = useState(0)
    const [detectedNote, setDetectedNote] = useState('')
    const [lowNote, setLowNote] = useState(null)
    const [highNote, setHighNote] = useState(null)
    const [audioLevel, setAudioLevel] = useState(0)

    const audioContextRef = useRef(null)
    const analyserRef = useRef(null)
    const mediaStreamRef = useRef(null)
    const pitchDetectorRef = useRef(null)
    const animationFrameRef = useRef(null)
    const stableNoteCount = useRef(0)
    const lastNoteRef = useRef(null)

    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    const frequencyToNote = (frequency) => {
        const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2))
        const roundedNote = Math.round(noteNum) + 69
        const octave = Math.floor(roundedNote / 12) - 1
        const noteName = noteNames[roundedNote % 12]
        return { name: noteName, octave, fullName: `${noteName}${octave}`, frequency }
    }

    const startListening = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            mediaStreamRef.current = stream
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
            const source = audioContextRef.current.createMediaStreamSource(stream)
            analyserRef.current = audioContextRef.current.createAnalyser()
            analyserRef.current.fftSize = 2048
            source.connect(analyserRef.current)
            pitchDetectorRef.current = PitchDetector.forFloat32Array(analyserRef.current.fftSize)
            detectPitch()
        } catch (error) {
            console.error("Erreur micro:", error)
        }
    }

    const stopListening = () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach(track => track.stop())
        if (audioContextRef.current) audioContextRef.current.close()
    }

    useEffect(() => {
        if (step === 'recording_low' || step === 'recording_high') {
            startListening()
        } else {
            stopListening()
        }
        return () => stopListening()
    }, [step])

    const detectPitch = () => {
        if (!analyserRef.current) return

        const buffer = new Float32Array(analyserRef.current.fftSize)
        analyserRef.current.getFloatTimeDomainData(buffer)
        const [frequency, clarity] = pitchDetectorRef.current.findPitch(buffer, audioContextRef.current.sampleRate)

        // Audio level
        let sum = 0
        for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i]
        const rms = Math.sqrt(sum / buffer.length)
        setAudioLevel(Math.min(100, rms * 500))

        if (clarity > 0.9 && frequency > 50 && frequency < 1500) {
            const note = frequencyToNote(frequency)
            setDetectedFreq(frequency)
            setDetectedNote(note.fullName)

            // Stabilisation simple
            if (lastNoteRef.current === note.fullName) {
                stableNoteCount.current++
            } else {
                stableNoteCount.current = 0
                lastNoteRef.current = note.fullName
            }
        } else {
            stableNoteCount.current = 0
        }

        animationFrameRef.current = requestAnimationFrame(detectPitch)
    }

    const captureLowNote = () => {
        if (detectedFreq > 0) {
            setLowNote({ freq: detectedFreq, note: detectedNote })
            setStep('recording_high')
        }
    }

    const captureHighNote = () => {
        if (detectedFreq > 0) {
            setHighNote({ freq: detectedFreq, note: detectedNote })
            setStep('result')
        }
    }

    const determineVocalType = () => {
        if (!lowNote || !highNote) return "Inconnu"

        // Logique simplifiée basée sur le centre de la tessiture ou les extrêmes
        // Moyenne des fréquences pour estimer le centre
        const centerFreq = (lowNote.freq + highNote.freq) / 2

        // Classification approximative basée sur les fréquences centrales typiques
        if (centerFreq > 500) return "Soprano"
        if (centerFreq > 400) return "Mezzo-Soprano"
        if (centerFreq > 300) return "Alto / Contre-ténor"
        if (centerFreq > 220) return "Ténor"
        if (centerFreq > 150) return "Baryton"
        return "Basse"
    }

    const getVocalDescription = (type) => {
        const descriptions = {
            "Soprano": "La voix la plus aiguë, capable d'atteindre des notes très hautes avec brillance.",
            "Mezzo-Soprano": "Une voix polyvalente, avec des graves chauds et des aigus puissants.",
            "Alto / Contre-ténor": "Une voix grave et riche chez les femmes, ou très aiguë chez les hommes.",
            "Ténor": "La voix masculine la plus aiguë, souvent héroïque et brillante.",
            "Baryton": "La voix masculine moyenne, très courante, alliant chaleur et puissance.",
            "Basse": "La voix la plus grave, profonde et résonnante."
        }
        return descriptions[type] || ""
    }

    const vocalType = step === 'result' ? determineVocalType() : ''

    return (
        <div className="vocal-range-overlay">
            <div className="vocal-range-modal glass-effect">
                <button className="close-btn" onClick={onClose}>×</button>

                <h2>🎤 Test de Tessiture</h2>

                {step === 'intro' && (
                    <div className="step-content">
                        <p>Découvrons votre type de voix ! Nous allons identifier votre note la plus grave et votre note la plus aiguë.</p>
                        <button className="btn-primary" onClick={() => setStep('recording_low')}>Commencer</button>
                    </div>
                )}

                {(step === 'recording_low' || step === 'recording_high') && (
                    <div className="step-content">
                        <h3>
                            {step === 'recording_low' ? "Chantez votre note la plus GRAVE ⬇️" : "Chantez votre note la plus AIGUË ⬆️"}
                        </h3>
                        <p className="instruction">Tenez la note quelques secondes...</p>

                        <div className="visualizer">
                            <div className="note-display">{detectedNote || "..."}</div>
                            <div className="freq-display">{Math.round(detectedFreq)} Hz</div>
                            <div className="level-bar-container">
                                <div className="level-bar" style={{ width: `${audioLevel}%` }}></div>
                            </div>
                        </div>

                        <button
                            className="btn-primary capture-btn"
                            onClick={step === 'recording_low' ? captureLowNote : captureHighNote}
                            disabled={!detectedNote}
                        >
                            C'est ma note !
                        </button>
                    </div>
                )}

                {step === 'result' && (
                    <div className="step-content result-content">
                        <h3>Votre tessiture estimée :</h3>
                        <div className="vocal-type-badge">{vocalType}</div>
                        <p className="vocal-desc">{getVocalDescription(vocalType)}</p>

                        <div className="range-details">
                            <div className="range-item">
                                <span>Grave :</span>
                                <strong>{lowNote.note}</strong>
                            </div>
                            <div className="range-arrow">↔️</div>
                            <div className="range-item">
                                <span>Aigu :</span>
                                <strong>{highNote.note}</strong>
                            </div>
                        </div>

                        <button className="btn-secondary" onClick={() => setStep('intro')}>Recommencer</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VocalRangeTester
