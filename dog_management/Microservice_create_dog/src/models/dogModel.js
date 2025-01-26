import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nameDog: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  image:{type:String, required: true},
  gener: { type: String, required: true },
});

const productModel = mongoose.models.product || mongoose.model('dogs', productSchema);

export default productModel;
