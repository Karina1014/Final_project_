import * as vaccineModel from '../Models/vaccineModel.js';

const deleteVaccine = async (req, res) => {
    const { id_vaccine } = req.params;  

    try {
        const result = await vaccineModel.deleteVaccine(id_vaccine);  

        if (!result) {
            return res.status(404).json({ message: 'Vaccine not found' });  
        }

        return res.status(200).json({ message: 'Vaccine deleted successfully', id_vaccine: result.id_vaccine }); 
    } catch (error) {
        console.error('Error deleting vaccine:', error);
        res.status(500).json({ message: 'Error deleting vaccine' });
    }
};

export { deleteVaccine };

