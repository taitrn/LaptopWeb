import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages - Public E-commerce Core
import Home from './pages/public/Home';
import Products from './pages/public/Products';
import ProductDetail from './pages/public/ProductDetail';
import Cart from './pages/public/Cart';
import Checkout from './pages/public/Checkout';
import Pricing from './pages/public/Pricing';
import Contact from './pages/public/Contact';
import { About, News, FAQ } from './pages/public/InformationPages';
import Auth from './pages/public/Auth';

// Pages - Admin Dashboard
import { AdminOrders, AdminProducts, AdminUsers } from './pages/admin/AdminPages';

const AdminDashboard = () => (

  <div className="row g-4">
    <div className="col-md-3"><div className="card-premium p-4 text-center"><h3 className="text-primary-red fw-bold">120</h3><p className="mb-0 text-muted">Đơn hàng mới</p></div></div>
    <div className="col-md-3"><div className="card-premium p-4 text-center"><h3 className="text-primary-red fw-bold">45</h3><p className="mb-0 text-muted">Sản phẩm</p></div></div>
    <div className="col-md-3"><div className="card-premium p-4 text-center"><h3 className="text-primary-red fw-bold">1.2K</h3><p className="mb-0 text-muted">Thành viên</p></div></div>
    <div className="col-md-3"><div className="card-premium p-4 text-center"><h3 className="text-primary-red fw-bold">95M</h3><p className="mb-0 text-muted">Doanh thu (VNĐ)</p></div></div>
  </div>
);

const NotFound = () => <div className="p-5 text-center"><h1>404 - Không tìm thấy trang</h1></div>;

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="about" element={<About />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="news" element={<News />} />
          <Route path="faqs" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Auth />} />
        </Route>
        
        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="news" element={<div className="p-4 card-premium border-0">Tính năng quản lý Tin tức đang cập nhật</div>} />
            <Route path="contacts" element={<div className="p-4 card-premium border-0">Tính năng quản lý Liên hệ đang cập nhật</div>} />
            <Route path="settings" element={<div className="p-4 card-premium border-0">Tính năng quản lý Cài đặt đang cập nhật</div>} />
          </Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
