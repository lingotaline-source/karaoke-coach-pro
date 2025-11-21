import { useState } from 'react'
import './HelpPanel.css'

const HelpPanel = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('features')

    const tabs = [
        { id: 'features', label: '✨ Fonctionnalités', icon: '🎯' },
        { id: 'howto', label: '📖 Guide', icon: '📚' },
        { id: 'shortcuts', label: '⌨️ Raccourcis', icon: '⚡' },
        { id: 'tips', label: '💡 Astuces', icon: '🌟' }
    ]

    return (
        <>
            <div className="help-overlay" onClick={onClose} />
            <div className="help-panel glass-effect">
                <div className="help-header">
                    <h2>🎤 Guide d'Utilisation</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="help-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`help-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="tab-icon">{tab.icon}</span>
                            <span className="tab-label">{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="help-content">
                    {activeTab === 'features' && (
                        <div className="help-section">
                            <h3>🎵 Fonctionnalités Principales</h3>

                            <div className="feature-card">
                                <div className="feature-icon">🎥</div>
                                <div className="feature-details">
                                    <h4>Lecture Karaoké</h4>
                                    <p>Recherchez et lisez n'importe quelle vidéo YouTube. Ajoutez vos chansons favorites à votre bibliothèque personnelle.</p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">🎙️</div>
                                <div className="feature-details">
                                    <h4>Enregistrement Vocal</h4>
                                    <p>Enregistrez votre voix en haute qualité avec le Mode Studio pour ajouter de la reverb professionnelle.</p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">📊</div>
                                <div className="feature-details">
                                    <h4>Analyse de Performance</h4>
                                    <p>Recevez un score détaillé avec analyse de justesse, clarté vocale et stabilité en temps réel.</p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">🏆</div>
                                <div className="feature-details">
                                    <h4>Trophées & Progression</h4>
                                    <p>Débloquez des badges en progressant. Suivez vos statistiques et votre évolution vocale.</p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">🎯</div>
                                <div className="feature-details">
                                    <h4>Coach Vocal</h4>
                                    <p>Suivez des exercices guidés et testez votre tessiture vocale avec notre coach intelligent.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'howto' && (
                        <div className="help-section">
                            <h3>📖 Guide Pas à Pas</h3>

                            <div className="step-card">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h4>Rechercher une Chanson</h4>
                                    <ul>
                                        <li>Utilisez la barre de recherche en haut</li>
                                        <li>Tapez le nom de la chanson ou de l'artiste</li>
                                        <li>Sélectionnez parmi les suggestions</li>
                                        <li>Ajoutez aux favoris avec l'icône ⭐</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="step-card">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h4>Enregistrer Votre Voix</h4>
                                    <ul>
                                        <li>Cliquez sur <strong>🎤 Enregistrer</strong></li>
                                        <li>Autorisez l'accès au microphone</li>
                                        <li>Activez le Mode Studio pour la reverb</li>
                                        <li>Chantez et cliquez sur <strong>⏹️ Arrêter</strong></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="step-card">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h4>Analyser Votre Performance</h4>
                                    <ul>
                                        <li>Consultez votre score global (0-100)</li>
                                        <li>Vérifiez la justesse et la clarté</li>
                                        <li>Écoutez votre enregistrement</li>
                                        <li>Téléchargez-le avec l'icône 📥</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="step-card">
                                <div className="step-number">4</div>
                                <div className="step-content">
                                    <h4>Progresser et S'améliorer</h4>
                                    <ul>
                                        <li>Consultez vos statistiques globales</li>
                                        <li>Déverrouillez des trophées</li>
                                        <li>Faites des exercices vocaux</li>
                                        <li>Testez votre tessiture vocale</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'shortcuts' && (
                        <div className="help-section">
                            <h3>⌨️ Raccourcis Clavier</h3>

                            <div className="shortcuts-grid">
                                <div className="shortcut-item">
                                    <kbd>Espace</kbd>
                                    <span>Démarrer/Arrêter l'enregistrement</span>
                                </div>
                                <div className="shortcut-item">
                                    <kbd>F</kbd>
                                    <span>Mode plein écran</span>
                                </div>
                                <div className="shortcut-item">
                                    <kbd>?</kbd>
                                    <span>Afficher cette aide</span>
                                </div>
                                <div className="shortcut-item">
                                    <kbd>Échap</kbd>
                                    <span>Fermer les popups</span>
                                </div>
                            </div>

                            <div className="tip-box">
                                <strong>💡 Astuce :</strong> Maintenez <kbd>Ctrl</kbd> pour voir plus de raccourcis contextuels dans l'application.
                            </div>
                        </div>
                    )}

                    {activeTab === 'tips' && (
                        <div className="help-section">
                            <h3>💡 Astuces & Conseils</h3>

                            <div className="tip-card success">
                                <div className="tip-icon">🎤</div>
                                <div className="tip-content">
                                    <h4>Pour un Meilleur Enregistrement</h4>
                                    <ul>
                                        <li>Chantez à 15-20 cm du microphone</li>
                                        <li>Enregistrez dans un endroit calme</li>
                                        <li>Faites des exercices d'échauffement avant</li>
                                        <li>Utilisez le Mode Studio pour un son professionnel</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="tip-card info">
                                <div className="tip-icon">📊</div>
                                <div className="tip-content">
                                    <h4>Améliorer Votre Score</h4>
                                    <ul>
                                        <li>Travaillez votre justesse avec les exercices</li>
                                        <li>Maintenez un volume stable</li>
                                        <li>Respirez correctement entre les phrases</li>
                                        <li>Pratiquez régulièrement</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="tip-card warning">
                                <div className="tip-icon">⚠️</div>
                                <div className="tip-content">
                                    <h4>Problèmes Courants</h4>
                                    <ul>
                                        <li><strong>Pas de son ?</strong> Vérifiez les permissions du micro</li>
                                        <li><strong>Recherche ne marche pas ?</strong> Vérifiez votre connexion</li>
                                        <li><strong>Enregistrements perdus ?</strong> Téléchargez-les régulièrement</li>
                                        <li><strong>Application lente ?</strong> Fermez les autres onglets</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="tip-card accent">
                                <div className="tip-icon">🎯</div>
                                <div className="tip-content">
                                    <h4>Objectifs Suggérés</h4>
                                    <ul>
                                        <li>Atteignez un score de 70+ sur 3 chansons</li>
                                        <li>Débloquez tous les trophées débutants</li>
                                        <li>Complétez tous les exercices vocaux</li>
                                        <li>Créez une bibliothèque de 10 favoris</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="help-footer">
                    <p>Besoin d'aide supplémentaire ? Consultez le <a href="https://github.com/lingotaline-source/karaoke-coach-pro" target="_blank" rel="noopener noreferrer">README sur GitHub</a></p>
                </div>
            </div>
        </>
    )
}

export default HelpPanel
