import { serviceIds } from '../constants.js';
import { initializeDropdown } from '../dropDown.js';
import { fetchProductsData } from '../helpers.js';

initializeDropdown();

const cartItemsElement = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-amount');

// Fetch cart data
fetch('https://fakestoreapi.com/carts/5')
  .then((res) => res.json())
  .then((cartData) => {
    // Fetch product details for each item in the cart
    const productPromises = cartData.products.map((item) =>
      fetch(`https://fakestoreapi.com/products/${item.productId}`).then((res) =>
        res.json()
      )
    );

    Promise.all(productPromises)
      .then((products) => {
        renderCartItems(cartData.products, products);
        updateTotalPrice(cartData.products, products);
      })
      .catch((error) =>
        console.error('Error fetching product details:', error)
      );
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
  // Implement checkout logic here
  console.log('Checkout clicked');
  // You can include your existing purchase logic here
}

// window.purchase = function () {
//   const items = []; // An array to store items

//   // Loop through each product on the page and gather relevant information
//   document
//     .querySelectorAll('.product-container')
//     .forEach((productContainer) => {
//       const productId = productContainer.dataset.productId;
//       const quantity = parseInt(productContainer.dataset.quantity);
//       const price = parseFloat(productContainer.dataset.price);

//       items.push({
//         productId,
//         quantity,
//         price,
//       });
//     });

//   // Calculate total payment
//   const totalPayment = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   // Redirect to checkout page with items array and total payment amount as query parameters
//   window.location.href = `checkout.html?items=${encodeURIComponent(
//     JSON.stringify(items)
//   )}&total=${totalPayment.toFixed(2)}`;
// };
