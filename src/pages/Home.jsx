/* eslint-disable react/no-unknown-property */
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
              <img className='image' src={meme.image} alt={meme.description} />

              <div className='card-back'>
                <h2 className='card-title'>{meme.name}</h2>
                <p className='card-description'>{meme.description}</p>
                <p className='card-category'>Categoría: {meme.category}</p>
                <p className='card-date'>Fecha: {meme.date}</p>
                <p className='card-likes'>Likes: {meme.likes}</p>
              </div>
            </div>
            <div className='card-buttons'>
              <button className='like' onClick={() => deleteMeme(meme.id)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='22px'
                  height='22px'
                  viewBox='0 0 24 22'
                  fill='none'
                >
                  <path
                    d='M17.4545 0C15.1636 0 13.1716 1.10805 12 2.96493C10.8284 1.10805 8.83636 0 6.54545 0C4.81011 0.00216767 3.14642 0.742506 1.91935 2.05861C0.692279 3.37471 0.00202103 5.15911 0 7.02035C0 10.4369 1.98545 13.9927 5.90182 17.5872C7.69643 19.2273 9.63493 20.6771 11.6902 21.9164C11.7854 21.9713 11.8919 22 12 22C12.1081 22 12.2146 21.9713 12.3098 21.9164C14.3651 20.6771 16.3036 19.2273 18.0982 17.5872C22.0145 13.9927 24 10.4369 24 7.02035C23.998 5.15911 23.3077 3.37471 22.0807 2.05861C20.8536 0.742506 19.1899 0.00216767 17.4545 0ZM12 20.4889C10.2098 19.3809 1.30909 13.5399 1.30909 7.02035C1.31053 5.5313 1.86269 4.10367 2.84438 3.05075C3.82608 1.99783 5.15713 1.40562 6.54545 1.40407C8.75782 1.40407 10.6156 2.67124 11.3945 4.71183C11.4439 4.84059 11.5278 4.95072 11.6356 5.02822C11.7434 5.10573 11.8702 5.14711 12 5.14711C12.1298 5.14711 12.2566 5.10573 12.3644 5.02822C12.4723 4.95072 12.5561 4.84059 12.6055 4.71183C13.3844 2.67124 15.2422 1.40407 17.4545 1.40407C18.8429 1.40562 20.1739 1.99783 21.1556 3.05075C22.1373 4.10367 22.6895 5.5313 22.6909 7.02035C22.6909 13.5399 13.7902 19.3809 12 20.4889Z'
                    fill='#A3A3A3'
                  />
                </svg>
              </button>
              <button className='delete' onClick={() => handleDelete(meme.id)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24px'
                  height='26px'
                  viewBox='0 0 256 256'
                >
                  <path
                    fill='currentColor'
                    d='M216 50h-42V40a22 22 0 0 0-22-22h-48a22 22 0 0 0-22 22v10H40a6 6 0 0 0 0 12h10v146a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V62h10a6 6 0 0 0 0-12M94 40a10 10 0 0 1 10-10h48a10 10 0 0 1 10 10v10H94Zm100 168a2 2 0 0 1-2 2H64a2 2 0 0 1-2-2V62h132Zm-84-104v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0m48 0v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0'
                  />
                </svg>
              </button>
              <button className='more' onClick={() => handleFlip(meme.id)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24px'
                  height='24px'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8'
                  />
                </svg>
              </button>
              <button className='edit' onClick={() => editMeme(meme.id)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='26'
                  height='26'
                  viewBox='0 0 26 26'
                  fill='none'
                >
                  <g clip-path='url(#clip0_272_658)'>
                    <path
                      d='M20.222 21.6668H4.33312V5.77794H13.8809L15.3253 4.3335H4.33312C3.95003 4.3335 3.58263 4.48568 3.31174 4.75656C3.04085 5.02745 2.88867 5.39485 2.88867 5.77794V21.6668C2.88867 22.0499 3.04085 22.4173 3.31174 22.6882C3.58263 22.9591 3.95003 23.1113 4.33312 23.1113H20.222C20.6051 23.1113 20.9725 22.9591 21.2434 22.6882C21.5143 22.4173 21.6665 22.0499 21.6665 21.6668V10.8335L20.222 12.2779V21.6668Z'
                      fill='#A3A3A3'
                    />
                    <path
                      d='M24.2153 4.21797L21.7814 1.78408C21.6734 1.67577 21.5451 1.58983 21.4038 1.5312C21.2625 1.47256 21.111 1.44238 20.9581 1.44238C20.8051 1.44238 20.6536 1.47256 20.5124 1.5312C20.3711 1.58983 20.2428 1.67577 20.1347 1.78408L10.2331 11.7435L9.43141 15.2174C9.39725 15.3858 9.40084 15.5597 9.44192 15.7265C9.48299 15.8934 9.56053 16.049 9.66896 16.1823C9.77739 16.3156 9.91401 16.4232 10.069 16.4974C10.224 16.5716 10.3935 16.6105 10.5653 16.6113C10.6541 16.621 10.7437 16.621 10.8325 16.6113L14.3353 15.8385L24.2153 5.86463C24.3236 5.75662 24.4095 5.62829 24.4682 5.48701C24.5268 5.34573 24.557 5.19427 24.557 5.0413C24.557 4.88834 24.5268 4.73687 24.4682 4.59559C24.4095 4.45431 24.3236 4.32598 24.2153 4.21797ZM13.5842 14.5024L10.9408 15.0874L11.5547 12.4657L19.0081 4.96186L21.0447 6.99852L13.5842 14.5024ZM21.8608 6.18241L19.8242 4.14575L20.9436 3.00463L22.9947 5.05575L21.8608 6.18241Z'
                      fill='#A3A3A3'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_272_658'>
                      <rect width='26' height='26' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
