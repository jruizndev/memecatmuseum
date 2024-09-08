import React, { useState, useEffect } from 'react'
import { getMemes, deleteMeme } from '../services/services'

const Home = () => {
    const [memes, setMemes] = useState([])

    useEffect(() => {
        // Realizar la petición GET usando el servicio `getMemes`
        const fetchMemes = async () => {
            try {
                const data = await getMemes()
                setMemes(data) // Guardar la respuesta en el estado
            } catch (error) {
                console.error('Error fetching memes:', error) // Manejo de errores
            }
        }

        fetchMemes()
    }, [])

    // Función para eliminar un meme
    const handleDelete = async (id) => {
        try {
            await deleteMeme(id) // Llamar al servicio para eliminar el meme
            setMemes(memes.filter((meme) => meme.id !== id)) // Actualizar el estado eliminando el meme
        } catch (error) {
            console.error('Error deleting meme:', error) // Manejo de errores
        }
    }

    return (
        <div>
            <h1>Lista de Memes de Gatos</h1>
            <ul>
                {memes.map((meme) => (
                    <li key={meme.id}>
                        <h2>{meme.name}</h2>
                        <img src={meme.image} alt={meme.description} />
                        <p>{meme.description}</p>
                        <p>Categoría: {meme.category}</p>{' '}
                        {/* Cambiado memeegory por category */}
                        <p>Fecha: {meme.date}</p>
                        <p>Likes: {meme.likes}</p>
                        <button onClick={() => handleDelete(meme.id)}>
                            Eliminar
                        </button>{' '}
                        {/* Botón para eliminar */}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home
