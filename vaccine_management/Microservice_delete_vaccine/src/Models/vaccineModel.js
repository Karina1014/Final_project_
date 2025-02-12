import { connectDB } from '../config/postgredb.js';  

const deleteVaccine = async (id) => {
    try {
        if (!id_vaccine || isNaN(id)) {
            throw new Error('Invalid ID provided');
        }
        const result = await connectDB.query(
            'DELETE FROM vaccine WHERE id_vaccine = $1 RETURNING *',
            [id_vaccine] 
        );
        if (result.rows.length === 0) {
            return null; 
        }

        return result.rows[0]; 
    } catch (error) {
        throw new Error(`Error deleting vaccine: ${error.message}`);
    }
};

export { deleteVaccine };


