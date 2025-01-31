import { connectDB } from '../config/postgredb.js'; 

const create = async (name, description, dose) => {
  const { data, error } = await connectDB.from('vaccine').insert([
    { name, description, dose }
]).select();

if (error) {
    throw new Error(`Error creating vaccine: ${error.message}`);
}
return data;
};

export { create };
