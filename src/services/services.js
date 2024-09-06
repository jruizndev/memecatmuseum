import axios from 'axios';

const BaseUrl = 'http://localhost:3000/memes'; // Cambia por la URL de tu API si es necesario

// Obtener todos los memes
export const getMemes = async () => {
  try {
    const response = await axios.get(BaseUrl);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los memes:', error);
    throw error;
  }
};

// Eliminar un meme por ID
export const deleteMeme = async (id) => {
  try {
    await axios.delete(`${BaseUrl}/${id}`);
  } catch (error) {
    console.error('Error al eliminar el meme:', error);
    throw error;
  }
};
