import { serviceIds } from '../constants.js';
import { initializeDropdown } from '../dropDown.js';
import { fetchProductsData } from '../helpers.js';

initializeDropdown();

const productImage = document.querySelector('.product-design');
const productTitle = document.querySelector('.title');
const productDescription = document.querySelector('.description');
const productPrice = document.querySelector('.price');
const quantityDisplay = document.querySelector('.quantity');
const quantityBadge = document.querySelectorAll('.quantity-badge');
const totalText = document.querySelector('.total .total-text');
const addToCartButton = document.getElementById('add-to-cart-button');
const purchaseButton = document.getElementById('purchase-button');

let quantity = 0;

// Extract product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Fetch product details from API based on ID
const serviceId = serviceIds.products;
fetchProductsData(serviceId, productId)
  .then((product) => {
    renderProductDetails(product);
  })
  .catch((error) => console.error('Error fetching product details:', error));

// Function to render product details
function renderProductDetails(product) {
  productImage.style.backgroundImage = `url(${product.image})`;
  productTitle.textContent = product.title;
  productDescription.textContent = product.description;
  productPrice.textContent = `Price: $${product.price}`;
  totalText.textContent = `Total: $${product.price * quantity}`;
}

// Function to adjust quantity
function adjustQuantity(amount) {
  quantity += amount;
  if (quantity < 0) {
    quantity = 0;
  }
  quantityDisplay.value = quantity;
  quantityBadge.forEach((item) => {
    item.innerHTML = quantity;
  });
  updateTotal();
}

// Function to update total based on quantity
function updateTotal() {
  const currentPrice = parseFloat(productPrice.textContent.split('$')[1]);
  totalText.textContent = `Total: $${currentPrice * quantity}`;

  // Disable buttons and remove hover animations if quantity is 0
  const isDisabled = quantity === 0;
  addToCartButton.classList[isDisabled ? 'add' : 'remove']('disabled');
  purchaseButton.classList[isDisabled ? 'add' : 'remove']('disabled');
}
updateTotal();

// Function to redirect to checkout page
function purchase() {
  if (purchaseButton.classList.contains('disabled')) {
    return;
  }

  console.log('here');

  const currentPrice = parseFloat(productPrice.textContent.split('$')[1]);
  const totalPayment = currentPrice * quantity;

  // Redirect to checkout page with quantity and total payment amount as query parameters
  window.location.href = `checkout.html?id=${productId}&quantity=${quantity}&total=${totalPayment.toFixed(
    2
  )}`;
}

// Event listeners for quantity buttons
document
  .querySelector('.quantity-buttons .minus')
  .addEventListener('click', () => adjustQuantity(-1));
document
  .querySelector('.quantity-buttons .plus')
  .addEventListener('click', () => adjustQuantity(1));

// Event listener for purchase
purchaseButton.addEventListener('click', purchase);
