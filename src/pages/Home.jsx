import React, { useState, useEffect } from 'react';
import { getMemeByCategory, deleteMeme } from '../services/services';
import MemeGrid from '../components/MemeGrid';
import Modal from '../components/Modal';
import MemeForm from '../components/MemeForm'; // Importa el formulario

const categories = [
  'gatos_siendo_gatos1',
  'gatos_siendo_humanos2',
  'gatos_enfadados3',
  'me_dijiste4',
];

const categoryClasses = {
  gatos_siendo_gatos1: 'bg-gatos-siendo-gatos1',
  gatos_siendo_humanos2: 'bg-gatos-siendo-humanos2',
  gatos_enfadados3: 'bg-gatos-enfadados3',
  me_dijiste4: 'bg-me-dijiste4',
};

const categoryTitles = {
  gatos_siendo_gatos1: 'Gatos Siendo Gatos',
  gatos_siendo_humanos2: 'Gatos Siendo Humanos',
  gatos_enfadados3: 'Gatos Enfadados',
  me_dijiste4: 'Me Dijiste',
};

const Home = () => {
  const [memesByCategory, setMemesByCategory] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Estado para distinguir entre creación/edición
  const [memeToEdit, setMemeToEdit] = useState(null); // Estado para guardar el meme a editar

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
        console.error('Error fetching memes:', error);
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
      console.error('Error deleting meme:', error);
    }
  };

  const openModalForCreate = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openModalForEdit = (meme) => {
    setIsEditMode(true);
    setMemeToEdit(meme); // Guardamos el meme que se va a editar
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMemeToEdit(null); // Limpiamos el meme a editar
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
      console.error('Error refreshing memes:', error);
    }
  };

  return (
    <div className="min-h-screen w-full m-0 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">
        Lista de Memes de Gatos
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={openModalForCreate}
          className="relative inline-block text-white p-4 rounded-full bg-gradient-to-br from-purple-800 to-purple-900 shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105"
        >
          Crear Nuevo Meme
        </button>
      </div>

      {categories.map((category) => (
        <div
          key={category}
          className={`w-full py-10 ${categoryClasses[category]}`}
        >
          <h1 className="text-3xl font-bold mb-8 text-center text-white">
            {categoryTitles[category]}
          </h1>

          <MemeGrid
            memes={memesByCategory[category] || []}
            onDelete={(id) => handleDelete(category, id)}
            onEdit={(meme) => openModalForEdit(meme)} // Abrimos el modal en modo edición
          />
        </div>
      ))}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <MemeForm
            onSubmitForm={refreshMemes} // Usamos la misma función para actualizar la lista
            initialData={isEditMode ? memeToEdit : null} // Pasamos datos iniciales en modo edición
            formTitle={isEditMode ? 'Editar Meme' : 'Crear Nuevo Meme'}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Home;
