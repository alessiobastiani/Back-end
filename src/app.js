
import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const PORT = 5000;

// Middleware para manejar datos JSON
app.use(express.json());

// Middleware para manejar datos codificados en formato de aplicación
app.use(express.urlencoded({ extended: true }));

// rutas de productos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
