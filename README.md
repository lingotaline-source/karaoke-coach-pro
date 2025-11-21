# 🎤 Karaoké Coach Pro

**L'application de karaoké ultime avec coach vocal intelligent et analyse de performance en temps réel.**

[![Déployé sur Netlify](https://img.shields.io/badge/deployed-Netlify-00C7B7?style=for-the-badge&logo=netlify)](https://roaring-squirrel-5b80aa.netlify.app)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

---

## ✨ Fonctionnalités

### 🎵 Lecture Karaoké
- Intégration YouTube avec recherche avancée
- Bibliothèque de favoris personnalisable
- Player vidéo avec contrôles intuitifs
- Bloc-notes pour les paroles

### 🎙️ Enregistrement Vocal
- Enregistrement audio haute qualité
- Mode Studio avec effet Reverb
- Visualisation vocale en temps réel
- Téléchargement des enregistrements

### 📊 Analyse de Performance
- Score de performance automatique (0-100)
- Détection de notes en temps réel
- Analyse de justesse et de clarté
- Mesure du volume et de la stabilité
- Historique complet des performances

### 🏆 Système de Gamification
- Badges et trophées à débloquer
- Système de progression
- Statistiques détaillées
- Graphiques de progression

### 🎯 Coach Vocal Intelligent
- Avatar animé avec expressions
- Conseils personnalisés
- Exercices vocaux guidés
- Test de tessiture vocale

### 🎨 Interface Moderne
- Design glassmorphism
- Mode sombre / clair
- Animations fluides
- Interface responsive

### ⌨️ Raccourcis Clavier
- Navigation rapide
- Contrôle d'enregistrement
- Mode plein écran
- Et bien plus...

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ installé
- Un compte Google pour l'API YouTube (optionnel)

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/lingotaline-source/karaoke-coach-pro.git
cd karaoke-coach-pro
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer la clé API YouTube (optionnel)**

Créez un fichier `.env` à la racine :
```env
VITE_YOUTUBE_API_KEY=votre_clé_api_youtube
```

4. **Lancer l'application**
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

---

## 📖 Guide d'Utilisation

### 1️⃣ Rechercher une Chanson

1. Utilisez la barre de recherche en haut
2. Tapez le nom de la chanson ou de l'artiste
3. Cliquez sur une suggestion ou appuyez sur Entrée
4. Sélectionnez la vidéo dans les résultats

### 2️⃣ Enregistrer Votre Voix

1. Cliquez sur le bouton **🎤 Enregistrer**
2. Autorisez l'accès au microphone si demandé
3. Activez le **Mode Studio** pour ajouter de la reverb (optionnel)
4. Chantez sur la vidéo
5. Cliquez sur **⏹️ Arrêter** quand vous avez terminé

### 3️⃣ Analyser Votre Performance

Après chaque enregistrement, vous verrez :
- ✅ **Score global** : Note de 0 à 100
- 🎵 **Notes détectées** : Nombre de notes chantées
- ✨ **Justesse** : Précision de vos notes
- 🔊 **Volume** : Puissance vocale moyenne
- ⏱️ **Durée** : Temps d'enregistrement

### 4️⃣ Débloquer des Trophées

Les trophées se débloquent automatiquement :
- 🏆 **Première Note** : Premier enregistrement
- ⭐ **Star Montante** : Score > 70
- 🎯 **Perfectionniste** : Score > 90
- 🔥 **Marathonien** : 10 enregistrements
- Et bien d'autres...

### 5️⃣ Exercices Vocaux

1. Cliquez sur **🎵 Exercices Vocaux**
2. Choisissez un exercice :
   - Gammes ascendantes/descendantes
   - Arpeggios
   - Respiration
   - Échauffement vocal
3. Suivez les instructions à l'écran

### 6️⃣ Test de Tessiture

1. Cliquez sur **🎤 Test de Tessiture**
2. Chantez la note affichée
3. Découvrez votre type de voix :
   - Basse
   - Baryton
   - Ténor
   - Alto
   - Mezzo-soprano
   - Soprano

---

## ⌨️ Raccourcis Clavier

| Touche | Action |
|--------|--------|
| `Espace` | Démarrer/Arrêter l'enregistrement |
| `F` | Mode plein écran |
| `?` | Afficher l'aide |
| `Échap` | Fermer les modales |

---

## 🎨 Personnalisation

### Ajouter des Favoris

1. Recherchez une chanson
2. Cliquez sur **⭐ Ajouter aux favoris**
3. Vos favoris apparaissent dans la bibliothèque

### Changer de Thème

Cliquez sur l'icône **🌙/☀️** en haut à droite pour basculer entre le mode sombre et clair.

### Exporter Vos Données

Cliquez sur les icônes en haut :
- **📊** : Exporter en CSV
- **💾** : Exporter en JSON

---

## 🛠️ Technologies Utilisées

- **React 18.3** - Framework UI
- **Vite 5.4** - Build tool ultra-rapide
- **Tone.js** - Synthèse audio et effets
- **Pitchy** - Détection de pitch
- **YouTube Data API v3** - Recherche de vidéos
- **Web Audio API** - Enregistrement et analyse
- **XLSX** - Export de données

---

## 📦 Build pour Production

```bash
# Construire l'application
npm run build

# Prévisualiser le build
npm run preview
```

Les fichiers optimisés seront dans le dossier `dist/`

---

## 🌐 Déploiement

### Netlify (Recommandé)

1. Connectez votre repository GitHub
2. Configurez :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
3. Ajoutez la variable d'environnement :
   - **Key** : `VITE_YOUTUBE_API_KEY`
   - **Value** : Votre clé API YouTube

### Vercel

```bash
npm install -g vercel
vercel
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 🐛 Bugs Connus & Solutions

### Le microphone ne fonctionne pas
- Vérifiez les permissions du navigateur
- Utilisez HTTPS (requis pour l'accès micro)
- Testez avec un autre navigateur

### La recherche YouTube ne fonctionne pas
- Vérifiez que la clé API est configurée
- Vérifiez les quotas de l'API sur Google Cloud Console

### Les enregistrements ne sont pas sauvegardés
- Les enregistrements sont stockés localement dans le navigateur
- Effacer le cache supprime les enregistrements
- Téléchargez vos enregistrements importants

---

## 📞 Support

Pour toute question ou problème :
- Ouvrez une [Issue](https://github.com/lingotaline-source/karaoke-coach-pro/issues)
- Consultez la documentation
- Contactez l'équipe de développement

---

## 🎉 Remerciements

Merci d'utiliser Karaoké Coach Pro ! Amusez-vous bien et chantez à tue-tête ! 🎤✨

---

**Fait avec ❤️ par l'équipe Karaoké Coach Pro**
