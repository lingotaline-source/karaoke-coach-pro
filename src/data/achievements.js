export const ACHIEVEMENTS = [
    {
        id: 'first_steps',
        title: 'Premiers Pas',
        description: 'Enregistrer votre première chanson',
        icon: '🎤',
        condition: (stats, totalRecordings) => totalRecordings >= 1
    },
    {
        id: 'rising_star',
        title: 'Star Montante',
        description: 'Obtenir un score supérieur à 80/100',
        icon: '🌟',
        condition: (stats) => stats.score >= 80
    },
    {
        id: 'perfect_pitch',
        title: 'Oreille Absolue',
        description: 'Avoir une justesse supérieure à 90%',
        icon: '🎯',
        condition: (stats) => stats.avgClarity >= 90
    },
    {
        id: 'night_owl',
        title: 'Oiseau de Nuit',
        description: 'Enregistrer une chanson après 22h',
        icon: '🦉',
        condition: (stats) => {
            const hour = new Date().getHours()
            return hour >= 22 || hour < 4
        }
    },
    {
        id: 'marathon',
        title: 'Marathonien',
        description: 'Enregistrer 5 chansons au total',
        icon: '🏃',
        condition: (stats, totalRecordings) => totalRecordings >= 5
    },
    {
        id: 'virtuoso',
        title: 'Virtuose',
        description: 'Obtenir un score parfait de 95+ !',
        icon: '👑',
        condition: (stats) => stats.score >= 95
    }
]
