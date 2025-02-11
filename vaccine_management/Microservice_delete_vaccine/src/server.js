import express from 'express';
import cors from 'cors';
import vaccineRouter from './routes/vaccineRouter.js';
import cors from "cors";
import morgan from 'morgan'
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json' assert { type: "json" };
const app = express();
const PORT = 3003;

const corsOptions = {
  origin: "http://52.87.162.206", // Permitir peticiones solo desde el frontend
  credentials: true, // **IMPORTANTE** Permitir envío de cookies
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser()); // Middleware para manejar cookies-prove

app.use(express.json());

// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', vaccineRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 



