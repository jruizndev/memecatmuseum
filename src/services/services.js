import axios from 'axios'

const BaseUrl = 'http://localhost:5000/memes' //Modificar cuando tengamos la url exacta

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
// export const getMemeById = async (id) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/${id}`)
//         return response.data
//     } catch (error) {
//         console.error(`Error al obtener el meme con ID ${id}:`, error)
//         throw error
//     }
// }

// Crear un nuevo meme
export const createMeme = async (meme) => {
    try {
        const response = await axios.post(BaseUrl, meme)
        return response.data
    } catch (error) {
        console.error('Error al crear el meme:', error)
        throw error
    }
}

// Actualizar un meme existente
export const updateMeme = async (id, updatedMeme) => {
    try {
        const response = await axios.put(`${BaseUrl}/${id}`, updatedMeme)
        return response.data
    } catch (error) {
        console.error(`Error al actualizar el meme con ID ${id}:`, error)
        throw error
    }
}

// Eliminar un meme por ID
export const deleteMeme = async (id) => {
    try {
        await axios.delete(`${BaseUrl}/${id}`)
    } catch (error) {
        console.error(`Error al eliminar el meme con ID ${id}:`, error)
        throw error
    }
}
