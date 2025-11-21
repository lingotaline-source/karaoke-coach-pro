import { useEffect } from 'react'

export function useKeyboardShortcuts({
    onToggleRecording,
    onTogglePlayPause,
    onToggleFullscreen,
    isRecording
}) {
    useEffect(() => {
        const handleKeyPress = (e) => {
            // Ignorer si l'utilisateur tape dans un input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return
            }

            switch (e.key.toLowerCase()) {
                case ' ': // Espace
                    e.preventDefault()
                    if (onTogglePlayPause) onTogglePlayPause()
                    break
                case 'r':
                    e.preventDefault()
                    if (onToggleRecording) onToggleRecording()
                    break
                case 'f':
                    e.preventDefault()
                    if (onToggleFullscreen) onToggleFullscreen()
                    break
                default:
                    break
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [onToggleRecording, onTogglePlayPause, onToggleFullscreen, isRecording])
}

export function KeyboardShortcutsHelp() {
    return (
        <div className="keyboard-shortcuts-help">
            <h4>⌨️ Raccourcis Clavier</h4>
            <div className="shortcuts-list">
                <div className="shortcut-item">
                    <kbd>Espace</kbd>
                    <span>Play / Pause</span>
                </div>
                <div className="shortcut-item">
                    <kbd>R</kbd>
                    <span>Démarrer / Arrêter l'enregistrement</span>
                </div>
                <div className="shortcut-item">
                    <kbd>F</kbd>
                    <span>Mode plein écran</span>
                </div>
            </div>
        </div>
    )
}
