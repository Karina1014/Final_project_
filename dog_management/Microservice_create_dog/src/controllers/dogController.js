import { DogModel } from '../models/dogModel.js';

class DogController {
  async addDog(req, res) {
    try {
      const { nameDog, breed, age, gener } = req.body;
      let imageBuffer = req.file ? req.file.buffer : null;

      await DogModel.create({
        nameDog,
        breed,
        age,
        gener,
        image: imageBuffer,
      });

      res.json({ success: true, message: 'Dog added successfully' });
    } catch (error) {
      console.error('Error adding Dog:', error);
      res.status(500).json({ success: false, message: 'Error adding Dog' });
    }
  }
}

const dogController = new DogController();
export { dogController };
