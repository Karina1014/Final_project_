import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie("token", token, {
      httpOnly: true, // Evita que JavaScript acceda a la cookie
      secure: false, // ⚠️ Solo funciona con HTTPS (AWS usa HTTP por defecto)
      sameSite: "None", // ⚠️ Necesario para dominios diferentes
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });
    

    // 📨 Enviar email de bienvenida
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: '🐶 Welcome to the Canine Vaccination System 🏥',
      text: `🐕 Welcome to the Canine Vaccination System! 🏥.  Your account has been created with email ID: ${email}`
    };
    await transporter.sendMail(mailOption);

    return res.json({ success: true, message: "Login successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
  }
};

// 🛠 Middleware para ver las cookies recibidas
export const checkCookies = (req, res, next) => {
  console.log("Cookies recibidas:", req.cookies);
  next();
};
