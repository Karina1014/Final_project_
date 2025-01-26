import dogModel from "../models/dogModel.js"; // Importa correctamente el modelo

// Actualizar un perro por ID
const updateDog = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del perro desde los parámetros
  const updates = req.body; // Obtiene las actualizaciones desde el cuerpo de la solicitud

  try {
    // Busca y actualiza el perro por su ID
    const updatedDog = await dogModel.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true } // Retorna el documento actualizado y valida los datos
    );

    if (!updatedDog) {
      return res.status(404).json({ message: "Dog not found" });
    }

    res.status(200).json({
      message: "Dog updated successfully",
      dog: updatedDog, // Retorna el perro actualizado
    });
  } catch (err) {
    console.error("Error updating dog:", err);
    res.status(500).json({
      error: "An error occurred while updating the dog.",
      details: err.message, // Detalles del error
    });
  }
};

export { updateDog }; // Exporta la función correctamente
