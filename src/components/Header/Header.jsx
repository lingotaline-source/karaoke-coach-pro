import './Header.css'

function Header({ currentView, setCurrentView }) {
    return (
        <header className="header glass-effect">
            <div className="header-content">
                <div className="logo">
                    <span className="logo-icon">🎤</span>
                    <span className="logo-text">Karaoké <span className="gradient-text">Coach Pro</span></span>
                </div>

                <nav className="nav">
                    <button
                        className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
                        onClick={() => setCurrentView('home')}
                    >
                        🏠 Accueil
                    </button>
                    <button
                        className={`nav-item ${currentView === 'practice' ? 'active' : ''}`}
                        onClick={() => setCurrentView('practice')}
                    >
                        🎵 Pratiquer
                    </button>
                    <button
                        className={`nav-item ${currentView === 'coach' ? 'active' : ''}`}
                        onClick={() => setCurrentView('coach')}
                    >
                        🎯 Coach
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header
