import { useState, useRef, useEffect } from 'react'
import { PitchDetector } from 'pitchy'
import PitchVisualizer from './PitchVisualizer'
import './VoiceRecorder.css'

function VoiceRecorder({ isRecording, onRecordingComplete }) {
    const [audioLevel, setAudioLevel] = useState(0)
    const [detectedNote, setDetectedNote] = useState(null)
    const [detectedFrequency, setDetectedFrequency] = useState(0)
    const [clarity, setClarity] = useState(0)
    const [isReverbEnabled, setIsReverbEnabled] = useState(false)

    const audioContextRef = useRef(null)
    const analyserRef = useRef(null)
    const mediaRecorderRef = useRef(null)
    const audioChunksRef = useRef([])
    const pitchDetectorRef = useRef(null)
    const animationFrameRef = useRef(null)
    const reverbNodeRef = useRef(null)
    const destinationRef = useRef(null)

    // Collecte des données de performance
    const performanceDataRef = useRef({
        notes: [],
        clarityValues: [],
        audioLevels: [],
        startTime: null,
        duration: 0
    })

    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    const frequencyToNote = (frequency) => {
        const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2))
        const roundedNote = Math.round(noteNum) + 69
        const octave = Math.floor(roundedNote / 12) - 1
        const noteName = noteNames[roundedNote % 12]
        return `${noteName}${octave}`
    }

    useEffect(() => {
        if (isRecording) {
            startRecording()
        } else {
            stopRecording()
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
            if (audioContextRef.current) {
                audioContextRef.current.close()
            }
        }
    }, [isRecording])

    // Créer une réponse impulsionnelle pour la réverbération
    const createReverbImpulse = (duration = 2.0, decay = 2.0) => {
        const ctx = audioContextRef.current
        const rate = ctx.sampleRate
        const length = rate * duration
        const impulse = ctx.createBuffer(2, length, rate)
        const left = impulse.getChannelData(0)
        const right = impulse.getChannelData(1)

        for (let i = 0; i < length; i++) {
            const n = i
            left[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay)
            right[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay)
        }
        return impulse
    }

    const startRecording = async () => {
        try {
            // Réinitialiser les données de performance
            performanceDataRef.current = {
                notes: [],
                clarityValues: [],
                audioLevels: [],
                startTime: Date.now(),
                duration: 0
            }

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

            // Setup AudioContext
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
            const source = audioContextRef.current.createMediaStreamSource(stream)

            // Setup Analyser for pitch detection
            analyserRef.current = audioContextRef.current.createAnalyser()
            analyserRef.current.fftSize = 2048

            // Setup Reverb
            destinationRef.current = audioContextRef.current.createMediaStreamDestination()

            if (isReverbEnabled) {
                reverbNodeRef.current = audioContextRef.current.createConvolver()
                reverbNodeRef.current.buffer = createReverbImpulse()

                // Mix: Source -> Reverb -> Dest AND Source -> Dest
                source.connect(reverbNodeRef.current)
                reverbNodeRef.current.connect(destinationRef.current)
                source.connect(destinationRef.current) // Dry signal
            } else {
                source.connect(destinationRef.current)
            }

            // Connect analyser to source (always dry for better pitch detection)
            source.connect(analyserRef.current)

            // Setup pitch detector
            pitchDetectorRef.current = PitchDetector.forFloat32Array(analyserRef.current.fftSize)

            // Setup MediaRecorder with the destination stream (processed audio)
            mediaRecorderRef.current = new MediaRecorder(destinationRef.current.stream)
            audioChunksRef.current = []

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data)
            }

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
                const audioUrl = URL.createObjectURL(audioBlob)

                // Calculer la durée
                performanceDataRef.current.duration = Date.now() - performanceDataRef.current.startTime

                // Calculer les statistiques de performance
                const performanceStats = calculatePerformanceStats()

                if (onRecordingComplete) {
                    onRecordingComplete(audioUrl, audioBlob, performanceStats)
                }
            }

            mediaRecorderRef.current.start()
            detectPitch()
        } catch (error) {
            console.error('Error accessing microphone:', error)
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop()
        }
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
        }
        // Ne pas fermer l'AudioContext immédiatement si on veut garder l'effet, 
        // mais ici on arrête tout.
        if (audioContextRef.current) {
            // audioContextRef.current.close() // On laisse le cleanup du useEffect le faire
        }
    }

    const detectPitch = () => {
        if (!analyserRef.current || !pitchDetectorRef.current) return

        const buffer = new Float32Array(analyserRef.current.fftSize)
        analyserRef.current.getFloatTimeDomainData(buffer)

        // Detect pitch
        const [frequency, clarityValue] = pitchDetectorRef.current.findPitch(
            buffer,
            audioContextRef.current.sampleRate
        )

        // Calculate audio level
        let sum = 0
        for (let i = 0; i < buffer.length; i++) {
            sum += buffer[i] * buffer[i]
        }
        const rms = Math.sqrt(sum / buffer.length)
        const level = Math.min(100, rms * 500)

        setAudioLevel(level)

        if (frequency && clarityValue > 0.9) {
            setDetectedFrequency(frequency)
            const note = frequencyToNote(frequency)
            setDetectedNote(note)
            setClarity(clarityValue)

            // Collecter les données de performance
            performanceDataRef.current.notes.push(note)
            performanceDataRef.current.clarityValues.push(clarityValue)
        } else {
            setDetectedNote(null)
            setClarity(0)
        }

        // Toujours collecter le niveau audio
        performanceDataRef.current.audioLevels.push(level)

        animationFrameRef.current = requestAnimationFrame(detectPitch)
    }

    const calculatePerformanceStats = () => {
        const data = performanceDataRef.current

        // Calculer la clarté moyenne
        const avgClarity = data.clarityValues.length > 0
            ? data.clarityValues.reduce((a, b) => a + b, 0) / data.clarityValues.length
            : 0

        // Calculer le niveau audio moyen
        const avgAudioLevel = data.audioLevels.length > 0
            ? data.audioLevels.reduce((a, b) => a + b, 0) / data.audioLevels.length
            : 0

        // Calculer le pourcentage de temps avec une note détectée
        const noteDetectionRate = data.audioLevels.length > 0
            ? (data.notes.length / data.audioLevels.length) * 100
            : 0

        // Calculer le score global (0-100)
        const score = Math.round(
            (avgClarity * 40) + // 40% pour la justesse
            (Math.min(avgAudioLevel / 50, 1) * 30) + // 30% pour le volume
            (noteDetectionRate * 0.3) // 30% pour la constance
        )

        // Déterminer le niveau de performance
        let rating = 'À améliorer'
        let coachMood = 'concerned'
        let coachMessage = 'Continue à pratiquer, tu vas progresser ! 💪'

        if (score >= 80) {
            rating = 'Excellent'
            coachMood = 'excited'
            coachMessage = 'Incroyable ! Tu chantes comme un(e) pro ! 🌟'
        } else if (score >= 60) {
            rating = 'Très bien'
            coachMood = 'impressed'
            coachMessage = 'Bravo ! Belle performance, continue comme ça ! 🎉'
        } else if (score >= 40) {
            rating = 'Bien'
            coachMood = 'happy'
            coachMessage = 'Bon travail ! Tu es sur la bonne voie ! 😊'
        }

        return {
            score,
            rating,
            avgClarity: Math.round(avgClarity * 100),
            avgAudioLevel: Math.round(avgAudioLevel),
            noteDetectionRate: Math.round(noteDetectionRate),
            notesDetected: data.notes.length,
            duration: Math.round(data.duration / 1000), // en secondes
            coachMood,
            coachMessage
        }
    }


    return (
        <div className="voice-recorder">
            <div className="recorder-options">
                <label className="reverb-toggle">
                    <input
                        type="checkbox"
                        checked={isReverbEnabled}
                        onChange={(e) => setIsReverbEnabled(e.target.checked)}
                        disabled={isRecording}
                    />
                    <span className="toggle-label">🎛️ Mode Studio (Reverb)</span>
                </label>
                {isRecording && isReverbEnabled && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', marginTop: '4px' }}>
                        ✨ Reverb actif
                    </div>
                )}
                {!isRecording && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        💡 Activez avant d'enregistrer
                    </div>
                )}
            </div>

            <div className="recorder-display">
                <PitchVisualizer analyser={analyserRef.current} isRecording={isRecording} />

                <div className="audio-visualizer">
                    <div
                        className="audio-level-bar"
                        style={{ width: `${audioLevel}%` }}
                    />
                </div>

                {detectedNote && (
                    <div className="pitch-display">
                        <div className="note-name">{detectedNote}</div>
                        <div className="frequency">{Math.round(detectedFrequency)} Hz</div>
                        <div className="clarity-indicator">
                            <div
                                className="clarity-bar"
                                style={{ width: `${clarity * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {!detectedNote && isRecording && (
                    <div className="waiting-message">
                        🎤 Chantez pour voir la note détectée...
                    </div>
                )}
            </div>
        </div>
    )
}

export default VoiceRecorder
