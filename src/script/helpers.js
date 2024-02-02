import { apiEndPoint } from './constants.js';

export async function fetchProductsData(serviceId = null, param = null) {
  let apiUrl = `${apiEndPoint}/${serviceId}`;

  if (param !== null) {
    apiUrl += `/${param}`;
  }

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Helper function for rendering products
export function renderProducts(productData, containerId) {
  const productContainer = document.getElementById(containerId);

  productData.forEach((product) => {
    const productElement = createProductElement(product);
    productContainer.appendChild(productElement);
  });

  function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-block');
    productDiv.setAttribute('id', `${product.id}`);

    // Display product information
    productDiv.innerHTML = `
      <div class="product-design" style="background-image: url(${product.image});">
      </div>
      <div class="product-info">
          <h3 class="medium-text">${product.title}</h3>
          <div class="description-text">$${product.price}</div>
      </div>
    `;

    return productDiv;
  }
}

export function openDetailsPage(targetClass) {
  document.addEventListener('click', function (event) {
    const product = event.target.closest(`.${targetClass}`);
    if (product) {
      const productId = product.getAttribute('id');
      window.location.href = `details.html?id=${productId}`;
    }
  });
}
