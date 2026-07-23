import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';  // NEW
import CartPage from './pages/CartPage';              // NEW

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />  {/* NEW */}
        <Route path="/cart" element={<CartPage />} />              {/* NEW */}
      </Routes>
    </Layout>
  );
}

export default App;
