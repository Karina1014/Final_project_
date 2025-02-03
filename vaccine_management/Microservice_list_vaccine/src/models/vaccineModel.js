import { connectDB } from '../config/postgredb.js';

const getVaccines = async () => {
  try {
    const res = await connectDB.query('SELECT * FROM vaccine');
    return res.rows; 
  } catch (err) {
    throw new Error(`Error fetching vaccines: ${err.message}`);
  }
};

export { getVaccines };


