import express from 'express';
import CartManager from '../CartManager.js';

const cartsRouter = express.Router();
const cartManager = new CartManager('./src/carts.json');

// Ruta para crear un nuevo carrito
cartsRouter.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.json(newCart);
});

cartsRouter.get('/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid); // Convertir el ID a un número
    console.log('Solicitud para obtener carrito con ID:', cartId);
    const cart = cartManager.getCart(cartId);
  
    if (cart && cart.products) {
      console.log('Carrito encontrado:', cart);
      res.json(cart); // Cambiado a res.json(cart) para devolver la estructura completa del carrito
    } else {
      console.log('Carrito no encontrado.');
      res.status(404).json({ error: 'Cart not found' });
    }
  });


// Ruta para agregar un producto a un carrito específico
cartsRouter.post('/:cid/product/:pid', (req, res) => {
  const cartId = parseInt(req.params.cid); // Convertir el ID a un número
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  const cart = cartManager.getCart(cartId);

  if (!cart) {
    res.status(404).json({ error: 'Cart not found' });
    return;
  }

  const updatedCart = cartManager.addProductToCart(cart, productId, quantity);

  res.json(updatedCart);
});

export default cartsRouter;
