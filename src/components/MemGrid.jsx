import React, { useEffect, useRef } from 'react'
import Masonry from 'masonry-layout'

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

    return memes.map((meme, index) => {
        const randomMarginTop = Math.floor(Math.random() * 120) + 0 // Márgen superior aleatorio
        const randomMarginBottom = Math.floor(Math.random() * 120) + 30 // Márgen inferior aleatorio

        if (index < positions.length) {
            const position = positions[index]
            return {
                ...meme,
                ...position,
                randomMarginTop,
                randomMarginBottom,
            }
        } else {
            return {
                ...meme,
                randomMarginTop,
                randomMarginBottom,
            }
        }
    })
}

const MemeGrid = ({ memes, onDelete }) => {
    const gridRef = useRef(null)

    useEffect(() => {
        if (gridRef.current) {
            const masonry = new Masonry(gridRef.current, {
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true,
                gutter: 10, // Ajusta el espaciado entre los elementos
            })

            // Asegúrate de que Masonry se actualice si cambian los memes
            return () => masonry.destroy()
        }
    }, [memes])

    const patternedMemes = generatePattern(memes)

    return (
        <div
            ref={gridRef}
            className="flex flex-wrap items-start justify-start ml-40 w-[60%] mx-auto pt-60"
        >
            {patternedMemes.map((meme) => (
                <div
                    key={meme.id}
                    className="grid-item bg-white border border-gray-200 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
                    style={{
                        marginTop: `${meme.randomMarginTop}px`,
                        marginBottom: `${meme.randomMarginBottom}px`,
                        width: 'calc(33.333% - 16px)', // Ajusta el ancho para que haya espacio entre los items
                    }}
                >
                    <h2 className="text-md font-semibold text-center p-2">
                        {meme.name}
                    </h2>
                    <div className="w-full aspect-[4/3] flex justify-center items-center overflow-hidden">
                        <img
                            src={meme.image}
                            alt={meme.description}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <p className="text-sm text-gray-600 text-center p-2">
                        {meme.description}
                    </p>
                    <button
                        onClick={() => onDelete(meme.id)}
                        className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Eliminar
                    </button>
                </div>
            ))}
        </div>
    )
}

export default MemeGrid
