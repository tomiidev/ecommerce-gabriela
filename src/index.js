import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './context/search';
import { CartProvider } from './context/cart';
import { CategoriesProvider } from './context/notifications';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /*   <React.StrictMode> */
  <CategoriesProvider>
    <SearchProvider>
      <CartProvider>

        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </CategoriesProvider>
  /*   </React.StrictMode> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
