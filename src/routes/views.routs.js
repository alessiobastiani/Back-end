import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager('./productos.json');

// ...

router.get("/", (req, res) => {
  const products = productManager.getProducts(); // Utiliza la instancia de ProductManager
  res.render("home.hbs", { products });
});

router.get("/realtimeproducts", (req, res) => {
  const products = productManager.getProducts(); // Utiliza la instancia de ProductManager
  res.render("realTimeProducts.hbs", { products });
});

// ...

export default router;
