import * as vaccineModel from '../models/vaccineModel.js';

const createVaccines = async (req, res) => {
    try {
        const { Name, Description, Dose } = req.body; 

        if (!Name || !Description || !Dose) {
            return res.status(400).json({ message: 'All fields are required: name, description, dose' });
        }

        const newVaccine = await vaccineModel.createVaccines(Name, Description, Dose);
        res.status(201).json(newVaccine);
    } catch (err) {
        console.error('Error creating vaccine', err);
        res.status(500).json({ message: 'Error creating vaccine' });
    }
};

export { createVaccines };