import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getMemeById, updateMeme } from "../services/services";
import { useNavigate, useParams } from "react-router-dom";

const EditMeme = () => {
  const { id } = useParams(); // Obtenemos el ID del meme desde la URL con useParams
  const { register, handleSubmit, reset, setValue } = useForm();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(""); // Utilizamos useState para previsualizar la imagen

  // Cargamos el meme cuando el componente se monte
  useEffect(() => {
    const fetchMeme = async () => {
      try {
        const meme = await getMemeById(id); // Obtenemos el meme por su ID
        // Pintamos el formulario con los valores existentes
        setValue("name", meme.name);
        setValue("description", meme.description);
        setValue("category", meme.category);
        setImagePreview(meme.image); // Previsualizamos la imagen actual
      } catch (error) {
        console.error("Error al obtener el meme:", error);
      }
    };

    fetchMeme();
  }, [id, setValue]);

  // Manipulamos la selección de la imagen y generamos la vista previa
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Enviamos el formulario para actualizar el meme
  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        image: imagePreview, // Usamos la imagen cargada o la URL previa
        date: new Date().toISOString().split("T")[0], // Obtenemos la fecha actual
      };
      await updateMeme(id, updatedData); // Actualizamos el meme
      reset(); // Limpiamos el formulario
      navigate("/"); // Redirigimos a la lista de memes (home) después de la actualización
    } catch (error) {
      console.error("Error al actualizar el meme:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Editar Meme</h1>
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
          <label htmlFor="image">Imagen</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Aquí manejamos la selección de la imagen
            className="border border-gray-300 p-2"
          />
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Vista previa" className="max-w-xs" />
            </div>
          )}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2">
          Actualizar Meme
        </button>
      </form>
    </div>
  );
};

export default EditMeme;
