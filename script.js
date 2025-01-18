let cart = [];

function addToCart(name, price) {
  const item = cart.find(product => product.name === name);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const totalAmount = document.getElementById('total-amount');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="images/${item.name.toLowerCase().replace(' ', '_')}.jpg" alt="${item.name}">
        <p>${item.name} - $${item.price} x ${item.quantity} = $${itemTotal}</p>
        <button onclick="changeQuantity('${item.name}', 1)">+</button>
        <button onclick="changeQuantity('${item.name}', -1)">-</button>
        <button onclick="removeFromCart('${item.name}')">Delete</button>
      </div>
    `;
  });

  totalAmount.textContent = total;
}

function changeQuantity(name, delta) {
  const item = cart.find(product => product.name === name);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(product => product.name !== name);
    }
    updateCart();
  }
}

function removeFromCart(name) {
  cart = cart.filter(product => product.name !== name);
  updateCart();
}

function continueShopping() {
  window.location.href = 'product.html';
}

function checkout() {
  alert('Checkout successful!');
  cart = [];
  updateCart();
}
