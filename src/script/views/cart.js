import { serviceIds } from '../constants.js';
import { initializeDropdown } from '../dropDown.js';
import { fetchProductsData } from '../helpers.js';

initializeDropdown();

const cartItemsElement = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-amount');

// Fetch cart data
let serviceId = serviceIds.carts;
let param = '5';

fetchProductsData(serviceId, param)
  .then((cartData) => {
    serviceId = serviceIds.products;

    const productPromises = cartData.products.map((item) => {
      param = item.productId;
      return fetchProductsData(serviceId, param);
    });

    Promise.all(productPromises)
      .then((products) => {
        renderCartItems(cartData.products, products);
        updateTotalPrice(cartData.products, products);
      })
      .catch((error) =>
        console.error('Error fetching product details:', error)
      );
  })
  .catch((error) => {
    console.error('Error:', error);
  });

function renderCartItems(cartItems, products) {
  cartItemsElement.innerHTML = '';

  cartItems.forEach((cartItem, index) => {
    const product = products[index];

    const listItem = document.createElement('li');
    listItem.className = 'cart-item';

    listItem.innerHTML = `
      <div>
        <img src="${product.image}" alt="${
      product.title
    }" style="width: 50px; height: 50px;">
      </div>
      <div>
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p>Quantity: ${cartItem.quantity}</p>
        <p>Price: $${(product.price * cartItem.quantity).toFixed(2)}</p>
        <button class="remove-button">Remove</button>
      </div>
    `;

    cartItemsElement.appendChild(listItem);
  });
  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      removeItem();
    });
  });
}

function updateTotalPrice(cartItems, products) {
  const totalPrice = cartItems.reduce((sum, cartItem, index) => {
    const product = products[index];
    return sum + product.price * cartItem.quantity;
  }, 0);

  totalPriceElement.textContent = totalPrice.toFixed(2);
}

function removeItem() {
  cartItemsElement.addEventListener('click', (event) => {
    const removeButton = event.target.closest('.remove-button');
    const productContainer = removeButton.closest('.cart-item');
    productContainer.style.display = 'none';
  });
}

function purchase() {
  console.log('Checkout clicked');
}
