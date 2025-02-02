import { DogModel } from '../models/dogModel.js';

class DogController {
  async getAllDogs(req, res) {
    try {
      const dogs = await DogModel.findAll();
      res.json({ success: true, dogs });
    } catch (error) {
      console.error('Error fetching dogs:', error);
      res.status(500).json({ success: false, message: 'Error fetching dogs' });
    }
  }
}
const dogController = new DogController();
export { dogController };
