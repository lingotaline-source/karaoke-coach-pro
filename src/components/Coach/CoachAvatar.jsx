import { useState } from 'react'
import './CoachAvatar.css'
import avatarImage from '../../assets/coach-avatar.png'

function CoachAvatar({ mood = 'neutral', message = '' }) {
    const [isAnimating, setIsAnimating] = useState(false)

    const getMoodColor = () => {
        switch (mood) {
            case 'happy': return '#10b981'
            case 'excited': return '#f59e0b'
            case 'impressed': return '#8b5cf6'
            case 'concerned': return '#ef4444'
            case 'encouraging': return '#6366f1'
            default: return '#6366f1'
        }
    }

    const getMoodFilter = () => {
        switch (mood) {
            case 'happy': return 'brightness(1.2) saturate(1.3)'
            case 'excited': return 'brightness(1.1) saturate(1.5) hue-rotate(10deg)'
            case 'impressed': return 'brightness(1.15) saturate(1.4) hue-rotate(-10deg)'
            case 'concerned': return 'brightness(0.9) saturate(0.8)'
            case 'encouraging': return 'brightness(1.1) saturate(1.2)'
            default: return 'none'
        }
    }

    return (
        <div className="coach-avatar-container">
            <div className={`coach-avatar mood-${mood}`}>
                <div className="avatar-circle" style={{ borderColor: getMoodColor() }}>
                    <div className="avatar-face">
                        <img
                            src={avatarImage}
                            alt="Coach Avatar"
                            className="avatar-image"
                            style={{ filter: getMoodFilter() }}
                        />
                    </div>
                    <div className="avatar-pulse" style={{ borderColor: getMoodColor() }} />
                </div>
            </div>

            {message && (
                <div className="coach-message">
                    <div className="message-bubble">
                        <p>{message}</p>
                    </div>
                    <div className="message-tail" />
                </div>
            )}
        </div>
    )
}

export default CoachAvatar
