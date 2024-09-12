import React, { useState, useEffect } from 'react'
import { getMemes, deleteMeme } from '../services/services'

const Home = () => {
    const [memes, setMemes] = useState([])

    // Se ejecuta al cargar el componente para obtener los memes
    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const data = await getMemes()
                setMemes(data)
            } catch (error) {
                console.error('Error fetching memes:', error)
            }
        }

        fetchMemes()
    }, [])

    // Maneja la eliminación de memes
    const handleDelete = async (id) => {
        try {
            await deleteMeme(id)
            setMemes(memes.filter((meme) => meme.id !== id))
        } catch (error) {
            console.error('Error deleting meme:', error)
        }
    }

    const generatePattern = (memes) => {
        const positions = [
            { gridRow: 1, gridColumn: 2 },
            { gridRow: 1, gridColumn: 3 },
            { gridRow: 2, gridColumn: 1 },
            { gridRow: 2, gridColumn: 2 },
            { gridRow: 3, gridColumn: 1 },
            { gridRow: 4, gridColumn: 3 },
            { gridRow: 4, gridColumn: 2 },
            { gridRow: 5, gridColumn: 2 },
            { gridRow: 5, gridColumn: 3 },
        ]

        let currentRow = 6 // La fila empieza en 6
        let currentColumn = 1 // Empezamos desde la columna 1
        let remainingMemesInRow = 0 // Controlará cuántos memes habrá en la fila actual

        return memes.map((meme, index) => {
            if (index < 8) {
                // Para los primeros 8 memes, usar las posiciones predefinidas
                const position = positions[index]
                return { ...meme, ...position }
            } else {
                // Si estamos empezando una nueva fila, determinar aleatoriamente cuántos memes habrá en esa fila (entre 2 y 3)
                if (remainingMemesInRow === 0) {
                    remainingMemesInRow = Math.floor(Math.random() * 2) + 2 // Número aleatorio entre 2 y 3
                }

                const gridColumn = currentColumn
                const gridRow = currentRow

                // Avanzar a la siguiente columna
                currentColumn++

                // Reducir la cantidad de memes restantes en la fila
                remainingMemesInRow--

                // Si ya hemos llenado la fila, reiniciar columnas y avanzar a la siguiente fila
                if (remainingMemesInRow === 0 || currentColumn > 3) {
                    currentColumn = 1 // Volver a la primera columna
                    currentRow++ // Avanzar a la siguiente fila
                }

                // Devolver el meme con las posiciones de la cuadrícula
                return {
                    ...meme,
                    gridRow: gridRow,
                    gridColumn: gridColumn,
                }
            }
        })
    }

    // Generar los memes con el patrón aplicado
    const patternedMemes = generatePattern(memes)

    return (
        <div className="flex flex-col items-center justify-center w-full h-auto p-5 mt-96 bg-gradient-to-b from-[#f0f4f8] to-[#f35d8a] overflow-x-hidden">
            <h1 className="text-3xl font-bold mb-5 text-center">
                Lista de Memes de Gatos
            </h1>
            <div className="grid grid-cols-3 auto-rows-auto gap-5 w-[90%] mx-auto">
                {patternedMemes.map((meme) => (
                    <div
                        key={meme.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
                        style={{
                            gridRow: meme.gridRow,
                            gridColumn: meme.gridColumn,
                        }}
                    >
                        <h2 className="text-md font-semibold text-center">
                            {meme.name}
                        </h2>
                        <div className="w-full aspect-[4/3] flex justify-center items-center overflow-hidden">
                            <img
                                src={meme.image}
                                alt={meme.description}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <p className="text-sm text-gray-600 text-center">
                            {meme.description}
                        </p>
                        <button
                            onClick={() => handleDelete(meme.id)}
                            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
