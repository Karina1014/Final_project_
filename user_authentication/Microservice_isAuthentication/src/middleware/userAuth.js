import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const token = req.cookies.token; // Obtenemos el token desde las cookies

  if (!token) {
    // Si no hay token, el usuario no está autorizado
    return res.status(401).json({
      success: false,
      message: 'Not Authorized. Login Again',
    });
  }

  try {
    // Verificamos el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id) {
      // Si el token es válido, agregamos el userId a la solicitud
      req.userId = decoded.id;
      next(); // Continuamos con la ejecución del siguiente middleware o controlador
    } else {
      return res.status(401).json({
        success: false,
        message: 'Not Authorized. Login Again',
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token or expired.',
    });
  }
};

export default userAuth;
