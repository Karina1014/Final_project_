import { DogModel } from '../models/dogModel.js';

class DogController {
  async updateDog(req, res) {
    try {
      const { id } = req.params;
      const { nameDog, breed, age, gener } = req.body;
      let imageBuffer = req.file ? req.file.buffer : null;

      const dog = await DogModel.findByPk(id);
      if (!dog) {
        return res.status(404).json({ success: false, message: 'Dog not found' });
      }

      await dog.update({
        nameDog,
        breed,
        age,
        gener,
        image: imageBuffer || dog.image,
      });

      res.json({ success: true, message: 'Dog updated successfully', dog });
    } catch (error) {
      console.error('Error updating dog:', error);
      res.status(500).json({ success: false, message: 'Error updating dog' });
    }
  }
}
const dogController = new DogController();
export { dogController };
