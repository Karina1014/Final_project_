import { vaccineUpdateDb } from '../config/supabasedb.js';

export const updateVaccine = async (id, Name, Description, Dose) => {
  const { data, error } = await vaccineUpdateDb
    .from('vaccine')
    .update({ Name, Description, Dose })
    .eq('id', id) 
    .select();

  if (error) {
    throw new Error(`Error updating vaccine: ${error.message}`);
  }

  return data;
};
