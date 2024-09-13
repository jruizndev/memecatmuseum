import React, { useState, useEffect } from "react";
import {
  getMemes,
  deleteMeme,
  createMeme as createMemeService,
} from "../services/services";
import CreateMeme from "./CreateMeme";
import Modal from "../components/Modal";

const Home = () => {
  const [memes, setMemes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch memes initially
    const fetchMemes = async () => {
      try {
        const data = await getMemes();
        setMemes(data);
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    };

    fetchMemes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMeme(id);
      setMemes(memes.filter((meme) => meme.id !== id));
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

  // Function to fetch memes and update state
  const refreshMemes = async () => {
    try {
      const data = await getMemes();
      setMemes(data);
    } catch (error) {
      console.error("Error refreshing memes:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Lista de Memes de Gatos
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={openModal}
          className="relative inline-block text-white p-4 rounded-full bg-gradient-to-br from-purple-800 to-purple-900 shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 animate-spin-slow"
        >
          Crear Nuevo Meme
        </button>
      </div>

      <ul>
        {memes.map((meme) => (
          <li key={meme.id} className="bg-red-300">
            <h2>{meme.name}</h2>
            <img src={meme.image} alt={meme.description} />
            <p>{meme.description}</p>
            <p>Categoría: {meme.category}</p>
            <p>Fecha: {meme.date}</p>
            <p>Likes: {meme.likes}</p>
            <button
              onClick={() => handleDelete(meme.id)}
              className="bg-red-500 text-white p-2 ml-2"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <CreateMeme onClose={closeModal} onMemeCreated={refreshMemes} />
        </Modal>
      )}
    </div>
  );
};

export default Home;
