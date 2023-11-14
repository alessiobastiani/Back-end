import fs from 'fs/promises';

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.productIdCounter = 1;
        
        this.loadProducts().catch(error => {
            console.error('Error al cargar los productos:', error);
        });
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios, no se agregó el producto");
            const existingProduct = this.products.some(product => product.code === code);

            if (existingProduct) {
                console.log("Ya existe un producto con el mismo código. No se ha agregado el producto.");
                return;
            }
            return;
        }

        const newProduct = {
            id: this.productIdCounter++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.push(newProduct);
        await this.saveProducts();
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
