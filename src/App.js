import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Shop from './components/shop';
import ProductID from './components/product_id';
import Cart from './components/cart';
import Checkout from './components/checkout';
import SearchResults from './components/search_page_results';
import VistaServicios from './components/services';
import BlogArticle from './components/blog_id';
import BlogList from './components/list_blog.jsx';
import CartTest from './components/cart_test.jsx';
import ProductIDV2 from './components/product_id_v2.jsx';
import RastrearRutas from './components/gps.jsx';

function App() {
  return (
    <div className="App">
      <RastrearRutas />
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<Home />} />
        <Route path="/shop/:category/:subCategory" element={<Shop />} />
        {/*   <Route path="/shop/:category/:subCategory/:productId" element={<ProductID />} /> */}
        <Route path="/shop/:category/:subCategory/:productTitle" element={<ProductIDV2 />} />
        {/*  <Route path="/shop/:category/:subCategory/:productId" element={<ProductIDV2 />} /> */}
        <Route path="/cart" element={<CartTest />} />
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="/buscar" element={<SearchResults />} />
        <Route path="/servicios" element={<VistaServicios />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogArticle />} />

        {/* Ruta de 404 */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </div>
  );
}

export default App;
