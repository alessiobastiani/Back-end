import fs from 'fs/promises';

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.productIdCounter = 1;
  }

  async initialize() {
    await this.loadProducts();
  }

  async addProduct(title, description, price, code, stock) {
    // Verifica campos faltantes
    if (!title || !description || !price || !code || !stock) {
      console.log("Todos los campos son obligatorios excepto thumbnails");
      return;
    }

    const existingProduct = this.products.some((product) => product.code === code);

    if (existingProduct) {
      console.log("Ya existe un producto con el mismo código. No se ha agregado el producto.");
      return;
    }

    const newProduct = {
      id: this.generateUniqueId(),
      title,
      description,
      price,
      code,
      stock,
    };

    this.products.push(newProduct);
    await this.saveProducts();

    // No emitir el evento aquí, ya que se hace en el manejador del socket en app.js
  }

  generateUniqueId() {
    const timestamp = Date.now().toString();
    const newId = `${timestamp}-${this.productIdCounter++}`;
    return newId;
  }

  getProducts() {
    return this.products;
  }

  async getProductById(id) {
    const product = this.products.find(product => product.id === id);
    console.log("Searching for product with ID:", id);
    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado");
      return null;
    }
  }

  async updateProduct(id, updateProduct) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex === -1) {
      console.log("Producto no encontrado");
      return;
    }

    this.products[productIndex] = { ...this.products[productIndex], ...updateProduct };

    await this.saveProducts();
  }

  async deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex === -1) {
      console.log("Producto no encontrado");
      return;
    }

    this.products.splice(productIndex, 1);
    await this.saveProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      const parsedData = JSON.parse(data);
      console.log("Loaded products:", parsedData);
      this.products = parsedData;
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }

  async saveProducts() {
    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
  }
}

export default ProductManager;
