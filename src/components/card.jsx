import React from 'react'

const Card = ({ meme, flipped, onFlip, onDelete, onEdit }) => {
    return (
        <div
            key={meme.id}
            className={`group relative max-w-[300px] min-h-[420px] p-2 bg-transparent transition-transform duration-700 ease-in-out hover:bg-white hover:shadow-lg hover:scale-110 rounded-lg ${
                flipped[meme.id] ? 'rotate-y-180' : ''
            }`}
            style={{
                gridRow: meme.gridRow,
                gridColumn: meme.gridColumn,
                zIndex: 1,
                perspective: '1000px', // Asegura el efecto de perspectiva para la rotación 3D
            }}
        >
            <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700">
                {/* Parte frontal de la tarjeta */}
                <div
                    className={`absolute w-full h-full backface-hidden ${
                        flipped[meme.id] ? 'hidden' : ''
                    }`}
                >
                    <div className="w-full h-full flex flex-col justify-between items-center overflow-hidden rounded-lg bg-gray-200">
                        <div className="w-full flex justify-center items-center overflow-hidden bg-gray-300 p-2 rounded-t-lg">
                            <img
                                src={meme.image}
                                alt={meme.description}
                                className="w-full h-auto object-cover rounded-lg"
                                style={{ maxHeight: '250px' }} // Ajusta la altura máxima para evitar deformaciones
                            />
                        </div>

                        {/* Botones en la parte frontal */}
                        <div className="w-full flex justify-evenly p-2 bg-white rounded-b-lg">
                            <button
                                className="p-2 bg-blue-500 text-white rounded"
                                onClick={() => onDelete(meme.id)}
                            >
                                Like
                            </button>
                            <button
                                className="p-2 bg-red-500 text-white rounded"
                                onClick={() => onDelete(meme.id)}
                            >
                                Delete
                            </button>
                            <button
                                className="p-2 bg-green-500 text-white rounded"
                                onClick={() => onFlip(meme.id)}
                            >
                                More
                            </button>
                            <button
                                className="p-2 bg-yellow-500 text-white rounded"
                                onClick={() => onEdit(meme.id)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>

                {/* Parte trasera de la tarjeta */}
                <div
                    className={`absolute w-full h-full bg-purple-100 p-4 rounded-lg shadow-lg ${
                        flipped[meme.id] ? '' : 'hidden'
                    } top-0 left-0`}
                >
                    <h2 className="text-md font-semibold text-center mb-2">
                        {meme.name}
                    </h2>
                    <p className="text-sm text-gray-600 text-center">
                        Categoría: {meme.category}
                    </p>
                    <p className="text-sm text-gray-600 text-center">
                        Likes: {meme.likes}
                    </p>
                    <p className="text-sm text-gray-600 text-center">
                        Fecha: {meme.date}
                    </p>

                    {/* Botones en la parte trasera */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-evenly opacity-100 z-10">
                        <button
                            className="p-2 bg-blue-500 text-white rounded"
                            onClick={() => onDelete(meme.id)}
                        >
                            Like
                        </button>
                        <button
                            className="p-2 bg-red-500 text-white rounded"
                            onClick={() => onDelete(meme.id)}
                        >
                            Delete
                        </button>
                        <button
                            className="p-2 bg-green-500 text-white rounded"
                            onClick={() => onFlip(meme.id)}
                        >
                            More
                        </button>
                        <button
                            className="p-2 bg-yellow-500 text-white rounded"
                            onClick={() => onEdit(meme.id)}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
