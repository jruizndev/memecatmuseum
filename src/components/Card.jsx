import React from "react";
import ReactCardFlip from "react-card-flip";

const Card = ({ meme, handleDelete, handleFlip, isFlipped }) => {
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      {/* Parte frontal */}
      <div
        key={meme.id}
        className="group relative w-full hover:z-20 max-w-xs min-h-[370px] transition-all ease-in-out duration-300"
        style={{
          perspective: "1000px",
          marginTop: "0px",
          marginBottom: "20px",
        }}
      >
        <div className="w-full h-full group-hover:z-10 transition-transform duration-300">
          {/* Contenedor envolvente para imagen y botones */}
          <div className="w-full h-full backface-hidden z-10 group-hover:scale-x-100 transition-transform duration-300">
            <div
              className="w-full min-h-[120px] flex flex-col justify-between overflow-hidden group-hover:bg-white transition-colors duration-300"
              style={{
                padding: "10px",
                backgroundColor: "transparent",
              }}
            >
              {/* Contenedor para imagen con marco solo en la parte superior */}
              <div className="relative flex-grow flex justify-center items-center overflow-hidden rounded-t-3xl group-hover:bg-white transition-colors duration-300">
                <img
                  src={meme.image}
                  alt={meme.description}
                  className="max-h-[350px] hover:border-8 border-2 hover:border-white w-auto object-contain rounded-3xl transition-all duration-300"
                />
              </div>

              {/* Contenedor de botones */}
              <div className="w-full rounded-b-3xl p-2 bg-white flex justify-evenly opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="like">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22px"
                    height="22px"
                    viewBox="0 0 24 22"
                    fill="none"
                  >
                    <path
                      d="M17.4545 0C15.1636 0 13.1716 1.10805 12 2.96493C10.8284 1.10805 8.83636 0 6.54545 0C4.81011 0.00216767 3.14642 0.742506 1.91935 2.05861C0.692279 3.37471 0.00202103 5.15911 0 7.02035C0 10.4369 1.98545 13.9927 5.90182 17.5872C7.69643 19.2273 9.63493 20.6771 11.6902 21.9164C11.7854 21.9713 11.8919 22 12 22C12.1081 22 12.2146 21.9713 12.3098 21.9164C14.3651 20.6771 16.3036 19.2273 18.0982 17.5872C22.0145 13.9927 24 10.4369 24 7.02035C23.998 5.15911 23.3077 3.37471 22.0807 2.05861C20.8536 0.742506 19.1899 0.00216767 17.4545 0ZM12 20.4889C10.2098 19.3809 1.30909 13.5399 1.30909 7.02035C1.31053 5.5313 1.86269 4.10367 2.84438 3.05075C3.82608 1.99783 5.15713 1.40562 6.54545 1.40407C8.75782 1.40407 10.6156 2.67124 11.3945 4.71183C11.4439 4.84059 11.5278 4.95072 11.6356 5.02822C11.7434 5.10573 11.8702 5.14711 12 5.14711C12.1298 5.14711 12.2566 5.10573 12.3644 5.02822C12.4723 4.95072 12.5561 4.84059 12.6055 4.71183C13.3844 2.67124 15.2422 1.40407 17.4545 1.40407C18.8429 1.40562 20.1739 1.99783 21.1556 3.05075C22.1373 4.10367 22.6895 5.5313 22.6909 7.02035C22.6909 13.5399 13.7902 19.3809 12 20.4889Z"
                      fill="#A3A3A3"
                    />
                  </svg>
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(meme.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="26px"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                  >
                    <path d="M216 50h-42V40a22 22 0 0 0-22-22h-48a22 22 0 0 0-22 22v10H40a6 6 0 0 0 0 12h10v146a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V62h10a6 6 0 0 0 0-12M94 40a10 10 0 0 1 10-10h48a10 10 0 0 1 10 10v10H94Zm100 168a2 2 0 0 1-2 2H64a2 2 0 0 1-2-2V62h132Zm-84-104v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0m48 0v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0" />
                  </svg>
                </button>
                <button className="more" onClick={() => handleFlip(meme.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parte trasera */}
      <div
        key={`back-${meme.id}`}
        className="relative w-full hover:z-20 max-w-xs min-h-[370px] transition-all ease-in-out duration-300"
        style={{
          perspective: "1000px",
          marginTop: "0px",
          marginBottom: "20px",
        }}
      >
        <div className="w-full h-full group-hover:z-10 transition-transform duration-300">
          <div
            className="w-full h-full backface-hidden z-10 group-hover:scale-x-100 transition-transform duration-300 bg-white rounded-3xl"
            style={{
              padding: "10px",
            }}
          >
            <div className="flex flex-col justify-between h-full">
              <div className="p-4">
                <h3 className="text-xl font-bold">{meme.name}</h3>
                <p className="text-sm mt-2">{meme.description}</p>
                <p className="text-xs mt-4 text-gray-500">Date: {meme.date}</p>
                <p className="text-xs text-gray-500">Likes: {meme.likes}</p>
              </div>
              <button
                onClick={() => handleFlip(meme.id)}
                className="p-2 bg-gray-200 rounded-lg text-sm"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </ReactCardFlip>
  );
};

// Componente que maneja la cuadrícula de cartas
const CardGrid = ({ memes, handleDelete, handleFlip, flippedCards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {memes.map((meme) => (
        <Card
          key={meme.id}
          meme={meme}
          handleDelete={handleDelete}
          handleFlip={handleFlip}
          isFlipped={flippedCards.includes(meme.id)}
        />
      ))}
    </div>
  );
};

export default CardGrid;
