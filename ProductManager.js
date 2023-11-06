
const fs = require ('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath
        this.products = this.loadProducts()
        this.productIdCounter = 1
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
        this.saveProducts()
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

    updateProduct(id, updateProduct){
        const productIndex = this.products.findIndex(product => product.id === id)
        if(productIndex === -1){
            console.log("producto no encontrado");
            return
        }
        this.products[productIndex]= {...this.products[productIndex], ...updateProduct}
        this.saveProducts()
    }

    deleteProduct(id){
        const productIndex = this.products.findIndex(product => product.id === id)
        if(productIndex === -1){
            console.log("producto no encontrado")
            return
        }
        this.products.splice(productIndex, 1);
        this.saveProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }
}

// Probando el código
const productManager = new ProductManager('productos.json');

productManager.addProduct("producto 1", "descripcion 1", 2000, "imagen1.jpg", "001", 7);
productManager.addProduct("producto 2", "descripcion 2", 5000, "imagen2.jpg", "002", 3);

console.log(productManager.getProducts());

const product = productManager.getProductById(1);
if (product) {
    console.log("Producto encontrado:", product);
}

productManager.updateProduct(1, { price: 2500 });
console.log("Producto actualizado:", productManager.getProductById(1));

productManager.deleteProduct(2);
console.log("Productos después de eliminar:", productManager.getProducts());

