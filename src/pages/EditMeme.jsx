//Método EDIT

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getMemeById, updateMeme } from "../services/services"; // Servicio que obtiene y actualiza el meme
import { useNavigate, useParams } from "react-router-dom";

const UpdateMeme = () => {
  const { id } = useParams(); // Obtener el ID del meme desde la URL
  const { register, handleSubmit, reset, setValue } = useForm();
  const navigate = useNavigate();

  // Cargar el meme cuando el componente se monte
  useEffect(() => {
    const fetchMeme = async () => {
      try {
        const meme = await getMemeById(id); // Obtener el meme por su ID
        // Poblar el formulario con los valores existentes
        setValue("name", meme.name);
        setValue("description", meme.description);
        setValue("category", meme.category);
        setValue("image", meme.image);
      } catch (error) {
        console.error("Error al obtener el meme:", error);
      }
    };

    fetchMeme();
  }, [id, setValue]);

  // Enviar el formulario para actualizar el meme
  const onSubmit = async (data) => {
    try {
      await updateMeme(id, {
        ...data,
        date: new Date().toISOString().split("T")[0], // Fecha actual
      });
      reset(); // Limpiar el formulario
      navigate("/"); // Redirigir a la lista de memes después de la actualización
    } catch (error) {
      console.error("Error al actualizar el meme:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Actualizar Meme</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            {...register("name", { required: true })}
            className="border border-gray-300 p-2"
            placeholder="Nombre del meme"
          />
        </div>

        <div>
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            className="border border-gray-300 p-2"
            placeholder="Descripción del meme"
          />
        </div>

        <div>
          <label htmlFor="category">Categoría</label>
          <input
            id="category"
            {...register("category", { required: true })}
            className="border border-gray-300 p-2"
            placeholder="Categoría del meme"
          />
        </div>

        <div>
          <label htmlFor="image">URL de la Imagen</label>
          <input
            id="image"
            {...register("image", { required: true })}
            className="border border-gray-300 p-2"
            placeholder="URL de la imagen"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2">
          Actualizar Meme
        </button>
      </form>
    </div>
  );
};

export default UpdateMeme;
