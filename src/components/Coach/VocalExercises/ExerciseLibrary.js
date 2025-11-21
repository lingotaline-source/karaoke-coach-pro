// Bibliothèque complète d'exercices vocaux professionnels

export const vocalExercises = {
    // ==================== ÉCHAUFFEMENT ====================
    warmup: {
        relaxation: [
            {
                id: 'relax-1',
                name: 'Rotations des Épaules',
                duration: 60,
                instructions: [
                    'Debout, pieds écartés à largeur d\'épaules',
                    'Faites des rotations lentes des épaules vers l\'arrière',
                    'Répétez 10 fois, puis vers l\'avant 10 fois',
                    'Respirez profondément pendant l\'exercice'
                ],
                benefits: 'Relâche les tensions dans le haut du corps'
            },
            {
                id: 'relax-2',
                name: 'Étirements du Cou',
                duration: 60,
                instructions: [
                    'Inclinez doucement la tête vers la droite',
                    'Maintenez 5 secondes, revenez au centre',
                    'Répétez vers la gauche',
                    'Puis inclinez vers l\'avant et l\'arrière'
                ],
                benefits: 'Détend les muscles du cou et de la gorge'
            },
            {
                id: 'relax-3',
                name: 'Bâillements Sonores',
                duration: 45,
                instructions: [
                    'Ouvrez grand la bouche comme pour bâiller',
                    'Laissez sortir un son naturel "Aaaah"',
                    'Sentez l\'ouverture de votre gorge',
                    'Répétez 5-6 fois'
                ],
                benefits: 'Ouvre la gorge et détend le larynx'
            }
        ],

        breathing: [
            {
                id: 'breath-1',
                name: 'Respiration Abdominale',
                duration: 90,
                instructions: [
                    'Placez une main sur votre ventre',
                    'Inspirez par le nez en gonflant le ventre (4 temps)',
                    'Expirez par la bouche en rentrant le ventre (4 temps)',
                    'Répétez 10 fois lentement'
                ],
                benefits: 'Développe le soutien diaphragmatique'
            },
            {
                id: 'breath-2',
                name: 'Respiration Côtale',
                duration: 90,
                instructions: [
                    'Placez vos mains sur les côtés de vos côtes',
                    'Inspirez en sentant les côtes s\'écarter',
                    'Expirez lentement en contrôlant',
                    'Répétez 8 fois'
                ],
                benefits: 'Renforce la capacité pulmonaire'
            },
            {
                id: 'breath-3',
                name: 'Exercice du "S"',
                duration: 120,
                instructions: [
                    'Inspirez profondément par le nez',
                    'Expirez sur un "sssss" continu',
                    'Essayez de tenir 15-20 secondes',
                    'Répétez 5 fois en augmentant la durée'
                ],
                benefits: 'Contrôle du souffle et endurance'
            },
            {
                id: 'breath-4',
                name: 'Exercice du "F"',
                duration: 120,
                instructions: [
                    'Inspirez profondément',
                    'Expirez sur un "fffff" constant',
                    'Maintenez le flux d\'air régulier',
                    'Répétez 5 fois'
                ],
                benefits: 'Régularité du souffle'
            }
        ],

        lips: [
            {
                id: 'lips-1',
                name: 'Trilles Labiales',
                duration: 90,
                instructions: [
                    'Faites vibrer vos lèvres : "Brrrr"',
                    'Commencez sur une note confortable',
                    'Montez et descendez sur 5 notes',
                    'Gardez les lèvres détendues'
                ],
                benefits: 'Détend les lèvres et active la résonance',
                hasAudio: true,
                audioType: 'scale',
                startNote: 'C4',
                range: 5
            },
            {
                id: 'lips-2',
                name: 'Trilles Linguales',
                duration: 90,
                instructions: [
                    'Faites rouler le "R" avec la langue',
                    'Montez et descendez sur une gamme',
                    'Si difficile, pratiquez le mouvement sans son d\'abord',
                    'Répétez 5 fois'
                ],
                benefits: 'Agilité de la langue et résonance',
                hasAudio: true,
                audioType: 'scale',
                startNote: 'C4',
                range: 5
            },
            {
                id: 'lips-3',
                name: 'Sons "M"',
                duration: 60,
                instructions: [
                    'Fermez la bouche et faites "Mmmmm"',
                    'Sentez la vibration dans le nez et le visage',
                    'Montez et descendez doucement',
                    'Gardez le son doux et continu'
                ],
                benefits: 'Résonance nasale et placement',
                hasAudio: true,
                audioType: 'sustained',
                startNote: 'C4'
            }
        ]
    },

    // ==================== GAMMES & VOCALISES ====================
    scales: {
        ascending: [
            {
                id: 'scale-1',
                name: 'Gamme Majeure - Voyelle "A"',
                duration: 120,
                instructions: [
                    'Chantez : Do-Ré-Mi-Fa-Sol-Fa-Mi-Ré-Do',
                    'Sur la voyelle "Ah" ouverte',
                    'Commencez à C4 (Do4)',
                    'Montez par demi-tons jusqu\'à votre limite confortable'
                ],
                pattern: [0, 2, 4, 5, 7, 5, 4, 2, 0],
                vowel: 'A',
                hasAudio: true,
                startNote: 'C4',
                steps: 8
            },
            {
                id: 'scale-2',
                name: 'Gamme Majeure - Voyelle "E"',
                duration: 120,
                instructions: [
                    'Même gamme sur "É" (comme dans "été")',
                    'Gardez la bouche en position souriante',
                    'Attention à ne pas forcer sur les aigus'
                ],
                pattern: [0, 2, 4, 5, 7, 5, 4, 2, 0],
                vowel: 'E',
                hasAudio: true,
                startNote: 'C4',
                steps: 8
            },
            {
                id: 'scale-3',
                name: 'Gamme Majeure - Voyelle "I"',
                duration: 120,
                instructions: [
                    'Gamme sur "I" (comme dans "ici")',
                    'Voyelle la plus aiguë, parfaite pour les notes hautes',
                    'Gardez la gorge ouverte'
                ],
                pattern: [0, 2, 4, 5, 7, 5, 4, 2, 0],
                vowel: 'I',
                hasAudio: true,
                startNote: 'C4',
                steps: 8
            },
            {
                id: 'scale-4',
                name: 'Gamme Majeure - Voyelle "O"',
                duration: 120,
                instructions: [
                    'Gamme sur "O" arrondi',
                    'Bouche en forme de cercle',
                    'Excellent pour la résonance'
                ],
                pattern: [0, 2, 4, 5, 7, 5, 4, 2, 0],
                vowel: 'O',
                hasAudio: true,
                startNote: 'C4',
                steps: 8
            },
            {
                id: 'scale-5',
                name: 'Gamme Majeure - Voyelle "U"',
                duration: 120,
                instructions: [
                    'Gamme sur "Ou" (comme dans "vous")',
                    'Lèvres arrondies vers l\'avant',
                    'Bon pour les graves et le contrôle'
                ],
                pattern: [0, 2, 4, 5, 7, 5, 4, 2, 0],
                vowel: 'U',
                hasAudio: true,
                startNote: 'C4',
                steps: 8
            }
        ],

        arpeggios: [
            {
                id: 'arp-1',
                name: 'Arpège Majeur',
                duration: 90,
                instructions: [
                    'Chantez : Do-Mi-Sol-Mi-Do',
                    'Sur "A", "E", "I", "O", ou "U"',
                    'Sautez clairement entre les notes',
                    'Montez par demi-tons'
                ],
                pattern: [0, 4, 7, 4, 0],
                hasAudio: true,
                startNote: 'C4',
                steps: 8
            },
            {
                id: 'arp-2',
                name: 'Arpège Mineur',
                duration: 90,
                instructions: [
                    'Chantez : Do-Mib-Sol-Mib-Do',
                    'Caractère plus sombre que le majeur',
                    'Bon pour l\'expression émotionnelle'
                ],
                pattern: [0, 3, 7, 3, 0],
                hasAudio: true,
                startNote: 'C4',
                steps: 8
            }
        ],

        intervals: [
            {
                id: 'int-1',
                name: 'Tierces Majeures',
                duration: 90,
                instructions: [
                    'Chantez deux notes espacées d\'une tierce',
                    'Do-Mi, Ré-Fa, Mi-Sol, etc.',
                    'Travaille la justesse des intervalles'
                ],
                pattern: [0, 4],
                hasAudio: true,
                startNote: 'C4',
                steps: 8
            },
            {
                id: 'int-2',
                name: 'Quintes Justes',
                duration: 90,
                instructions: [
                    'Do-Sol, Ré-La, Mi-Si',
                    'Intervalle large, bon pour l\'étendue vocale'
                ],
                pattern: [0, 7],
                hasAudio: true,
                startNote: 'C4',
                steps: 8
            },
            {
                id: 'int-3',
                name: 'Octaves',
                duration: 90,
                instructions: [
                    'Sautez d\'une octave : Do grave - Do aigu',
                    'Excellent pour travailler les registres',
                    'Transition voix de poitrine / voix de tête'
                ],
                pattern: [0, 12],
                hasAudio: true,
                startNote: 'C3',
                steps: 6
            }
        ]
    },

    // ==================== TECHNIQUE VOCALE ====================
    technique: {
        projection: [
            {
                id: 'proj-1',
                name: 'Exercice "Hey!"',
                duration: 60,
                instructions: [
                    'Dites "Hey!" avec énergie',
                    'Projetez le son vers l\'avant',
                    'Sentez l\'engagement du diaphragme',
                    'Répétez 10 fois avec différentes hauteurs'
                ],
                benefits: 'Développe la projection et la puissance'
            },
            {
                id: 'proj-2',
                name: 'Staccato',
                duration: 90,
                instructions: [
                    'Chantez des notes courtes et détachées',
                    'Sur "Ha-Ha-Ha-Ha-Ha"',
                    'Chaque note est précise et énergique',
                    'Montez et descendez sur une gamme'
                ],
                benefits: 'Précision et contrôle du souffle',
                hasAudio: true,
                startNote: 'C4',
                steps: 5
            }
        ],

        agility: [
            {
                id: 'agil-1',
                name: 'Vocalises Rapides',
                duration: 120,
                instructions: [
                    'Gamme rapide : Do-Ré-Mi-Fa-Sol-Fa-Mi-Ré-Do',
                    'Accélérez progressivement',
                    'Gardez la clarté de chaque note',
                    'Sur différentes voyelles'
                ],
                benefits: 'Agilité et flexibilité vocale',
                hasAudio: true,
                startNote: 'C4',
                tempo: 'fast'
            },
            {
                id: 'agil-2',
                name: 'Mélismes',
                duration: 90,
                instructions: [
                    'Plusieurs notes sur une seule syllabe',
                    'Comme dans le R&B ou le gospel',
                    'Commencez lentement puis accélérez'
                ],
                benefits: 'Ornementation et style'
            }
        ],

        registers: [
            {
                id: 'reg-1',
                name: 'Voix de Poitrine',
                duration: 90,
                instructions: [
                    'Chantez dans votre registre grave/médium',
                    'Placez une main sur votre poitrine',
                    'Sentez les vibrations',
                    'Son plein et riche'
                ],
                benefits: 'Renforce le registre de poitrine',
                range: 'chest'
            },
            {
                id: 'reg-2',
                name: 'Voix de Tête',
                duration: 90,
                instructions: [
                    'Montez dans les notes aiguës',
                    'Son plus léger et aérien',
                    'Sentez la résonance dans la tête',
                    'Utilisez "I" ou "U" pour faciliter'
                ],
                benefits: 'Développe le registre de tête',
                range: 'head'
            },
            {
                id: 'reg-3',
                name: 'Voix Mixte',
                duration: 120,
                instructions: [
                    'Transition entre poitrine et tête',
                    'Mélange des deux registres',
                    'Le plus important pour le chant moderne',
                    'Pratiquez le passage (Do4-Fa4 pour femmes)'
                ],
                benefits: 'Unification des registres',
                range: 'mixed'
            }
        ]
    },

    // ==================== RÉSONANCE ====================
    resonance: {
        placement: [
            {
                id: 'res-1',
                name: 'Masque Facial',
                duration: 90,
                instructions: [
                    'Chantez "Mmm" puis "Mah"',
                    'Sentez la vibration dans le visage',
                    'Imaginez le son sortant par le front',
                    'Répétez sur différentes hauteurs'
                ],
                benefits: 'Placement vocal optimal'
            },
            {
                id: 'res-2',
                name: 'Résonance Nasale',
                duration: 60,
                instructions: [
                    'Sons "M", "N", "Ng"',
                    'Vibrations dans le nez',
                    'Ne forcez pas, restez naturel',
                    'Bon pour les notes aiguës'
                ],
                benefits: 'Enrichit le timbre vocal'
            }
        ],

        throat: [
            {
                id: 'throat-1',
                name: 'Ouverture de Gorge',
                duration: 90,
                instructions: [
                    'Bâillez en chantant "Ah"',
                    'Sentez l\'espace dans la gorge',
                    'Gardez cette sensation en chantant',
                    'Évite la tension laryngée'
                ],
                benefits: 'Prévient la tension et améliore le son'
            },
            {
                id: 'throat-2',
                name: 'Exercice du "Ng"',
                duration: 60,
                instructions: [
                    'Faites le son "Ng" (comme dans "sing")',
                    'Langue contre le palais',
                    'Excellent pour la résonance',
                    'Puis ouvrez sur "Ah"'
                ],
                benefits: 'Placement et résonance'
            }
        ]
    }
}

// Programmes prédéfinis par niveau
export const programs = {
    beginner: {
        name: 'Programme Débutant',
        duration: 10,
        exercises: [
            'relax-1', 'relax-2', 'breath-1', 'breath-3',
            'lips-1', 'lips-3', 'scale-1', 'scale-2'
        ]
    },
    intermediate: {
        name: 'Programme Intermédiaire',
        duration: 20,
        exercises: [
            'relax-1', 'relax-2', 'relax-3',
            'breath-1', 'breath-2', 'breath-3',
            'lips-1', 'lips-2', 'lips-3',
            'scale-1', 'scale-2', 'scale-3', 'scale-4',
            'arp-1', 'proj-1', 'reg-3'
        ]
    },
    advanced: {
        name: 'Programme Avancé',
        duration: 30,
        exercises: [
            'relax-1', 'relax-2', 'relax-3',
            'breath-1', 'breath-2', 'breath-3', 'breath-4',
            'lips-1', 'lips-2', 'lips-3',
            'scale-1', 'scale-2', 'scale-3', 'scale-4', 'scale-5',
            'arp-1', 'arp-2', 'int-1', 'int-2', 'int-3',
            'proj-1', 'proj-2', 'agil-1', 'agil-2',
            'reg-1', 'reg-2', 'reg-3',
            'res-1', 'res-2', 'throat-1', 'throat-2'
        ]
    }
}

// Fonction helper pour trouver un exercice par ID
export const findExerciseById = (id) => {
    for (const category in vocalExercises) {
        for (const subcategory in vocalExercises[category]) {
            const exercise = vocalExercises[category][subcategory].find(ex => ex.id === id)
            if (exercise) return exercise
        }
    }
    return null
}
