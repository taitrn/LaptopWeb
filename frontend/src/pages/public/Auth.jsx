import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import axiosClient from '../../services/axiosClient';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await axiosClient.post('/auth/login', {
          email: formData.email,
          password: formData.password
        });
        if (res.success) {
          login(res.data.user, res.data.token);
          // Redirect based on role
          if (res.data.user.role === 'admin') {
            navigate('/admin');
          } else {
            // Send back to where they came from or home
            const from = location.state?.from?.pathname || '/';
            navigate(from);
          }
        }
      } else {
        if (formData.password !== formData.password_confirmation) {
          throw new Error('Mật khẩu xác nhận không khớp');
        }
        const res = await axiosClient.post('/auth/register', formData);
        if (res.success) {
          alert('Đăng ký thành công! Vui lòng đăng nhập.');
          setIsLogin(true);
        }
      }
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-5">
          <div className="card-premium p-4 p-md-5 border-0 rounded-4 fade-in-up">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-primary-red mb-2">{isLogin ? 'Đăng Nhập' : 'Đăng Ký'}</h2>
              <p className="text-muted">
                {isLogin ? 'Chào mừng bạn quay lại với LaptopShop' : 'Tạo tài khoản để nhận nhiều ưu đãi'}
              </p>
            </div>

            {error && <div className="alert alert-danger small py-2">{error}</div>}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-3 position-relative">
                  <div className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                    <User size={20} />
                  </div>
                  <input 
                    type="text" 
                    className="form-control bg-light border-0 py-3 ps-5" 
                    placeholder="Họ và tên" 
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="mb-3 position-relative">
                <div className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  className="form-control bg-light border-0 py-3 ps-5" 
                  placeholder="Địa chỉ Email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 position-relative">
                <div className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  className="form-control bg-light border-0 py-3 ps-5" 
                  placeholder="Mật khẩu" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {!isLogin && (
                <div className="mb-4 position-relative">
                  <div className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                    <Lock size={20} />
                  </div>
                  <input 
                    type="password" 
                    className="form-control bg-light border-0 py-3 ps-5" 
                    placeholder="Xác nhận mật khẩu" 
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                </div>
              )}

              {isLogin && (
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="remember" />
                    <label className="form-check-label small text-muted" htmlFor="remember">Nhớ mật khẩu</label>
                  </div>
                  <a href="#" className="small text-primary-red text-decoration-none">Quên mật khẩu?</a>
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary-red w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 mb-3"
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : (
                  <>
                    {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                    {isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ TÀI KHOẢN'}
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <span className="text-muted small">
                {isLogin ? 'Bạn chưa có tài khoản?' : 'Đã có tài khoản?'}
              </span>
              <button 
                className="btn btn-link text-primary-red text-decoration-none fw-bold p-0 ms-2"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
              >
                {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
