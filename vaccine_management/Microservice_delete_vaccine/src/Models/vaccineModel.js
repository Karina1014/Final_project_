import { connectDB } from '../config/postgredb.js';

const deleteVaccine = async (id) => {
    try {
        const { data, error } = await connectDB
            .from('vaccine')
            .delete()
            .eq('id', id) 
            .select(); 

        if (error) {
            throw new Error(error.message);  
        }

        if (data.length === 0) {
            return null;
        }

        return data[0]; 
    } catch (error) {
        throw new Error(`Error deleting vaccine: ${error.message}`);
    }
};

export { deleteVaccine };
