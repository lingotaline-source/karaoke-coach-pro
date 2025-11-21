// YouTube Data API v3 utilities

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || 'AIzaSyCr5JIGqfQD2BnGSWRnEWVlZ_inZOIg6-k'

/**
 * Recherche de vidéos YouTube avec l'API
 * @param {string} query - Terme de recherche
 * @param {number} maxResults - Nombre de résultats (max 50)
 * @returns {Promise<Array>} Liste de vidéos
 */
export const searchYouTubeVideos = async (query, maxResults = 10) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?` +
            `part=snippet&q=${encodeURIComponent(query)}&` +
            `type=video&maxResults=${maxResults}&` +
            `videoEmbeddable=true&` +
            `key=${YOUTUBE_API_KEY}`
        )

        if (!response.ok) {
            throw new Error('YouTube API error')
        }

        const data = await response.json()

        return data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.default.url,
            channelTitle: item.snippet.channelTitle,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`
        }))
    } catch (error) {
        console.error('Error searching YouTube:', error)
        return []
    }
}

/**
 * Obtenir les suggestions de recherche YouTube
 * @param {string} query - Terme de recherche partiel
 * @returns {Promise<Array<string>>} Liste de suggestions
 */
export const getYouTubeSuggestions = async (query) => {
    try {
        // Utilise l'API de suggestions de YouTube (non officielle mais publique)
        const response = await fetch(
            `https://suggestqueries.google.com/complete/search?` +
            `client=youtube&ds=yt&q=${encodeURIComponent(query)}`
        )

        const text = await response.text()
        // Parse la réponse JSONP
        const json = JSON.parse(text.replace(/^[^[]*/, '').replace(/[^]]*$/, ''))

        return json[1].map(item => item[0])
    } catch (error) {
        console.error('Error getting suggestions:', error)
        return []
    }
}

/**
 * Obtenir les détails d'une vidéo
 * @param {string} videoId - ID de la vidéo YouTube
 * @returns {Promise<Object>} Détails de la vidéo
 */
export const getVideoDetails = async (videoId) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?` +
            `part=snippet,contentDetails&id=${videoId}&` +
            `key=${YOUTUBE_API_KEY}`
        )

        if (!response.ok) {
            throw new Error('YouTube API error')
        }

        const data = await response.json()

        if (data.items.length === 0) {
            return null
        }

        const video = data.items[0]
        return {
            id: video.id,
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnail: video.snippet.thumbnails.high.url,
            duration: video.contentDetails.duration,
            channelTitle: video.snippet.channelTitle
        }
    } catch (error) {
        console.error('Error getting video details:', error)
        return null
    }
}
