import React, { useState, useEffect } from 'react';
import {
  getMemeByCategory,
  deleteMeme,
  createMeme,
  updateMeme,
} from '../services/services';
import MemeGrid from '../components/MemeGrid';
import Modal from '../components/Modal';
import MemeForm from '../components/MemeForm';
import MessageModal from '../components/MessageModal';

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [memeToEdit, setMemeToEdit] = useState(null);

  const [message, setMessage] = useState('');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageType, setMessageType] = useState('success');
  const [isConfirmDialog, setIsConfirmDialog] = useState(false);
  const [memeToDelete, setMemeToDelete] = useState(null);

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

  const handleDelete = (category, id) => {
    setIsConfirmDialog(true);
    setIsMessageModalOpen(true);
    setMessage('Si confirmas te cargas el meme');
    setMessageType('success');
    setMemeToDelete({ category, id });
  };

  const confirmDelete = async () => {
    try {
      await deleteMeme(memeToDelete.id);
      setMemesByCategory((prev) => ({
        ...prev,
        [memeToDelete.category]: prev[memeToDelete.category].filter(
          (meme) => meme.id !== memeToDelete.id
        ),
      }));
      setMessage('Meme eliminado con éxito.');
      setMessageType('success');
    } catch (error) {
      setMessage('Error al cargarte el meme.');
      setMessageType('error');
    }
    setIsConfirmDialog(false);
    setIsMessageModalOpen(true);
    setMemeToDelete(null);
  };

  const openModalForCreate = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openModalForEdit = (meme) => {
    setIsEditMode(true);
    setMemeToEdit(meme);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMemeToEdit(null);
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

  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
    setIsConfirmDialog(false);
  };

  const handleFormSubmit = async (data, actionType) => {
    try {
      if (actionType === 'create') {
        await createMeme(data);
      } else {
        await updateMeme(memeToEdit.id, data);
      }
      setMessage(
        actionType === 'create'
          ? 'Meme creado con éxito.'
          : 'Meme actualizado con éxito.'
      );
      setMessageType('success');
      await refreshMemes(); // Actualiza los memes después de la acción
    } catch (error) {
      setMessage(
        actionType === 'create'
          ? 'Error al crear el meme.'
          : 'Error al editar el meme.'
      );
      setMessageType('error');
    }
    setIsMessageModalOpen(true);
    setIsModalOpen(false); // Cierra el modal después de la acción
  };

  return (
    <div className='min-h-screen w-full m-0 bg-gray-100'>
      <div>
        <button
          onClick={openModalForCreate}
          className='fixed right-4 sm:right-10 md:right-20 bottom-[500px] transform text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full bg-black hover:shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105 animate-spin-slow z-50 min-w-[150px] sm:min-w-[200px] md:min-w-[250px]'
        >
          Crear Nuevo Meme
        </button>
      </div>
      {categories.map((category) => (
        <div
          key={category}
          className={`w-full py-10 ${categoryClasses[category]}`}
        >
          <h1 className='text-3xl font-bold mb-8 text-center text-white'>
            {categoryTitles[category]}
          </h1>
          <MemeGrid
            memes={memesByCategory[category] || []}
            onDelete={(id) => handleDelete(category, id)}
            onEdit={(meme) => openModalForEdit(meme)}
          />
        </div>
      ))}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <MemeForm
            onSubmit={(data) =>
              handleFormSubmit(data, isEditMode ? 'edit' : 'create')
            }
            initialData={isEditMode ? memeToEdit : null}
            submitButtonText={isEditMode ? 'Actualizar Meme' : 'Crear Meme'}
            onClose={closeModal}
          />
        </Modal>
      )}
      {isMessageModalOpen && (
        <MessageModal
          message={message}
          type={messageType}
          onClose={closeMessageModal}
          onConfirm={isConfirmDialog ? confirmDelete : null}
          isConfirmDialog={isConfirmDialog}
        />
      )}
    </div>
  );
};

export default Home;
