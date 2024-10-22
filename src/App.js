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

        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductID />} />
      </Routes>
      <Routes>

        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<Checkout />} />
      </Routes>

    </div>
  );
}

export default App;
