import jwt from 'jsonwebtoken';

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = decoded; // Decodifica el token y agrega los datos del usuario
    next();
  });
};

// Ruta protegida para obtener datos del usuario
app.get('/api/user/data', verifyToken, (req, res) => {
  // Suponiendo que la información del usuario está en req.user
  const userData = getUserDataFromDB(req.user.id); // Suponiendo que tienes una función para esto
  res.json({ success: true, userData });
});
