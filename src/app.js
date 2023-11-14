import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const PORT = 5000;

const productManager = new ProductManager('./src/productos.json');

app.get("/products/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);

        if (isNaN(productId)) {
            return res.status(400).json({ error: "El parámetro de ID de producto debe ser un número válido" });
        }

        const product = await productManager.getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json({ product });
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.get("/products", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        
        const products = await productManager.getProducts();

        const limitedProducts = limit ? products.slice(0, limit) : products;

        res.json({ products: limitedProducts });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
