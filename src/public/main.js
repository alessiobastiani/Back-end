// Conecta con el servidor WebSocket
const socket = io();

socket.on('updateProducts', (products) => {
  const realTimeProductList = document.getElementById('realTimeProductList');
  realTimeProductList.innerHTML = '';

  // Verifica que products esté definido y no sea null
  if (products && products.length) {
    products.forEach((product) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${product.title} - ${product.price}`;
      realTimeProductList.appendChild(listItem);
    });
  }
});

// Maneja el envío del formulario para agregar un nuevo producto
const productForm = document.getElementById('productForm');
productForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(productForm);
  const title = formData.get('title');
  const description = formData.get('description');
  const price = formData.get('price');
  const code = formData.get('code');
  const stock = formData.get('stock');

  // Enviar la información del producto al servidor a través de websockets
  socket.emit('addProduct', { title, description, price, code, stock });

  // Limpiar el formulario después de enviar los datos
  productForm.reset();
});
