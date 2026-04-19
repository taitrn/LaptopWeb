import React from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Đơn Hàng', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Sản Phẩm', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Thành Viên', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Tin Tức', path: '/admin/news', icon: <FileText size={20} /> },
    { name: 'Liên Hệ', path: '/admin/contacts', icon: <MessageSquare size={20} /> },
    { name: 'Cài Đặt', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="admin-wrapper d-flex min-vh-100 bg-light">
      {/* Sidebar - Srtdash Style (Dark) */}
      <aside className="bg-dark text-white border-end shadow" style={{ width: '280px' }}>
        <div className="p-4 border-bottom border-secondary mb-4">
          <h4 className="m-0 text-primary-red fw-bold">LaptopShop</h4>
          <small className="text-secondary">Admin Dashboard</small>
        </div>
        
        <nav className="nav flex-column px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path}
                to={item.path} 
                className={`nav-link d-flex align-items-center mb-1 py-3 px-4 rounded-3 text-white ${isActive ? 'bg-primary-red shadow' : 'opacity-75 hover-bg-secondary'}`}
              >
                <span className="me-3">{item.icon}</span>
                <span className="flex-grow-1">{item.name}</span>
                {isActive && <ChevronRight size={16} />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-4 border-top border-secondary">
          <button 
            onClick={handleLogout} 
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
          >
            <LogOut size={18} className="me-2" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow-1 overflow-auto">
        {/* Top Header */}
        <header className="bg-white shadow-sm py-3 px-4 d-flex justify-content-between align-items-center sticky-top">
          <h5 className="mb-0 fw-bold">
            {menuItems.find(item => location.pathname === item.path)?.name || 'Hệ thống Quản trị'}
          </h5>
          <div className="d-flex align-items-center">
            <div className="text-end me-3">
              <div className="fw-bold">{user?.fullname}</div>
              <small className="text-muted text-uppercase">Admin</small>
            </div>
            <div className="bg-primary-red rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '40px', height: '40px' }}>
              {user?.fullname?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <section className="p-4">
          <div className="fade-in-up">
            <Outlet />
          </div>
        </section>
      </main>

      <style>{`
        .hover-bg-secondary:hover {
          background-color: rgba(255, 255, 255, 0.1);
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
