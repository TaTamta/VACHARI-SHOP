# VACHARI Shop

A multi-page online shop built with **vanilla JavaScript (ES modules), HTML and CSS**, no frameworks. Product, cart and order data come from the [Fake Store API](https://fakestoreapi.com/).

## Features

- **Home page** with an auto-playing image slider (dot navigation) and a popular-items section
- **Product catalog** with categories and pagination
- **Responsive navigation** that collapses into a dropdown menu on small screens
- **Product details** page
- **Cart** with per-item quantities, line totals and order total (fetched from the API)
- **Checkout** flow with an order confirmation page; order data is passed between pages via `localStorage`

## Tech stack

- HTML5, CSS3, JavaScript (ES modules)
- `fetch` + async/await against a REST API
- No build step and no dependencies

## Project structure

```
index.html, products-page.html, details.html, cart.html, checkout.html, result.html
index.js                    # Home page: slider, popular items
src/
├── script/
│   ├── constants.js        # API endpoint and service ids
│   ├── helpers.js          # Fetching and rendering helpers
│   ├── pagination.js
│   ├── dropDown.js
│   └── views/              # One module per page (cart, checkout, details, ...)
├── styles/
└── assets/
```

## Running locally

ES modules need to be served over HTTP, so open the project with a local server, for example:

```bash
git clone https://github.com/TaTamta/VACHARI-SHOP.git
cd VACHARI-SHOP
npx serve .
```

Or use the VS Code **Live Server** extension.

## Author

**Tamta Tavartkiladze** — [GitHub](https://github.com/TaTamta)
