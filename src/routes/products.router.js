
import express from 'express';
import ProductManager from '../ProductManager.js';

const productsRouter = express.Router();
const productManager = new ProductManager('./src/productos.json');

productsRouter.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await productManager.getProducts();
        const limitedProducts = limit ? products.slice(0, limit) : products;
        res.json({ products: limitedProducts });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

productsRouter.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);

        if (isNaN(productId)) {
            return res.status(400).json({ error: 'El parámetro de ID de producto debe ser un número válido' });
        }

        const product = await productManager.getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ product });
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails,
        } = req.body;

        // Validación de campos obligatorios
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios excepto thumbnails' });
        }

        // Generar un nuevo producto con un ID único
        const newProduct = {
            id: productManager.generateUniqueId(), // Implementa la generación de un ID único
            title,
            description,
            code,
            price,
            status: true, // Por defecto
            stock,
            category,
            thumbnails: thumbnails || [], // Puede ser un array vacío si no se proporciona
        };

        // Agregar el nuevo producto
        await productManager.addProduct(newProduct);

        res.status(201).json({ product: newProduct });
    } catch (error) {
        console.error('Error al agregar un nuevo producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

productsRouter.put('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        if (isNaN(productId)) {
            return res.status(400).json({ error: 'El parámetro de ID de producto debe ser un número válido' });
        }

        const existingProduct = await productManager.getProductById(productId);

        if (!existingProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await productManager.updateProduct(productId, req.body);

        const updatedProduct = await productManager.getProductById(productId);

        res.json({ product: updatedProduct });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para eliminar un producto por ID
productsRouter.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);

        if (isNaN(productId)) {
            return res.status(400).json({ error: 'El parámetro de ID de producto debe ser un número válido' });
        }

        const existingProduct = await productManager.getProductById(productId);

        if (!existingProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Eliminar el producto
        await productManager.deleteProduct(productId);

        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default productsRouter;
