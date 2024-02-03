import { serviceIds } from '../constants.js';
import {
  fetchProductsData,
  renderProducts,
  openDetailsPage,
} from '../helpers.js';
import { initializeDropdown } from '../dropDown.js';
import {
  getPaginationNumbers,
  handlePageButtonsStatus,
  handleActivePageNumber,
} from '../pagination.js';

const paginationNumbers = document.getElementById('pagination-numbers');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const clearFilterButton = document.getElementById('clear-filter-button');
clearFilterButton.addEventListener('click', clearFilter);

const paginationLimit = 6;
let loadedProducts = [];
let currentPage = 1;
let pageCount = 1;
let isFilterApplied = false;

const serviceId = serviceIds.products;
const param = 'categories';

async function loadData() {
  try {
    // Fetch all products initially
    const products = await fetchProductsData(serviceId, null);
    loadedProducts = products;

    // Fetch categories
    const categories = await fetchProductsData(serviceId, param);
    renderCategories(categories);

    paginateList();
  } catch (error) {
    console.error('Error:', error);
  }
}

loadData();

function renderCategories(categories) {
  const categoriesContainer = document.getElementById('categories');

  categories.forEach((category) => {
    const categoryElement = createCategoryElement(category);
    categoriesContainer.appendChild(categoryElement);
  });

  function createCategoryElement(category) {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    categoryDiv.innerHTML = category;

    // Add click event listener to filter products by category
    categoryDiv.addEventListener('click', () => {
      filterByCategory(category);
    });

    return categoryDiv;
  }
}

function filterByCategory(category) {
  isFilterApplied = true;

  // Fetch products based on the selected category
  const serviceId = serviceIds.products;
  const param = `category/${category}`;
  fetchProductsData(serviceId, param)
    .then((filteredProducts) => {
      loadedProducts = filteredProducts;
      currentPage = 1;
      paginateList();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function clearFilter() {
  console.log('Clear filter button clicked');
  isFilterApplied = false;
  currentPage = 1;

  // Fetch all products
  fetchProductsData(serviceId, null).then((products) => {
    loadedProducts = products;
    paginateList();
  });
}

function displayProductsOnPage(page) {
  const paginatedList = document.getElementById('productsList');
  paginatedList.innerHTML = '';

  const startIdx = (page - 1) * paginationLimit;
  const endIdx = startIdx + paginationLimit;
  const displayedProducts = loadedProducts.slice(startIdx, endIdx);

  renderProducts(displayedProducts, 'productsList');
}

function paginateList() {
  pageCount = Math.ceil(loadedProducts.length / paginationLimit);

  getPaginationNumbers(pageCount, paginationNumbers);
  displayProductsOnPage(currentPage);
  handlePageButtonsStatus(currentPage, pageCount, prevButton, nextButton);
  handleActivePageNumber(currentPage);

  // Show/hide pagination based on the filter status
  paginationNumbers.style.display = isFilterApplied ? 'none' : 'block';
  prevButton.style.display = isFilterApplied ? 'none' : 'block';
  nextButton.style.display = isFilterApplied ? 'none' : 'block';

  prevButton.addEventListener('click', () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener('click', () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll('.pagination-number').forEach((button) => {
    const pageIndex = Number(button.getAttribute('page-index'));

    if (pageIndex) {
      button.addEventListener('click', () => {
        setCurrentPage(pageIndex);
      });
    }
  });
}

function setCurrentPage(pageNum) {
  currentPage = pageNum;

  handleActivePageNumber(currentPage);
  handlePageButtonsStatus(currentPage, pageCount, prevButton, nextButton);
  displayProductsOnPage(currentPage);

  // Show/hide pagination based on the filter status
  paginationNumbers.style.display = isFilterApplied ? 'none' : 'block';
  prevButton.style.display = isFilterApplied ? 'none' : 'block';
  nextButton.style.display = isFilterApplied ? 'none' : 'block';
}

openDetailsPage('product-block');
initializeDropdown();
