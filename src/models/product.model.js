// models/product.model.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  available: Boolean,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
