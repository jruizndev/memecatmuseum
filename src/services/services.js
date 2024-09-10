import axios from 'axios'

const BaseUrl = 'http://localhost:3000/memes' // Cambia por la URL de tu API si es necesario

// Obtener todos los memes
export const getMemes = async () => {
    try {
        const response = await axios.get(BaseUrl)
        return response.data
    } catch (error) {
        console.error('Error al obtener los memes:', error)
        throw error
    }
}

// Obtener un meme por ID
export const getMemeById = async (id) => {
    try {
        const response = await axios.get(`${BaseUrl}/${id}`)
        return response.data
    } catch (error) {
        console.error('Error al obtener el meme:', error)
        throw error
    }
}

// Crear un nuevo meme
export const createMeme = async (memeData) => {
    try {
        const response = await axios.post(BaseUrl, memeData)
        return response.data
    } catch (error) {
        console.error('Error al crear el meme:', error)
        throw error
    }
}

// Actualizar un meme existente por ID
export const updateMeme = async (id, updatedMemeData) => {
    try {
        const response = await axios.put(`${BaseUrl}/${id}`, updatedMemeData)
        return response.data
    } catch (error) {
        console.error('Error al actualizar el meme:', error)
        throw error
    }
}


// Eliminar un meme por ID
export const deleteMeme = async (id) => {
    try {
        await axios.delete(`${BaseUrl}/${id}`)
    } catch (error) {
        console.error('Error al eliminar el meme:', error)
        throw error
    }
}
