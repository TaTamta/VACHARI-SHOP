import { initializeDropdown } from '../dropDown.js';
import { fetchProductsData } from '../helpers.js';
import { serviceIds } from '../constants.js';


initializeDropdown();

const productImage = document.getElementById('product-image');
const productTitle = document.getElementById('product-title');
const productQuantity = document.getElementById('product-quantity');
const productTotal = document.getElementById('product-total');
const submitButton = document.getElementById('submit-button');
const checkoutForm = document.getElementById('checkout-form');

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const quantity = urlParams.get('quantity');
const total = urlParams.get('total');

const serviceId = serviceIds.products;

fetchProductsData(serviceId, productId)
  .then(renderProductDetails)
  .catch((error) => console.error('Error fetching product details:', error));

function renderProductDetails(product) {
  productImage.style.backgroundImage = `url(${product.image})`;
  productTitle.textContent = product.title;
  productQuantity.textContent = `Quantity: ${quantity}`;
  productTotal.textContent = `Total: $${(product.price * quantity).toFixed(2)}`;
}

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const orderData = {
    productId,
    quantity,
    total,
  };
  localStorage.setItem('orderData', JSON.stringify(orderData));

  window.location.href = 'result.html';
});
