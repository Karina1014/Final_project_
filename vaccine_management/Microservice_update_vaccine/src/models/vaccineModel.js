import { connectDB } from '../config/postgredb.js';

export const updateVaccine = async (name, description, dose) => {
  try {
    if (!name || !description || !dose) {
      throw new Error('All fields must be filled');
    }

    const query = `
      UPDATE vaccine
      SET description = $1, dose = $2
      WHERE name = $3
      RETURNING *;
    `;

    const values = [description, dose, name];
    const res = await connectDB.query(query, values);

    if (res.rowCount === 0) {
      throw new Error('No vaccine found with the given name');
    }

    return res.rows[0];
  } catch (err) {
    throw new Error(`Error updating vaccine: ${err.message}`);
  }
};