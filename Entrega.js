class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios, no se agregó el producto");
            return;
        }
        if (this.products.some(product => product.code === code)) {
            console.log("Ya existe un producto con el mismo código. No se ha agregado el producto.");
            return;
        }

        const newProduct = {
            id: this.productIdCounter++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.log("Producto no encontrado");
            return null;
        }
    }
}

// Probando el codigo
const productManager = new ProductManager();

productManager.addProduct("producto 1", "descripcion 1", 2000, "imagen1.jpg", "001", 7);
productManager.addProduct("producto 2", "descripcion 2", 5000, "imagen2.jpg", "002", 3);

console.log(productManager.getProducts());

const product = productManager.getProductById(1);
if (product) {
    console.log("Producto encontrado:", product);
}

const nonExistentProduct = productManager.getProductById(3);
