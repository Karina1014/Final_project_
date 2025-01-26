import productModel from "../models/dogModel.js"; // Corrected the typo
import fs from "fs"

// Add product item
const addDog = async (req, res) => {
  // Corrected string interpolation for image filename
  let image_filename = `${req.file.filename}`;

  const product = new productModel({
    nameDog: req.body.nameDog,
    breed: req.body.breed,
    age: req.body.age,
    gener: req.body.gener,
    image: image_filename,
  });

  try {
    await product.save();
    res.json({ success: true, message: "Dog Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding Dog" }); // Fixed error message
  }
}

export { addDog };
