import mongoose from 'mongoose';

// Esquema para el perro (dog)
const dogSchema = new mongoose.Schema({
  nameDog: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  image: { type: String, required: true },  // Aquí es donde se guarda el nombre de la imagen
  gener: { type: String, required: true },
});

// Crear el modelo para el perro (dog)
const dogModel = mongoose.models.Dog || mongoose.model('dogs', dogSchema);

export default dogModel;
