import * as vaccineModel from '../models/vaccineModel.js';

const updateVaccine = async (req, res) => {
  try {
    const { name, description, dose } = req.body;

    if (!name || !description || !dose) {
      return res.status(400).json({ message: 'All fields are required: id, name, description, dose' });
    }

    const updatedVaccine = await vaccineModel.updateVaccine(id, name, description, dose);
    res.status(200).json(updatedVaccine);
  } catch (err) {
    console.error('Error updating vaccine', err);
    res.status(500).json({ message: 'Error updating vaccine' });
  }
};

export { updateVaccine };
