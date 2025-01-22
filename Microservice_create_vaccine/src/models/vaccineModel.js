import { connectDB } from '../config/postgredb.js'; 

const createVaccines = async (Name, Description, Dose) => {
  const { data, error } = await connectDB.from('vaccine').insert([
    { Name, Description, Dose }
]).select();

if (error) {
    throw new Error(`Error creating vaccine: ${error.message}`);
}
return data;
};

export { createVaccines };
