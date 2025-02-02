import { connectDB } from '../config/postgredb.js'; 

const create = async (name, description, dose) => {
  try {
    const query = `
      INSERT INTO vaccine (name, description, dose)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [name, description, dose];

    const result = await connectDB.query(query, values);
    return result.rows[0]; // Retorna la vacuna insertada
  } catch (error) {
    console.error('Error creating vaccine:', error);
    throw error;
  }
};

export { create };



