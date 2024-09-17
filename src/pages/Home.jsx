import React, { useState, useEffect, useRef } from "react";
import { getMemeByCategory, deleteMeme } from "../services/services";
import MemeGrid from "../components/MemeGrid";
import Modal from "../components/Modal";
import CreateMeme from "../pages/CreateMeme";
import TitleSection from "../components/Titles";

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
  const [memesByCategory, setMemesByCategory] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const sectionRefs = useRef([]);

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

  // Intersection Observer to detect which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.getAttribute("data-category"));
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="min-h-screen w-full m-0 bg-gray-100">
      <div className="flex justify-center mb-6">
        <button
          onClick={openModal}
          className="relative inline-block text-white p-4 rounded-full bg-gradient-to-br from-purple-800 to-purple-900 shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 animate-spin-slow"
        >
          Crear Nuevo Meme
        </button>
      </div>

      {categories.map((category, index) => (
        <div
          key={category}
          data-category={category}
          ref={(el) => (sectionRefs.current[index] = el)}
          className={`w-full py-10 ${categoryClasses[category]}`} // Background gradient applied here
        >
          <TitleSection title={categoryTitles[category]} />
          <MemeGrid
            memes={memesByCategory[category] || []}
            onDelete={(id) => handleDelete(category, id)}
          />
          {isModalOpen && (
            <Modal onClose={closeModal}>
              <CreateMeme onClose={closeModal} onMemeCreated={refreshMemes} />
            </Modal>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
