import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getMemeById, updateMeme } from "../services/services";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Importar axios para subir a Cloudinary

const EditMeme = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset, setValue } = useForm();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(""); // Vista previa local de la imagen
  const [uploading, setUploading] = useState(false); // Estado para indicar si se está subiendo la imagen
  const [imageUrl, setImageUrl] = useState(""); // URL de Cloudinary de la imagen subida

  // Cargar el meme por su ID cuando el componente se monta
  useEffect(() => {
    const fetchMeme = async () => {
      try {
        const meme = await getMemeById(id);
        setValue("name", meme.name);
        setValue("description", meme.description);
        setValue("category", meme.category);
        setImageUrl(meme.image); // Usamos la URL existente de la imagen
        setImagePreview(meme.image); // Mostramos la imagen actual como vista previa
      } catch (error) {
        console.error("Error al obtener el meme:", error);
      }
    };

    fetchMeme();
  }, [id, setValue]);

  // Función para subir imagen a Cloudinary
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
      setImageUrl(response.data.secure_url); // Guardamos la URL de Cloudinary
      setUploading(false);
    } catch (error) {
      console.error("Error subiendo imagen a Cloudinary", error);
      setUploading(false);
    }
  };

  // Manejar cambio de archivo (subir a Cloudinary y generar vista previa)
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Vista previa local
      await uploadImageToCloudinary(file); // Subimos a Cloudinary
    }
  };

  // Enviar formulario para actualizar meme
  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        image: imageUrl || imagePreview, // Usamos la nueva URL de Cloudinary o la existente
        date: new Date().toISOString().split("T")[0],
      };
      await updateMeme(id, updatedData);
      reset();
      navigate("/");
    } catch (error) {
      console.error("Error al actualizar el meme:", error);
    }
  };

  return (
    <div className="rounded-lg relative inline-block text-gray p-4 bg-gradient-to-br from-purple-600 to-yellow-400 shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 cat-button">
      <h1 className="text-3xl font-bold">Editar Meme</h1>
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
          <select
            id="category"
            {...register("category", { required: true })}
            className="border border-gray-300 p-2 mx-8"
          >
            <option value="Gatos siendo gatos">Gatos siendo gatos </option>
            <option value="Gatos siendo humanos">Gatos siendo humanos</option>
            <option value="Gatos enfadados">Gatos enfadados </option>
            <option value="Me Dijiste">Me dijiste</option>
          </select>
        </div>

        <div>
          <label htmlFor="image">Imagen del Meme</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 p-2"
          />
          {uploading && <p>Subiendo imagen...</p>}
          {imagePreview && (
            <img src={imagePreview} alt="Vista previa" className="mt-4 w-32 h-32" />
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-purple-500 text-white p-2 rounded-lg"
          >
            Actualizar Meme
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-red-500 text-white p-2 rounded-lg"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMeme;
