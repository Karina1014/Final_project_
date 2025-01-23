import mongoose from 'mongoose';

const dogSchema = new mongoose.Schema({
  nameDog: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  image: { type: String, required: true },  
  gener: { type: String, required: true },
});


const dogModel = mongoose.models.Dog || mongoose.model('dogs', dogSchema);

export default dogModel;
