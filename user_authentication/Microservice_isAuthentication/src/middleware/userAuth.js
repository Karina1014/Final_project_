import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    // Obtener token desde la cookie o desde el header Authorization
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    // Si no hay token, devolver error de autorización
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please log in.",
      });
    }

    // Verificar y decodificar el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Si el ID está en el token, asignarlo a req.userId
    if (decoded.id) {
      req.userId = decoded.id; // Guardar userId en la request
      next(); // Pasar al siguiente middleware o controlador
    } else {
      return res.status(403).json({
        success: false,
        message: "Invalid token. Please log in again.",
      });
    }
  } catch (error) {
    // Manejo de errores de token inválido o expirado
    return res.status(403).json({
      success: false,
      message: error.name === "TokenExpiredError" ? "Session expired. Please log in again." : "Invalid token.",
    });
  }
};

export default userAuth;
