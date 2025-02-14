import * as vaccineModel from '../models/dogModel.js';

const dogController = async (req, res) => {
  try {
    const { id } = req.params;  // Tomar el id de la URL
    const { name, description, dose } = req.body; // Los demás datos del cuerpo

    if (!id || isNaN(id) || !name || !description || !dose) {
      return res.status(400).json({ message: 'All fields are required: id (in URL), name, description, dose' });
    }

    const updatedVaccine = await vaccineModel.updateVaccine(id, name, description, dose);
    
    if (!updatedVaccine) {
      return res.status(404).json({ message: 'Vaccine not found' });
    }

    res.status(200).json({ message: 'Vaccine updated successfully', vaccine: updatedVaccine });
  } catch (err) {
    console.error('Error updating vaccine', err);
    res.status(500).json({ message: 'Error updating vaccine' });
  }
};

export { dogController };