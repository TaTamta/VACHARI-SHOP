import { initializeDropdown } from '../dropDown.js';

initializeDropdown();

const resultContainer = document.querySelector('.purchase-review');
const resultDetails = document.getElementById('result-details');

// Retrieve order data from localStorage
const orderDataString = localStorage.getItem('orderData');

if (orderDataString) {
  try {
    // Attempt to parse the JSON string
    const orderData = JSON.parse(orderDataString);

    // Check if resultDetails exists before setting innerHTML
    if (resultDetails) {
      // Display the order details on the results page
      renderProductDetails(orderData);
    } else {
      console.error('resultDetails element not found.');
    }
  } catch (error) {
    console.error('Error parsing order data:', error);
    // Display an error message on the results page
    if (resultDetails) {
      resultDetails.innerHTML = '<p>Error retrieving order details.</p>';
    } else {
      console.error('resultDetails element not found.');
    }
  }
} else {
  console.error('No order data found.');
  // Display a message when no order data is found
  if (resultDetails) {
    resultDetails.innerHTML = '<p>No order details found.</p>';
  } else {
    console.error('resultDetails element not found.');
  }
}

// Clear localStorage after retrieving order data
localStorage.removeItem('orderData');

function renderProductDetails(orderData) {
  const productTitle = document.getElementById('product-title');
  const productQuantity = document.getElementById('product-quantity');
  const productTotal = document.getElementById('product-price');

  // Check if product details elements exist before updating
  if (productTitle && productQuantity && productTotal) {
    // Render product details on the results page
    productTitle.textContent = orderData.productTitle;
    productQuantity.textContent = `Quantity: ${orderData.quantity}`;
    productTotal.textContent = `Total: $${orderData.total}`;
  } else {
    console.error('Product details elements not found.');
  }
}
