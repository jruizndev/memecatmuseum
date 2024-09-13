import React, { useState, useEffect } from 'react'
import { getMemeByCategory, deleteMeme } from '../services/services'
import MemeGrid from '../components/MemeGrid'

const categories = [
    'gatos_siendo_gatos1',
    'gatos_siendo_humanos2',
    'gatos_enfadados3',
    'me_dijiste4',
]

// Manteniendo los fondos degradados que ya tenías definidos
const categoryClasses = {
    gatos_siendo_gatos1: 'bg-gatos-siendo-gatos1',
    gatos_siendo_humanos2: 'bg-gatos-siendo-humanos2',
    gatos_enfadados3: 'bg-gatos-enfadados3',
    me_dijiste4: 'bg-me-dijiste4',
}

const categoryTitles = {
    gatos_siendo_gatos1: 'Gatos Siendo Gatos',
    gatos_siendo_humanos2: 'Gatos Siendo Humanos',
    gatos_enfadados3: 'Gatos Enfadados',
    me_dijiste4: 'Me Dijiste',
}

const Home = () => {
    const [memesByCategory, setMemesByCategory] = useState({})

    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const memesPromises = categories.map((category) =>
                    getMemeByCategory(category)
                )
                const memesResults = await Promise.all(memesPromises)
                const memesByCategory = categories.reduce(
                    (acc, category, index) => {
                        acc[category] = memesResults[index]
                        return acc
                    },
                    {}
                )
                setMemesByCategory(memesByCategory)
            } catch (error) {
                console.error('Error fetching memes:', error)
            }
        }

        fetchMemes()
    }, [])

    const handleDelete = async (category, id) => {
        try {
            await deleteMeme(id)
            setMemesByCategory((prev) => ({
                ...prev,
                [category]: prev[category].filter((meme) => meme.id !== id),
            }))
        } catch (error) {
            console.error('Error deleting meme:', error)
        }
    }

    return (
        <div className="flex flex-col items-center w-full h-auto p-0 overflow-x-hidden">
            {categories.map((category) => (
                <div
                    key={category}
                    className={`w-full py-10 ${categoryClasses[category]}`} // Aquí aplicamos los fondos personalizados
                >
                    <h1 className="text-3xl font-bold mb-8 text-center text-white"></h1>
                    <MemeGrid
                        memes={memesByCategory[category] || []}
                        onDelete={(id) => handleDelete(category, id)}
                    />
                </div>
            ))}
        </div>
    )
}

export default Home
