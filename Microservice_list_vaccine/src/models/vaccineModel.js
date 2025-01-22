import { connectDB } from '../config/postgredb.js';

const getVaccines = async () => {
  const { data, error } = await connectDB
    .from('vaccine')
    .select('*');

  if (error) {
    throw new Error(`Error fetching vaccines: ${error.message}`);
  }

  return data;
};
export { getVaccines };

