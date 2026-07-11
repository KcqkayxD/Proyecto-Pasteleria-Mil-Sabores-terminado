import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import { HashRouter } from 'react-router-dom';
=======
import { BrowserRouter } from 'react-router-dom';
>>>>>>> master
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<<<<<<< HEAD
    <HashRouter>
=======
    <BrowserRouter>
>>>>>>> master
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
<<<<<<< HEAD
    </HashRouter>
=======
    </BrowserRouter>
>>>>>>> master
  </React.StrictMode>
);
