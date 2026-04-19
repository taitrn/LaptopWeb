import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Laptop } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const navLinks = [
    { name: 'Sản Phẩm', path: '/products' },
    { name: 'Bảng Giá Dịch Vụ', path: '/pricing' },
    { name: 'Tin Tức', path: '/news' },
    { name: 'Giới Thiệu', path: '/about' },
    { name: 'Liên Hệ', path: '/contact' },
    { name: 'Hỏi Đáp', path: '/faqs' },
  ];

  return (
    <header className="sticky-top shadow-sm bg-white border-bottom">
      {/* Top Main Header */}
      <div className="bg-primary-red py-2">
        <div className="container d-flex align-items-center justify-content-between gap-3">
          {/* Logo */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <div className="bg-white p-1 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
              <Laptop size={24} className="text-primary-red" />
            </div>
            <span className="text-white fw-bold fs-4 d-none d-md-block">LaptopShop</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="flex-grow-1 mx-lg-4 d-none d-sm-block" style={{ maxWidth: '600px' }}>
            <div className="position-relative">
              <input 
                type="text" 
                className="form-control border-0 py-2 ps-4 pe-5 rounded-pill shadow-sm" 
                placeholder="Bạn cần tìm laptop gì?"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button type="submit" className="btn position-absolute end-0 top-0 h-100 pe-3 text-muted">
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="d-flex align-items-center gap-2 gap-md-3">
            <Link to="/cart" className="text-white text-decoration-none position-relative p-2 rounded-circle hover-white-10">
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark border border-2 border-primary-red small" style={{ fontSize: '10px' }}>
                  {cartItems.length}
                </span>
              )}
            </Link>
            
            <div className="d-none d-sm-block">
              {user ? (
                <div className="dropdown">
                  <button className="btn btn-link text-white text-decoration-none p-2 d-flex align-items-center gap-2 dropdown-toggle-hide" data-bs-toggle="dropdown">
                    <div className="bg-white bg-opacity-20 p-2 rounded-circle d-flex align-items-center justify-content-center">
                      <User size={18} />
                    </div>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2 p-2 rounded-3">
                    <li className="px-3 py-2 border-bottom mb-2"><span className="small text-muted">Chào, </span><strong className="d-block">{user.fullname}</strong></li>
                    <li><Link className="dropdown-item rounded-2 py-2" to="/profile">Thông tin cá nhân</Link></li>
                    {user.role === 'admin' && <li><Link className="dropdown-item rounded-2 py-2" to="/admin">Trang quản trị</Link></li>}
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item text-danger rounded-2 py-2" onClick={logout}>Đăng xuất</button></li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" className="btn btn-outline-light border-0 py-2 px-3 rounded-pill d-flex align-items-center gap-2 fw-bold small">
                  <User size={18} /> Đăng nhập
                </Link>
              )}
            </div>

            {/* Mobile Toggle Trigger */}
            <button className="btn btn-link text-white p-1 d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar - Desktop */}
      <nav className="bg-white d-none d-lg-block border-top">
        <div className="container">
          <ul className="nav justify-content-center gap-4">
            {navLinks.map((link) => (
              <li key={link.path} className="nav-item">
                <Link to={link.path} className="nav-link text-dark fw-bold py-3 hover-red-bottom small text-uppercase">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Offcanvas Menu */}
      <div className="offcanvas offcanvas-end border-0 shadow-lg" tabIndex="-1" id="mobileMenu" style={{ width: '280px' }}>
        <div className="offcanvas-header bg-primary-red text-white py-3">
          <h5 className="offcanvas-title fw-bold">Menu LaptopShop</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0">
          <div className="p-3 border-bottom bg-light">
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary-red text-white p-2 rounded-circle"><User size={24} /></div>
                <div>
                  <div className="fw-bold">{user.fullname}</div>
                  <div className="small text-muted">{user.email}</div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary-red w-100 py-2 rounded-3 fw-bold" data-bs-dismiss="offcanvas">Đăng Nhập Ngay</Link>
            )}
          </div>
          
          <div className="list-group list-group-flush pt-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="list-group-item list-group-item-action py-3 px-4 border-0 fw-bold d-flex align-items-center justify-content-between"
                data-bs-dismiss="offcanvas"
              >
                {link.name}
                <X size={16} className="text-muted opacity-50" style={{ transform: 'rotate(45deg)' }} />
              </Link>
            ))}
            {user && (
              <>
                <div className="p-3 bg-light mt-2 small text-uppercase fw-bold text-muted">Tài khoản cá nhân</div>
                <Link to="/profile" className="list-group-item list-group-item-action py-3 px-4 border-0" data-bs-dismiss="offcanvas">Thông tin của tôi</Link>
                {user.role === 'admin' && <Link to="/admin" className="list-group-item list-group-item-action py-3 px-4 border-0 text-primary-red" data-bs-dismiss="offcanvas">Trang quản trị</Link>}
                <button className="list-group-item list-group-item-action py-3 px-4 border-0 text-danger" onClick={() => { logout(); }} data-bs-dismiss="offcanvas">Đăng xuất</button>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .hover-white-10:hover { background-color: rgba(255,255,255,0.1); }
        .hover-red-bottom {
          position: relative;
          transition: color 0.2s;
        }
        .hover-red-bottom:hover { color: var(--primary-red) !important; }
        .hover-red-bottom::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background: var(--primary-red);
          transition: all 0.3s;
          transform: translateX(-50%);
        }
        .hover-red-bottom:hover::after { width: 100%; }
        .dropdown-toggle-hide::after { display: none; }
      `}</style>
    </header>
  );
};

export default Header;
