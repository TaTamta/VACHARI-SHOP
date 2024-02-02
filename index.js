import { initializeDropdown } from './src/script/dropDown.js';
import {
  fetchProductsData,
  openDetailsPage,
  renderProducts,
} from './src/script/helpers.js';
import { popularItemsLImit, serviceIds } from './src/script/constants.js';

// SLIDER
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName('mySlides');
  let dots = document.getElementsByClassName('dot');
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].classList.add('active');
  setTimeout(showSlides, 5000);
}

document.addEventListener('DOMContentLoaded', function () {
  let dots = document.getElementsByClassName('dot');
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', function () {
      currentSlide(i + 1);
    });
  }
});

function currentSlide(n) {
  showSlide((slideIndex = n));
}

function showSlide(n) {
  let i;
  let slides = document.getElementsByClassName('mySlides');
  let dots = document.getElementsByClassName('dot');
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].classList.add('active');
}

// fetch popular products
const serviceId = serviceIds.products;
const param = `?limit=${popularItemsLImit}`;
fetchProductsData(serviceId, param)
  .then((products) => {
    renderProducts(products, 'productsList');
  })
  .catch((error) => {
    // Handle the error as needed
    console.error('Error:', error);
  });
openDetailsPage('product-block');
initializeDropdown();
