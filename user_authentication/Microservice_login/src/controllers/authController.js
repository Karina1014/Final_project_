import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: 'Email and password are required.',
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: 'Invalid email. We couldn’t find your account.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: 'Incorrect password.' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    // Sending Welcome Email
    const mailOptions = {
      from: `"Canine Vaccination System" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: '🐶 Welcome to the Canine Vaccination System 🏥',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2C3E50; text-align: center;">🐕 Welcome to the Canine Vaccination System! 🏥</h2>
          <p>Hello <strong>${user.name}</strong>,</p>
          <p>Your account has been successfully created in the <strong>Canine Vaccination System</strong>.</p>
          <p>You can now manage your pets' vaccinations, receive reminders, and ensure they are always protected. 🐾</p>
          <p>Registered Email: <strong>${email}</strong></p>
          <p>If you need any assistance, feel free to contact us.</p>
          <br>
          <p style="color: #888; text-align: center;">Best regards, <br> The Canine Vaccination System Team 🐶</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: 'Login successful.' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Something went wrong. Please try again later.' });
  }
};
