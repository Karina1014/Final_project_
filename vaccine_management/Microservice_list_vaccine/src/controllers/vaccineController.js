import * as vaccineModel from '../models/vaccineModel.js';

const getVaccines = async (req, res) => {
    try {
        const vaccines = await vaccineModel.getVaccines();
        res.status(200).json(vaccines);
    }catch (err) {
        console.error('Error getting vaccines', err);
        res.status(500).json({message: 'Error getting vaccines'});
    }
};

export { getVaccines };