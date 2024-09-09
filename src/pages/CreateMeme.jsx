import React from "react";
import { useForm } from "react-hook-form";
import { createMeme } from "../services/services"; // Importar la función para crear el meme
import { useNavigate } from "react-router-dom";

const CreateMeme = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await createMeme({
        ...data,
        date: new Date().toISOString().split("T")[0], // Fecha actual
      });
      reset(); // Limpiar el formulario
      navigate("/"); // Redirigir a la lista de memes después de la creación
    } catch (error) {
      console.error("Error al crear el meme:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Crear Nuevo Meme</h1>
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
          Crear Meme
        </button>
      </form>
    </div>
  );
};

export default CreateMeme;
