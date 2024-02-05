import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrderManagementPage from './pages/OrderManagementPage';
import ProductManagementPage from './pages/ProductManagementPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProductPage />} />
        <Route path='/shoe' element={<ProductPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/dashboard/order-list' element={ <OrderManagementPage />}/>
        <Route path='/dashboard/product-list' element={ <ProductManagementPage />}/>
      </Routes>
    </>
  );
}

export default App;
