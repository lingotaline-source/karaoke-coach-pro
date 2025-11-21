const DB_NAME = 'karaoke-db'
const STORE_NAME = 'recordings'
const DB_VERSION = 1

const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION)

        request.onerror = (event) => reject(event.target.error)

        request.onsuccess = (event) => resolve(event.target.result)

        request.onupgradeneeded = (event) => {
            const db = event.target.result
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' })
            }
        }
    })
}

export const saveRecording = async (recording) => {
    const db = await openDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.put(recording)

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

export const getRecordings = async () => {
    const db = await openDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.getAll()

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

export const deleteRecording = async (id) => {
    const db = await openDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.delete(id)

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}
