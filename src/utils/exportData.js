export function exportToCSV(recordings) {
    if (!recordings || recordings.length === 0) {
        alert('Aucun enregistrement à exporter')
        return
    }

    const headers = ['Date', 'Score', 'Évaluation', 'Durée (s)', 'Notes Détectées', 'Justesse (%)', 'Volume (%)']

    const rows = recordings.map(rec => {
        const perf = rec.performance || {}
        return [
            rec.date || '',
            perf.score || 0,
            perf.rating || '',
            perf.duration ? Math.round(perf.duration / 1000) : 0,
            perf.notesDetected || 0,
            perf.avgClarity || 0,
            perf.avgAudioLevel || 0
        ]
    })

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', `karaoke_stats_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

export function exportToJSON(recordings) {
    if (!recordings || recordings.length === 0) {
        alert('Aucun enregistrement à exporter')
        return
    }

    const data = {
        exportDate: new Date().toISOString(),
        totalRecordings: recordings.length,
        recordings: recordings.map(rec => ({
            date: rec.date,
            performance: rec.performance
        }))
    }

    const jsonContent = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', `karaoke_data_${new Date().toISOString().split('T')[0]}.json`)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
