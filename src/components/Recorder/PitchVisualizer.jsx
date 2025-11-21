import { useRef, useEffect } from 'react'

function PitchVisualizer({ analyser, isRecording }) {
    const canvasRef = useRef(null)
    const animationRef = useRef(null)

    useEffect(() => {
        if (!analyser || !isRecording) {
            cancelAnimationFrame(animationRef.current)
            return
        }

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw)
            analyser.getByteFrequencyData(dataArray)

            ctx.fillStyle = 'rgba(20, 20, 30, 0.2)' // Trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const barWidth = (canvas.width / bufferLength) * 2.5
            let barHeight
            let x = 0

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2

                // Gradient color based on height
                const r = barHeight + 25 * (i / bufferLength)
                const g = 250 * (i / bufferLength)
                const b = 50

                ctx.fillStyle = `rgb(${r},${g},${b})`
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

                x += barWidth + 1
            }
        }

        draw()

        return () => cancelAnimationFrame(animationRef.current)
    }, [analyser, isRecording])

    return (
        <canvas
            ref={canvasRef}
            width={300}
            height={100}
            style={{
                width: '100%',
                height: '100px',
                borderRadius: '8px',
                background: '#111',
                marginBottom: '1rem'
            }}
        />
    )
}

export default PitchVisualizer
