import { connectDB } from '../config/postgredb.js';

export const updateVaccine = async (id, name, description, dose) => {
  const { data, error } = await connectDB
    .from('vaccine')
    .update({ name, description, dose })
    .eq('id', id) 
    .select();

  if (error) {
    throw new Error(`Error updating vaccine: ${error.message}`);
  }

  return data;
};
