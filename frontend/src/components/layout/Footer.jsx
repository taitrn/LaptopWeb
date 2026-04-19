import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand & Intro */}
          <div className="col-lg-4">
            <h4 className="fw-bold mb-3 text-primary-red">LaptopShop</h4>
            <p className="text-secondary small line-height-lg">
              Chuyên cung cấp các dòng Laptop Gaming, Văn phòng, Đồ họa chính hãng với giá tốt nhất thị trường. 
              Hệ thống bảo hành toàn quốc, hậu mãi tận tâm.
            </p>
            <div className="d-flex gap-3 mt-4 fs-5">
              <a href="#" className="text-white hover-primary-red"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white hover-primary-red"><i className="bi bi-youtube"></i></a>
              <a href="#" className="text-white hover-primary-red"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-white hover-primary-red"><i className="bi bi-github"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold mb-3">Thông Tin</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/about" className="text-secondary text-decoration-none hover-white">Giới thiệu</Link></li>
              <li><Link to="/pricing" className="text-secondary text-decoration-none hover-white">Bảng giá dịch vụ</Link></li>
              <li><Link to="/news" className="text-secondary text-decoration-none hover-white">Tin công nghệ</Link></li>
              <li><Link to="/faqs" className="text-secondary text-decoration-none hover-white">Hỏi đáp (FAQ)</Link></li>
            </ul>
          </div>

          {/* Policy */}
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold mb-3">Chính Sách</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/contact" className="text-secondary text-decoration-none hover-white">Liên hệ</Link></li>
              <li><a href="#" className="text-secondary text-decoration-none hover-white">Bảo hành - Đổi trả</a></li>
              <li><a href="#" className="text-secondary text-decoration-none hover-white">Vận chuyển - Giao nhận</a></li>
              <li><a href="#" className="text-secondary text-decoration-none hover-white">Bảo mật thông tin</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-lg-4">
            <h6 className="fw-bold mb-3">Liên Hệ Với Chúng Tôi</h6>
            <ul className="list-unstyled d-flex flex-column gap-3 small">
              <li className="d-flex align-items-center gap-3 text-secondary">
                <div className="bg-secondary bg-opacity-25 p-2 rounded-circle text-white">
                  <Phone size={16} />
                </div>
                <span>Hotline: <strong className="text-white">1800.6067</strong> (Miễn phí)</span>
              </li>
              <li className="d-flex align-items-center gap-3 text-secondary">
                <div className="bg-secondary bg-opacity-25 p-2 rounded-circle text-white">
                  <Mail size={16} />
                </div>
                <span>Email: <span className="text-white">support@laptopshop.vn</span></span>
              </li>
              <li className="d-flex align-items-center gap-3 text-secondary">
                <div className="bg-secondary bg-opacity-25 p-2 rounded-circle text-white">
                  <MapPin size={16} />
                </div>
                <span>Địa chỉ: 123 Đường Công Nghệ, Q.1, TP.HCM</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary opacity-25 my-4" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="text-secondary small mb-0">
              © {currentYear} LaptopShop. All rights reserved. Designed for Coursework.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <img src="https://lh3.googleusercontent.com/pw/AP1GczPrU_K0I-rZ5-t-hG-xK-N-xK-N-xK-N-xK" alt="Secure Payment" height="25" className="opacity-50 grayscale" />
          </div>
        </div>
      </div>

      <style>{`
        .hover-white:hover { color: white !important; }
        .hover-primary-red:hover { color: var(--primary-red) !important; }
        .line-height-lg { line-height: 1.8; }
        .grayscale { filter: grayscale(1); }
      `}</style>
    </footer>
  );
};

export default Footer;
