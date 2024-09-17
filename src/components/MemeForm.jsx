/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import MessageModal from "./MessageModal"; // Asegúrate de que la ruta sea correcta

const MemeForm = ({ onSubmit, initialData, onClose, submitButtonText }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [imageUrl, setImageUrl] = useState(initialData?.image || "");
  const [uploading, setUploading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("description", initialData.description);
      setValue("category", initialData.category);
      setImageUrl(initialData.image);
    }
  }, [initialData, setValue]);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    setUploading(true);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      setImageUrl(response.data.secure_url);
      setUploading(false);
    } catch (error) {
      console.error("Error subiendo imagen a Cloudinary", error);
      setUploading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadImageToCloudinary(file);
    }
  };

  const onSubmitHandler = async (data) => {
    if (imageUrl) {
      const memeData = { ...data, image: imageUrl };
      try {
        await onSubmit(memeData);
        reset();
        if (typeof onClose === 'function') {
          onClose();
        }
      } catch (error) {
        console.error('Error al enviar los datos del meme:', error);
      }
    } else {
      setModalMessage("Por favor, sube una imagen antes de continuar");
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="rounded-lg relative inline-block text-gray p-4 bg-gray-100 shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 cat-button">
      <h1 className="font-inter font-bold text-2xl tracking-3px text-center mb-6">
        {submitButtonText === 'Actualizar Meme' ? 'Editar Meme' : 'Crear Meme'}
      </h1>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-5">
        <div className="flex items-center mb-4">
          <label htmlFor="name" className="font-inter text-base mr-4 flex-shrink-0 w-32">
            Nombre:
          </label>
          <input
            id="name"
            {...register("name", { required: true })}
            className="border border-gray-300 p-2 flex-1"
            placeholder="Nombre del meme"
          />
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="description" className="font-inter text-base mr-4 flex-shrink-0 w-32">
            Descripción:
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            className="border border-gray-300 p-2 flex-1"
            placeholder="Descripción del meme"
          />
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="category" className="font-inter text-base mr-4 flex-shrink-0 w-32">
            Categoría:
          </label>
          <select
            id="category"
            {...register("category", { required: true })}
            className="border border-gray-300 p-2 flex-1"
          >
            <option value="gatos_siendo_gatos1">Gatos siendo gatos</option>
            <option value="gatos_siendo_humanos2">Gatos siendo humanos</option>
            <option value="gatos_enfadados3">Gatos enfadados</option>
            <option value="me_dijiste4">Me dijiste</option>
          </select>
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="image" className="font-inter text-base mr-4 flex-shrink-0 w-32">
            Imágen:
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-blue-300 p-2 flex-1"
          />
          {uploading && <p className="ml-4">Subiendo imagen...</p>}
          {imageUrl && (
            <img src={imageUrl} alt="Uploaded" className="mt-4 w-32 h-32" />
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-black text-white py-3 px-8 rounded-3xl transition-all duration-300 ease-in-out hover:bg-pink-300"
          >
            {submitButtonText}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white py-3 px-8 rounded-3xl transition-all duration-300 ease-in-out hover:bg-pink-200"
          >
            Cancelar
          </button>
        </div>
      </form>
      {isModalVisible && (
        <MessageModal
          message={modalMessage}
          type="success"
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default MemeForm;
