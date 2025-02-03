import { DogModel } from '../models/dogModel.js';

class DogController {
  async deleteDog(req, res) {
    try {
      const { id } = req.params;
      const dog = await DogModel.findByPk(id);
      if (!dog) {
        return res.status(404).json({ success: false, message: 'Dog not found' });
      }

      await dog.destroy();
      res.json({ success: true, message: 'Dog deleted successfully' });
    } catch (error) {
      console.error('Error deleting dog:', error);
      res.status(500).json({ success: false, message: 'Error deleting dog' });
    }
  }
}

const dogController = new DogController();
export { dogController };
