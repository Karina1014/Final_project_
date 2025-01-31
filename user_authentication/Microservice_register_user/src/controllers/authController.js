import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Verificar que todos los campos estén presentes
  if (!name || !email || !password) {
    return res.json({ success: false, message: 'Missing details' });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: 'User already exists' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    return res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Something went wrong. Please try again later.' });
  }
};
