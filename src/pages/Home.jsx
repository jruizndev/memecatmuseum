import React, { useState, useEffect } from 'react';
import { getMemes, deleteMeme } from '../services/services';
import '../../Home.css'

const Home = () => {
    const [memes, setMemes] = useState([]);

    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const data = await getMemes();
                setMemes(data);
            } catch (error) {
                console.error('Error fetching memes:', error);
            }
        };

        fetchMemes();
    }, []);

    // Función para eliminar un meme
    const handleDelete = async (id) => {
        try {
            await deleteMeme(id);
            setMemes(memes.filter((meme) => meme.id !== id));
        } catch (error) {
            console.error('Error deleting meme:', error);
        }
    };

    // Estado para manejar si una tarjeta está volteada
    const [flipped, setFlipped] = useState({});

    const handleFlip = (id) => {
        setFlipped((prevFlipped) => ({
            ...prevFlipped,
            [id]: !prevFlipped[id], // Alternar el estado de "flip"
        }));
    };

    return (
      <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Eventos Históricos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="result">
        {memes.map((meme) => (
          <div key={meme.id} className={`card ${flipped[meme.id] ? 'flipped' : ''}`} onClick={() => handleFlip(meme.id)}>
            <div className="card-full">
              {/* Parte frontal - Imagen */}
              <div className="card-front">
                <img className="w-full h-48 object-content" src={meme.image} alt={meme.description} />
              </div>
              {/* Parte trasera - Datos */}
              <div className="card-back">
                <h2 className="card-title">{meme.name}</h2>
                <p className="card-description">{meme.description}</p>
                <p className="card-location">Categoría: {meme.category}</p>
                <p className="card-date">Fecha: {meme.date}</p>
                <p className="card-figures">Likes: {meme.likes}</p>
                <div className="card-buttons">
                  <button className="delete" onClick={() => handleDelete(meme.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="divForm">
        <button id="CreateNewEventBtn" className="add-button" onClick={() => console.log('Añadir Nuevo Evento')}>
          Añadir Nuevo Evento
        </button>
      </div>
    </div>
  );
};

export default Home;
