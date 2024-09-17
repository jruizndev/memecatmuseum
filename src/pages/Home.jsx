import React, { useState, useEffect, useContext } from "react";
import { getMemes, deleteMeme, getMemeByCategory } from "../services/services";
import MemeGrid from "../components/MemeGrid";
import Modal from "../components/Modal";
import CreateMeme from "../pages/CreateMeme";
import FilterContext from "../layout/FilterContext";
import Hero from "../components/Hero";


const categories = [
  "gatos_siendo_gatos1",
  "gatos_siendo_humanos2",
  "gatos_enfadados3",
  "me_dijiste4",
];

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
  const {
    selectedCategory,
    selectedPopularity,
    selectedDate,
    handleSelectChange,
  } = useContext(FilterContext);

  const [memesByCategory, setMemesByCategory] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredMemes, setFilteredMemes] = useState([]);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const allMemes = await getMemes();

        // Agrupamos y ordenamos los memes por categoría y popularidad
        const memesByCategory = allMemes.reduce((acc, meme) => {
          if (!acc[meme.category]) {
            acc[meme.category] = [];
          }
          acc[meme.category].push(meme);
          return acc;
        }, {});

        // Ordenamos los memes dentro de cada categoría por popularidad (de mayor a menor)
        for (const category in memesByCategory) {
          memesByCategory[category].sort((a, b) => b.likes - a.likes);
        }

        setMemesByCategory(memesByCategory);
        setFilteredMemes(allMemes); // Inicialmente mostramos todos los memes
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    };

    fetchMemes();
  }, []);

  // Función para filtrar y ordenar los memes
  const filterAndSortMemes = (
    allMemes,
    selectedCategory,
    selectedPopularity,
    selectedDate
  ) => {
    let filteredMemes = [...allMemes]; // Copia de todos los memes

    // Filtramos por categoría si es diferente de "Todas"
    if (selectedCategory !== "Todas") {
      filteredMemes = filteredMemes.filter(
        (meme) => meme.category === selectedCategory
      );
    }

    // Agrupamos los memes por categoría
    const memesByCategory = filteredMemes.reduce((acc, meme) => {
      if (!acc[meme.category]) {
        acc[meme.category] = [];
      }
      acc[meme.category].push(meme);
      return acc;
    }, {});

    // Ordenamos los memes dentro de cada categoría según los filtros
    for (const category in memesByCategory) {
      if (selectedPopularity === "Más populares") {
        memesByCategory[category].sort((a, b) => b.likes - a.likes);
      } else if (selectedPopularity === "Menos populares") {
        memesByCategory[category].sort((a, b) => a.likes - b.likes);
      }

      if (selectedDate === "Más recientes") {
        memesByCategory[category].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      } else if (selectedDate === "Más viejunos") {
        memesByCategory[category].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      }
    }

    // Volvemos a aplanar el objeto para obtener un array de memes filtrados y ordenados
    return Object.values(memesByCategory).flat();
  };

  // Aplicamos filtros cada vez que cambiamos
  useEffect(() => {
    // Otenem memes combinados
    const allMemes = Object.values(memesByCategory).flat();

    // Llamamos a la función de filtrado y ordenamiento
    const filtered = filterAndSortMemes(
      allMemes,
      selectedCategory,
      selectedPopularity,
      selectedDate
    );

    setFilteredMemes(filtered);
  }, [selectedCategory, selectedPopularity, selectedDate, memesByCategory]);

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

  const refreshMemes = async () => {
    try {
      const memesPromises = categories.map((category) =>
        getMemeByCategory(category)
      );
      const memesResults = await Promise.all(memesPromises);
      const newMemesByCategory = categories.reduce((acc, category, index) => {
        acc[category] = memesResults[index];
        return acc;
      }, {});

      // Actualizamos el estado memesByCategory
      setMemesByCategory(newMemesByCategory);
    } catch (error) {
      console.error("Error refreshing memes:", error);
    }
  };

  return (
    <div className="min-h-screen w-full m-0">
      <Hero />
      <div>
        <button
          onClick={openModal}
          className="fixed right-4 sm:right-10 md:right-20 bottom-[50px] transform text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full bg-transparent border border-black border-solid hover:shadow-md transition-transform duration-300 ease-in-out hover:scale-105 animate-spin-slow z-10 min-w-[150px] sm:min-w-[200px] md:min-w-[250px]"
        >
          CREAR NUEVO MEME
        </button>
      </div>

      {categories.map((category) => {
        // Filtramos los memes para esta categoría
        const memesForCategory = filteredMemes.filter(
          (meme) => meme.category === category
        );

        // Clase para controlar la visibilidad del bloque
        const categoryBlockClass =
          selectedCategory === "Todas" || selectedCategory === category
            ? "block"
            : "hidden";

        return (
          <div
            key={category}
            className={`w-full py-10 ${categoryClasses[category]} ${categoryBlockClass}`} // Aplicamos la clase de visibilidad
          >
            {/* Renderizamos el título solo si la categoría está seleccionada o si se seleccionó "Todas" */}
            {(selectedCategory === "Todas" ||
              selectedCategory === category) && (
              <h1 className="text-3xl font-bold mb-8 text-center text-white"></h1>
            )}

            {/* Pasamos los memes filtrados para esta categoría a MemeGrid */}
            <MemeGrid
              memes={memesForCategory}
              onDelete={(id) => handleDelete(category, id)}
            />
          </div>
        );
      })}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <CreateMeme onClose={closeModal} onMemeCreated={refreshMemes} />
        </Modal>
      )}
    </div>
  );
};

export default Home;
