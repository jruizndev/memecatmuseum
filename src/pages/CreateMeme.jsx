import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createMeme } from "../services/services"; // importa el POST
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateMeme = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Función para subir imagen a Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    ); // valores .env

    setUploading(true);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`, // Usa el cloud name desde .env
        formData
      );
      setImageUrl(response.data.secure_url); // Almacena la URL segura de la imagen
      setUploading(false);
    } catch (error) {
      console.error("Error subiendo imagen a Cloudinary", error);
      setUploading(false);
    }
  };

  // Función para manejar la carga del archivo
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadImageToCloudinary(file);
    }
  };

  const onSubmit = async (dataMeme) => {
    if (imageUrl) {
      const memeData = {
        ...dataMeme,
        image: imageUrl, // Añade la URL a Cloudinary
      };
      await createMeme(memeData);
      reset(); // Resetea el formulario después de enviar
      navigate("/"); // Navega a la página principal
    } else {
      alert("Por favor, sube una imagen antes de crear el meme");
    }
  };

  return (
    <div className="rounded-lg relative inline-block text-gray p-4  bg-gradient-to-br from-purple-600 to-yellow-400 shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 cat-button">
      <h1 className="text-3xl font-bold ">Crear Nuevo Meme</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-7">
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            {...register("name", { required: true })}
            className="border border-gray-300 p-2 mx-11"
            placeholder="Nombre del meme"
          />
        </div>

        <div>
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            className="border border-gray-300 p-2 mx-5"
            placeholder="Descripción del meme"
          />
        </div>

        <div>
          <label htmlFor="category">Categoría</label>
          <input
            id="category"
            {...register("category", { required: true })}
            className="border border-gray-300 p-2 mx-8"
            placeholder="Categoría del meme"
          />
        </div>

        {/* Reemplazar el campo de URL de la imagen con el campo para subir el archivo */}
        <div>
          <label htmlFor="image">Imagen del Meme</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 p-2"
          />
          {uploading && <p>Subiendo imagen...</p>}
          {imageUrl && (
            <img src={imageUrl} alt="Uploaded" className="mt-4 w-32 h-32" />
          )}
        </div>

        <button
          type="submit"
          className="bg-purple-500 text-white p-2 rounded-lg"
        >
          Crear Meme
        </button>
      </form>
    </div>
  );
};

export default CreateMeme;
