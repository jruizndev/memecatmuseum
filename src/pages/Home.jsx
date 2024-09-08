import React, { useState, useEffect } from 'react';
import { getMemes, deleteMeme } from '../services/services';
import './Home.css'; // Importamos el archivo CSS

const Home = () => {
  const [memes, setMemes] = useState([]);
  const [flipped, setFlipped] = useState({});

  // Obtener los memes al cargar el componente
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

  // Función para voltear la tarjeta
  const handleFlip = (id) => {
    setFlipped((prevFlipped) => ({
      ...prevFlipped,
      [id]: !prevFlipped[id],
    }));
  };

  return (
    <div className='container'>
      <h1 className='title'>MeMeCats</h1>
      <div className='grid'>
        {memes.map((meme) => (
          <div
            key={meme.id}
            className={`card ${flipped[meme.id] ? 'flipped' : ''}`}
            
          >
            <div className='card-full'>
              <div className='card-front'>
                <img
                  className='image'
                  src={meme.image}
                  alt={meme.description}
                />
                 <div className='card-buttons'>
                  <button
                    className='delete'
                    onClick={() => handleDelete(meme.id)}
                  >
                    Eliminar
                  </button>
                  <button className='more' onClick={() => handleFlip(meme.id)}>
                    Voltear
                  </button>
                  <button className='edit' onClick={() => deleteMeme(meme.id)}>
                    Editar
                  </button>
                </div>
              </div>
              <div className='card-back'>
                <h2 className='card-title'>{meme.name}</h2>
                <p className='card-description'>{meme.description}</p>
                <p className='card-location'>Categoría: {meme.category}</p>
                <p className='card-date'>Fecha: {meme.date}</p>
                <p className='card-figures'>Likes: {meme.likes}</p>
               
              </div>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default Home;
