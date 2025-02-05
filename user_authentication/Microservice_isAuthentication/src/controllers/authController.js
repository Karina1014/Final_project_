import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

// Middleware de autenticación para verificar el token
export const isAuthenticated = async (req, res) => {
  const token = req.cookies.token;  // Obtener el token desde las cookies

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    // Verificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Asignar el usuario decodificado al request
    return res.json({ success: true });
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Enviar OTP para restablecer la contraseña
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  // Validar que se haya recibido el email
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    // Buscar al usuario por el correo electrónico
    const user = await userModel.findOne({ email });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generar OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;  // Guardar el OTP en el campo resetOtp
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // Expira en 15 minutos

    // Guardar los cambios en la base de datos
    await user.save();

    // Configuración del correo
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Password Reset OTP',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
              }
              p {
                color: #555;
                font-size: 16px;
                line-height: 1.5;
              }
              .otp {
                background-color: #4CAF50;
                color: white;
                font-size: 24px;
                font-weight: bold;
                padding: 10px 20px;
                border-radius: 4px;
                margin: 20px 0;
                display: inline-block;
              }
              .footer {
                font-size: 14px;
                color: #888;
                text-align: center;
                margin-top: 30px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Password Reset Request</h1>
              <p>Hello,</p>
              <p>We received a request to reset the password for your account. To proceed, please use the following One-Time Password (OTP):</p>
              <p class="otp">${otp}</p>
              <p>This OTP is valid for a limited time, so please use it soon. If you did not request this change, you can safely ignore this email.</p>
              <div class="footer">
                <p>Thank you for using our service.</p>
                <p>Best regards, <br>Your Company Name</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Enviar el correo
    try {
      await transporter.sendMail(mailOption);
    } catch (emailError) {
      return res.status(500).json({ success: false, message: 'Error sending email', error: emailError.message });
    }

    return res.status(200).json({ success: true, message: 'OTP sent to email' });

  } catch (error) {
    console.error('Error during OTP generation or email sending:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
// Asegúrate de que esta función esté definida y exportada
export const verifiEmail = async (req, res) => {
  const { otp } = req.body;
  // Lógica de verificación de email usando OTP
  try {
    // Supongamos que validas el OTP y el usuario
    const user = await userModel.findOne({ 'resetOtp': otp });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // Si es válido, puedes actualizar la verificación del usuario
    user.isAccountVerified = true;
    await user.save();

    res.status(200).json({ success: true, message: 'Account verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};