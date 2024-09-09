require("dotenv").config();
const express = require("express");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const fs = require("fs");

const app = express();

app.use(fileUpload({ useTempFiles: true }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/upload", async (req, res) => {
  try {
    const file = req.files.file;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "memes",
    });
    // Guardar la URL en db.json o en cualquier base de datos
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: "Error al subir la imagen" });
  }
});

// Otras rutas y configuración...
