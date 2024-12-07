import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Shop from './components/shop';
import ProductID from './components/product_id';
import Cart from './components/cart';
import Checkout from './components/checkout';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<Home />} />
        <Route path="/shop/:id/:id" element={<Shop />} />
        <Route path="/shop/:id/:id/:id" element={<ProductID />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
