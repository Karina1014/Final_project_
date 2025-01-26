import dogModel from "../models/dogModel.js";

// Obtener todos los perros
const listProduct = async (req, res) => {
  try {
    const dogs = await dogModel.find({}); // Obtener todos los perros
    res.json({ success: true, dogs }); // Cambié 'data' por 'dogs' para consistencia con tu frontend
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "ERROR" }); // Corrección de 'falase' a 'false'
  }
};

export { listProduct };
