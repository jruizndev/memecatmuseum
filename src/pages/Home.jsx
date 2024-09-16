import React, { useState, useEffect } from "react";
import { getMemeByCategory, deleteMeme } from "../services/services";
import MemeGrid from "../components/MemeGrid";
import Modal from "../components/Modal"; // Asegúrate de tener el componente Modal
import CreateMeme from "../pages/CreateMeme"; // Asegúrate de tener el componente CreateMeme

const categories = [
  "gatos_siendo_gatos1",
  "gatos_siendo_humanos2",
  "gatos_enfadados3",
  "me_dijiste4",
];

// Manteniendo los fondos degradados que ya tenías definidos
const categoryClasses = {
  gatos_siendo_gatos1: "bg-gatos-siendo-gatos1",
  gatos_siendo_humanos2: "bg-gatos-siendo-humanos2",
  gatos_enfadados3: "bg-gatos-enfadados3",
  me_dijiste4: "bg-me-dijiste4",
};

const categoryTitles = {
  gatos_siendo_gatos1: "Gatos Siendo Gatos",
  gatos_siendo_humanos2: "Gatos Siendo Humanos",
  gatos_enfadados3: "Gatos Enfadados",
  me_dijiste4: "Me Dijiste",
};

const Home = () => {
  const [memesByCategory, setMemesByCategory] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const memesPromises = categories.map((category) =>
          getMemeByCategory(category)
        );
        const memesResults = await Promise.all(memesPromises);
        const memesByCategory = categories.reduce((acc, category, index) => {
          acc[category] = memesResults[index];
          return acc;
        }, {});
        setMemesByCategory(memesByCategory);
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    };

    fetchMemes();
  }, []);

  const handleDelete = async (category, id) => {
    try {
      await deleteMeme(id);
      setMemesByCategory((prev) => ({
        ...prev,
        [category]: prev[category].filter((meme) => meme.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting meme:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to fetch memes and update state after creating a new meme
  const refreshMemes = async () => {
    try {
      const memesPromises = categories.map((category) =>
        getMemeByCategory(category)
      );
      const memesResults = await Promise.all(memesPromises);
      const memesByCategory = categories.reduce((acc, category, index) => {
        acc[category] = memesResults[index];
        return acc;
      }, {});
      setMemesByCategory(memesByCategory);
    } catch (error) {
      console.error("Error refreshing memes:", error);
    }
  };

  return (
    <div className="min-h-screen w-full m-0 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">
        Lista de Memes de Gatos
      </h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={openModal}
          className="fixed right-4 sm:right-10 md:right-20 bottom-1/4 transform -translate-y-1/2 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full bg-black hover:shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105 animate-spin-slow z-50 min-w-[150px] sm:min-w-[200px] md:min-w-[250px]"
        >
          Subir Meme
        </button>
      </div>

      {categories.map((category) => (
        <div
          key={category}
          className={`w-full py-10 ${categoryClasses[category]}`}
        >
          <h1 className="text-3xl font-bold mb-8 text-center text-white">
            {categoryTitles[category]}
            {isModalOpen && (
              <Modal onClose={closeModal}>
                <CreateMeme onClose={closeModal} onMemeCreated={refreshMemes} />
              </Modal>
            )}
          </h1>
          <MemeGrid
            memes={memesByCategory[category] || []}
            onDelete={(id) => handleDelete(category, id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
