import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import path from 'path';
import DBManager from './dbManager.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const PORT = 5000;

const httpServer = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos
DBManager.connect();

// Configuración de Handlebars y vistas
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    defaultLayout: 'main',
  })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

// Rutas de productos y carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Directorio público
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de productos y carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Crea una única instancia de ProductManager y cárgala al inicio
const productManager = new ProductManager(`${__dirname}/productos.json`);
productManager.initialize();

// Configuración de Socket.io
io.on('connection', (socket) => {
  console.log('Un usuario se conectó');

  // Manejo del evento 'addProduct'
  socket.on('addProduct', (data) => {
    const { title, description, price, code, stock } = data;

    // Llama al método addProduct en la instancia de ProductManager
    productManager.addProduct(title, description, price, code, stock);

    // Obtén la lista actualizada de productos
    const updatedProducts = productManager.getProducts();

    // Emitir la actualización a todos los clientes conectados
    io.emit('updateProducts', updatedProducts);
  });

});


