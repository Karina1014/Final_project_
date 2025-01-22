import * as vaccineModel from '../models/vaccineModel.js';

const create = async (req, res) => {
    const { name, description, dose } = req.body; 
    try {
        if (!name || !description || !dose) {
            return res.status(400).json({ message: 'All fields are required: name, description, dose' });
        }

        const newVaccine = await vaccineModel.create(name, description, dose);
        res.status(201).json(newVaccine);
    } catch (err) {
        console.error('Error creating vaccine', err);
        res.status(500).json({ message: 'Error creating vaccine' });
    }
};

export { create };