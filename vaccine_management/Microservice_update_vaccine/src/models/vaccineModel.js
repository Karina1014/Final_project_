import { connectDB } from '../config/postgredb.js';

export const updateVaccine = async (id, name, description, dose) => {
  try {
    if (!name || !description || !dose) {
      throw new Error('All fields must be filled');
    }

    const query = `
      UPDATE vaccine
      SET name = $1, description = $2, dose = $3
      WHERE id_vaccine = $4
      RETURNING *;
    `;
    
    const values = [name, description, dose, id];
    const res = await connectDB.query(query, values);

    if (res.rowCount === 0) {
      return null; // Para que el controlador maneje el error correctamente
    }

    return res.rows[0];  
  } catch (err) {
    throw new Error(Error updating vaccine: ${err.message});
  }
};