// routes/carts.router.js
import express from 'express';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

const cartsRouter = express.Router();

// Ruta para obtener todos los carritos
cartsRouter.get('/', async (req, res) => {
  try {
    const carts = await Cart.find().populate('products.product'); // Utiliza populate para traer los productos completos
    res.json(carts);
  } catch (error) {
    console.error('Error al obtener todos los carritos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para obtener un carrito por ID
cartsRouter.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await Cart.findById(cartId).populate('products.product'); // Utiliza populate para traer los productos completos

    if (!cart) {
      res.status(404).json({ error: 'Cart not found' });
      return;
    }

    res.json(cart);
  } catch (error) {
    console.error('Error al obtener un carrito por ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para agregar un producto a un carrito específico
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      res.status(404).json({ error: 'Cart not found' });
      return;
    }

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    // Agregar el producto al carrito
    cart.products.push({ product: productId, quantity });
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error('Error al agregar un producto al carrito:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ... Puedes agregar más rutas según tus necesidades

export default cartsRouter;
