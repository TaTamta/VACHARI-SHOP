import { serviceIds } from '../constants.js';
import { initializeDropdown } from '../dropDown.js';
import { fetchProductsData } from '../helpers.js';

initializeDropdown();

const detailsContainer = document.querySelector('.product-details');
const productImage = document.querySelector('.product-design');
const productTitle = document.querySelector('.title');
const productDescription = document.querySelector('.description');
const productPrice = document.querySelector('.price');
const quantityDisplay = document.querySelector('.quantity');
const quantityBadge = document.querySelectorAll('.quantity-badge');
const totalText = document.querySelector('.total .total-text');
const addToCartButton = document.getElementById('add-to-cart-button');
const purchaseButton = document.getElementById('purchase-button');
const cartBadge = document.querySelector('#add-to-cart-button .number');

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
window.adjustQuantity = function (amount) {
  quantity += amount;
  if (quantity < 0) {
    quantity = 0;
  }
  quantityDisplay.value = quantity;
  quantityBadge.forEach((item) => {
    item.innerHTML = quantity;
  });
  updateTotal();
};

// Function to update total based on quantity
function updateTotal() {
  const currentPrice = parseFloat(productPrice.textContent.split('$')[1]);
  totalText.textContent = `Total: $${currentPrice * quantity}`;

  // Disable buttons and remove hover animations if quantity is 0
  const isDisabled = quantity === 0;
  addToCartButton.classList[isDisabled ? 'add' : 'remove']('disabled');
  purchaseButton.classList[isDisabled ? 'add' : 'remove']('disabled');
}

// Call updateTotal when initializing the page
updateTotal();
// Function to add product to cart
window.addToCart = function () {
  updateCartBadge(++quantity);
};

// Function to update cart badge
function updateCartBadge(cartCount) {
  cartBadge.textContent = cartCount;
}

// Function to redirect to checkout page
window.purchase = function () {
  if (purchaseButton.classList.contains('disabled')) {
    return;
  }
  const currentPrice = parseFloat(productPrice.textContent.split('$')[1]);
  const totalPayment = currentPrice * quantity;

  // Redirect to checkout page with quantity and total payment amount as query parameters
  window.location.href = `checkout.html?id=${productId}&quantity=${quantity}&total=${totalPayment.toFixed(
    2
  )}`;
};

// Event listeners for quantity buttons
document
  .querySelector('.quantity-buttons .minus')
  .addEventListener('click', () => window.adjustQuantity(-1));
document
  .querySelector('.quantity-buttons .plus')
  .addEventListener('click', () => window.adjustQuantity(1));

// Event listener for adding to cart
addToCartButton.addEventListener('click', window.addToCart);

// Event listener for purchase
purchaseButton.addEventListener('click', window.purchase);
