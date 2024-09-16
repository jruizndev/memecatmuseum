import React, { useEffect, useRef, useState } from 'react';
import Masonry from 'masonry-layout';
import Card from '../components/Card'; // Asegúrate de que la ruta sea correcta

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
  ];

  return memes.map((meme, index) => {
    const randomMarginTop = Math.floor(Math.random() * 120);
    const randomMarginBottom = Math.floor(Math.random() * 120) + 30;

    if (index < positions.length) {
      const position = positions[index];
      return { ...meme, ...position, randomMarginTop, randomMarginBottom };
    } else {
      return { ...meme, randomMarginTop, randomMarginBottom };
    }
  });
};

const MemeGrid = ({ memes, onDelete }) => {
  const [flipped, setFlipped] = useState({});
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      const masonry = new Masonry(gridRef.current, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true,
        gutter: 10, // Espaciado entre los elementos
      });

      // Destruir Masonry al desmontar el componente
      return () => masonry.destroy();
    }
  }, [memes]);

  const handleFlip = (id) => {
    setFlipped((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Invierte el estado de la tarjeta con el ID
    }));
  };

  const patternedMemes = generatePattern(memes);

  return (
    <div
      ref={gridRef}
      className="flex flex-wrap sm:flex-col items-start justify-start ml-40 w-[60%] mx-auto pt-4"
    >
      {patternedMemes.map((meme) => (
        <div
          key={meme.id}
          className="grid-item"
          style={{
            marginTop: `${meme.randomMarginTop}px`,
            marginBottom: `${meme.randomMarginBottom}px`,
            width: 'calc(33.333% - 16px)', // Ajusta el ancho para que haya espacio entre los items
          }}
        >
          <Card
            meme={meme}
            handleDelete={onDelete}
            handleFlip={() => handleFlip(meme.id)} // Asegúrate de pasar la función correctamente
            isFlipped={flipped[meme.id] || false} // Pasamos el estado de volteo
          />
        </div>
      ))}
    </div>
  );
};

export default MemeGrid;
