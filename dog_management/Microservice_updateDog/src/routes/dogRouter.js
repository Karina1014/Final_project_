import express from "express";
import multer from "multer"; // Importar multer
import { updateDog } from "../controllers/dogController.js"; // Asegúrate de que el nombre y la ruta sean correctos

const dogRouter = express.Router();

// Configuración de almacenamiento para imágenes
const storage = multer.diskStorage({
  destination: "uploads", // Carpeta donde se guardarán las imágenes
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`); // Nombre único basado en la fecha y el nombre original
  },
});

// Inicialización de multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

// Ruta para actualizar un perro
dogRouter.put("/update/:id", upload.single("image"), updateDog);

export default dogRouter;

