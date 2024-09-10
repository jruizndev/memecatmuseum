import React, { useState, useEffect } from "react";
import { getMemes, deleteMeme } from "../services/services";
import CreateMeme from "./CreateMeme"; // Importamos el componente CreateMeme
import Modal from "../components/Modal"; // Importamos el componente Modal

const Home = () => {
  const [memes, setMemes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    // Realizar la petición GET usando el servicio `getMemes`
    const fetchMemes = async () => {
      try {
        const data = await getMemes();
        setMemes(data); // Guardar la respuesta en el estado
      } catch (error) {
        console.error("Error fetching memes:", error); // Manejo de errores
      }
    };

    fetchMemes();
  }, []);

  // Función para eliminar un meme
  const handleDelete = async (id) => {
    try {
      await deleteMeme(id); // Llamar al servicio para eliminar el meme
      setMemes(memes.filter((meme) => meme.id !== id)); // Actualizar el estado eliminando el meme
    } catch (error) {
      console.error("Error deleting meme:", error); // Manejo de errores
    }
  };

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Lista de Memes de Gatos</h1>

      {/* Botón que abre el modal */}
      <button
        onClick={openModal}
        className="relative inline-block text-white p-4 rounded-full bg-gradient-to-br from-purple-800 to-purple-900 shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 cat-button"
      >
        Crear Nuevo Meme
      </button>

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

      {/* Modal que contiene el formulario CreateMeme */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <CreateMeme onClose={closeModal} />{" "}
          {/* Pasamos la función de cierre */}
        </Modal>
      )}
    </div>
  );
};

export default Home;
