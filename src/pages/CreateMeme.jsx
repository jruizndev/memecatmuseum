import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createMeme } from "../services/services";
import axios from "axios";

const CreateMeme = ({ onClose, onMemeCreated }) => {
  const { register, handleSubmit, reset } = useForm();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

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
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
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

  const onSubmit = async (dataMeme) => {
    if (imageUrl) {
      const memeData = { ...dataMeme, image: imageUrl };
      await createMeme(memeData);
      reset();
      onMemeCreated(); // Llama a la función de actualización
      onClose();
    } else {
      alert("Por favor, sube una imagen antes de crear el meme");
    }
  };

  return (
    <div className="rounded-lg relative inline-block text-gray p-4 bg-gray-100 shadow-lg w-[600px] mx-auto transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-200 hover:shadow-2xl">
      {/* Título  */}
      <h1 className="font-inter font-semibold text-lg text-left mb-4 text-gray-800">
        Crear Nuevo Meme
      </h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center mb-2">
          <label
            htmlFor="name"
            className="font-inter text-sm mr-2 flex-shrink-0 w-28 text-gray-800"
          >
            Nombre:
          </label>
          <input
            id="name"
            {...register("name", { required: true })}
            className="border border-gray-300 p-1 text-sm flex-1"
            placeholder="Nombre del meme"
          />
        </div>

        <div className="flex items-center mb-2">
          <label
            htmlFor="description"
            className="font-inter text-sm mr-2 flex-shrink-0 w-28 text-gray-800"
          >
            Descripción:
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            className="border border-gray-300 p-1 text-sm flex-1 text-gray-500"
            placeholder="Descripción del meme"
            maxLength={100} //máximo de caracteres
          />
        </div>

        <div className="flex items-center mb-2">
          <label
            htmlFor="category"
            className="font-inter text-sm mr-2 flex-shrink-0 w-28 text-gray-800"
          >
            Categoría:
          </label>
          <select
            id="category"
            {...register("category", { required: true })}
            className="border border-gray-300 p-1 text-sm flex-1 text-gray-500"
          >
            <option value="Gatos siendo gatos">Gatos siendo gatos</option>
            <option value="Gatos siendo humanos">Gatos siendo humanos</option>
            <option value="Gatos enfadados">Gatos enfadados</option>
            <option value="Me Dijiste">Me dijiste</option>
          </select>
        </div>

        <div className="flex items-center mb-2">
          <label
            htmlFor="image"
            className="font-inter text-sm mr-2 flex-shrink-0 w-28 text-gray-800"
          >
            Imágen:
          </label>
          <input
            id="image"
            type="file"
            accept="image/*" //sólo acepta archivo de imagenes
            onChange={handleFileChange}
            className="border border-gray-300 p-1 text-sm flex-1 text-gray-500"
          />
          {uploading && <p className="ml-4 text-xs">Subiendo imagen...</p>}
          {imageUrl && (
            <img src={imageUrl} alt="Uploaded" className="mt-2 w-16 h-16" />
          )}
        </div>

        <div className="flex justify-center mt-4 space-x-20">
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 text-sm rounded-[20px] transition-all duration-300 ease-in-out hover:bg-green-200"
          >
            Crear Meme
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 text-sm rounded-[20px] transition-all duration-300 ease-in-out hover:bg-red-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMeme;
