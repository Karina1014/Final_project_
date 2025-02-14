import { DogModel } from '../models/dogModel.js';

class DogController {
  async addDog(req, res) {
    try {
      const { nameDog, breed, age, gener } = req.body;
      let imageBuffer = req.file ? req.file.buffer : null;

      // Crear el nuevo perro y guardarlo en la BD
      const newDog = await DogModel.create({
        nameDog,
        breed,
        age,
        gener,
        image: imageBuffer,
      });

      // Devolver el nuevo perro en la respuesta
      res.json({
        success: true,
        message: 'Dog added successfully',
        dog: newDog, // Aquí se incluye el perro creado
      });
    } catch (error) {
      console.error('Error adding Dog:', error);
      res.status(500).json({ success: false, message: 'Error adding Dog' });
    }
  }
}

const dogController = new DogController();
export { dogController };