import React, { useState, useEffect, useRef } from 'react';
import { getMemes, deleteMeme } from '../services/services';
import './Home.css'; // Importamos el archivo CSS

const Home = () => {
  const [memes, setMemes] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [categories, setCategories] = useState([]); // Estado para las categorías
  const gridContainerRef = useRef(null);

  // Obtener los memes al cargar el componente
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const data = await getMemes();
        setMemes(data);
        const uniqueCategories = [...new Set(data.map(meme => meme.category))];
        setCategories(uniqueCategories);
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

  // Función para generar posiciones aleatorias no superpuestas
  const generateRandomPositions = () => {
    const container = gridContainerRef.current;
    if (!container) {
      return [];
    }
  
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight || window.innerHeight; // Asegúrate de tener una altura suficiente
    const imgWidth = 200;
    const imgHeight = 200;
    const positions = [];
  
    const isOverlapping = (top, left) => {
      return positions.some(({ top: pTop, left: pLeft }) => {
        return !(
          left + imgWidth <= pLeft ||
          left >= pLeft + imgWidth ||
          top + imgHeight <= pTop ||
          top >= pTop + imgHeight
        );
      });
    };
  
    for (let i = 0; i < memes.length; i++) {
      let top, left;
      let attempts = 0;
      do {
        top = Math.random() * (containerHeight - imgHeight);
        left = Math.random() * (containerWidth - imgWidth);
        attempts++;
      } while (isOverlapping(top, left) && attempts < 100);
  
      positions.push({ top, left });
    }
  
    return positions;
  };

  useEffect(() => {
    const positions = generateRandomPositions();
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.style.top = `${positions[index]?.top}px` || '0px';
      card.style.left = `${positions[index]?.left}px` || '0px';
      card.style.transform = `rotate(${Math.random() * 10 - 10}deg)`;
    });
  }, [memes]);

  // Filtrar memes por categoría
  const filteredMemes = (category) => {
    return memes
      .filter(meme => meme.category === category)
      .slice(0, 10); // Máximo 10 memes por categoría
  };

  return (
    <div className="home-container">
      <h1 className='title'>MeMeCats</h1>
      <div className="scroll-container">
        {categories.map((category) => (
          <div key={category} className='category-block'>
            <h2 className='category-title'>{category}</h2>
            <div className='grid-container' ref={gridContainerRef}>
              {filteredMemes(category).map((meme) => (
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
                    </div>
                    <div className='card-back'>
                      <h2 className='card-title'>{meme.name}</h2>
                      <p className='card-description'>{meme.description}</p>
                      <p className='card-category'>Categoría: {meme.category}</p>
                      <p className='card-date'>Fecha: {meme.date}</p>
                      <p className='card-likes'>Likes: {meme.likes}</p>
                    </div>
                  </div>
                  <div className='card-buttons'>
                    <button className='like'>
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </button>
                    <button
                      className='delete'
                      onClick={() => handleDelete(meme.id)}
                    >
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 7v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7M6 7V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3M6 7h12"/>
                      </svg>
                    </button>
                    <button className='more' onClick={() => handleFlip(meme.id)}>
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2l9 9-9 9-9-9 9-9z"/>
                      </svg>
                    </button>
                    <button className='edit'>
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"/>
                        <path d="M12 12l9-9M3 21V12c0-3.313 2.687-6 6-6h12c3.313 0 6 2.687 6 6v9"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
