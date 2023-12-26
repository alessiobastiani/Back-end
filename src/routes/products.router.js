// routes/products.router.js
import express from 'express';
import Product from '../models/product.model.js';

const productsRouter = express.Router();

// Ruta para obtener todos los productos
productsRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener todos los productos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para obtener un producto por ID
productsRouter.get('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error('Error al obtener un producto por ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para agregar un nuevo producto
productsRouter.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al agregar un nuevo producto:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para actualizar un producto por ID
productsRouter.put('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });

    if (!updatedProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar un producto por ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para eliminar un producto por ID
productsRouter.delete('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error al eliminar un producto por ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default productsRouter;
