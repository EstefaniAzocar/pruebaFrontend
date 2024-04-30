
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Register from './pages/register/register';
import Login from './pages/login/login';
import Product from './pages/product/product';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/product" element={<Product/>} />
        <Route path="/success" element={<Navigate to="/" replace />} />
  
      </Routes>
    </BrowserRouter>
  );
}

export default App;

