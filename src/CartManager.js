import fs from 'fs/promises';

class CartManager {
  constructor(filePath) {
    this.path = filePath;
    this.carts = [];
    this.cartIdCounter = 1;

    this.loadCarts().catch(error => {
      console.error('Error al cargar los carritos:', error);
    });
  }

  async createCart() {
    const cartId = this.generateCartId();
    const newCart = { id: cartId, products: [] };
    this.carts.push(newCart);
    await this.saveCarts();
    return newCart;
  }

  generateCartId() {
    const timestamp = new Date().getTime();
    const newId = `${timestamp}-${this.cartIdCounter++}`;
    return newId;
  }

  getCart(cartId) {
    const foundCart = this.carts.find(cart => parseInt(cart.id) === cartId);
    return foundCart || {};
}

  addProductToCart(cart, productId, quantity) {
    
    const existingProductIndex = cart.products.findIndex(product => product.id === productId);
  
    if (existingProductIndex !== -1) {
      // Si el producto ya existe, incrementar la cantidad
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Si el producto no existe, agregarlo al carrito
      const product = { id: productId, quantity };
      cart.products.push(product);
    }
  
    this.saveCarts().catch(error => {
      console.error('Error al guardar los carritos:', error);
    });
  
    return cart;
  }
  

  async loadCarts() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      const parsedData = JSON.parse(data);
  
      // Filtrar elementos inválidos y duplicados antes de asignarlos a this.carts
      const uniqueCarts = [];
      const cartIds = new Set();
  
      for (const cart of parsedData) {
        if (cart && typeof cart === 'object' && cart.id && !cartIds.has(cart.id)) {
          uniqueCarts.push(cart);
          cartIds.add(cart.id);
        }
      }
  
      this.carts = uniqueCarts;
  
      console.log('Loaded carts:', this.carts);
    } catch (error) {
      console.error('Error loading carts:', error);
      this.carts = []; // Intentamos asignar un array vacío en caso de error
    }
  }
  
  

  async saveCarts() {
    await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
  }
}

export default CartManager;
