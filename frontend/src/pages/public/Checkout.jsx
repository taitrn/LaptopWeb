import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, MapPin, CreditCard, ShoppingBag, CheckCircle } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import axiosClient from '../../services/axiosClient';

const Checkout = () => {
  const { cartItems, getCartTotal, refreshCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // If entirely empty cart and not success state
  if (cartItems.length === 0 && !orderSuccess) {
    return <Navigate to="/cart" replace />;
  }

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!shippingAddress.trim()) {
      alert('Vui lòng nhập địa chỉ giao hàng');
      return;
    }

    if (!user) {
      alert('Vui lòng Đăng Nhập để tiến hành thanh toán.');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      // Execute Zero-Trust checkout. Notice we send 'total_amount' just to test the backend, 
      // but we know the backend will securely recalculate it based on DB variants.
      const payload = {
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
        total_amount: getCartTotal()
      };

      const res = await axiosClient.post('/orders/checkout', payload);
      
      if (res.success) {
        setOrderSuccess(res.data);
        refreshCart(); // Clear local cart via API sync
      }
    } catch (error) {
      alert(error.message || 'Thanh toán thất bại, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="container py-5 text-center fade-in-up">
        <div className="mb-4">
          <CheckCircle size={80} className="text-success mx-auto" />
        </div>
        <h2 className="fw-bold mb-3">Đặt Hàng Thành Công!</h2>
        <p className="text-muted mb-4 text-center mx-auto" style={{ maxWidth: '500px' }}>
          Cảm ơn bạn đã tin tưởng mua sắm tại LaptopShop. Mã đơn hàng của bạn là <strong className="text-primary-red">{orderSuccess.order_code}</strong>.
          <br/>
          Tổng giá trị đơn hàng được chốt trên hệ thống là: <strong className="fs-5">{Number(orderSuccess.total).toLocaleString()}đ</strong>
        </p>
        <Link to="/products" className="btn btn-outline-danger px-4 py-2 rounded-pill fw-bold">
          <ArrowRight className="me-2" size={20} />Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Thanh Toán</h3>
      
      <div className="row g-4">
        {/* Checkout Form */}
        <div className="col-lg-7">
          <form className="card-premium p-4 border-0 mb-4" onSubmit={handleCheckout}>
            <h5 className="fw-bold mb-4 border-bottom pb-3"><MapPin size={20} className="text-primary-red me-2"/>Thông tin giao hàng</h5>
            
            <div className="mb-3">
              <label className="form-label fw-bold small">Họ và người nhận</label>
              <input type="text" className="form-control bg-light border-0 py-2" value={user?.fullname || ''} readOnly />
              {!user && <small className="text-danger mt-1 d-block">Bạn đang mua hàng với tư cách Khách. Vui lòng đăng nhập trước khi chốt đơn.</small>}
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold small">Địa chỉ nhận hàng chi tiết</label>
              <textarea 
                className="form-control bg-light border-0 py-2" 
                rows="3" 
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                required
              ></textarea>
            </div>

            <h5 className="fw-bold mb-4 border-bottom pb-3 mt-5"><CreditCard size={20} className="text-primary-red me-2"/>Phương thức thanh toán</h5>
            
            <div className="form-check p-3 border rounded-3 mb-2 bg-light">
              <input 
                className="form-check-input ms-1" 
                type="radio" 
                name="paymentMethod" 
                id="cod" 
                checked={paymentMethod === 'cod'} 
                onChange={() => setPaymentMethod('cod')}
              />
              <label className="form-check-label fw-bold ms-3" htmlFor="cod">
                Thanh toán khi nhận hàng (COD)
              </label>
            </div>
            
            <div className="form-check p-3 border rounded-3 opacity-50">
              <input className="form-check-input ms-1" type="radio" name="paymentMethod" id="banking" disabled />
              <label className="form-check-label fw-bold ms-3" htmlFor="banking">
                Chuyển khoản ngân hàng (Đang bảo trì)
              </label>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="col-lg-5">
          <div className="card-premium p-4 border-0 position-sticky" style={{ top: '100px' }}>
            <h5 className="fw-bold mb-4 border-bottom pb-3"><ShoppingBag size={20} className="text-primary-red me-2"/>Đơn hàng ({cartItems.length} sản phẩm)</h5>
            
            <div className="v-stack gap-3 mb-4 max-vh-50 overflow-auto pe-2">
              {cartItems.map((item, idx) => (
                <div key={idx} className="d-flex gap-3 mb-3">
                  <div className="border rounded px-2 bg-white d-flex align-items-center" style={{ width: '60px', height: '60px' }}>
                    <img src={item.image_url} alt="" className="img-fluid object-fit-contain" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-bold small line-clamp-2">{item.product_name}</div>
                    <div className="d-flex justify-content-between mt-1">
                      <small className="text-muted">SL: {item.quantity}</small>
                      <strong className="text-primary-red">{Number(item.price).toLocaleString()}đ</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-secondary opacity-25" />

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Tạm tính:</span>
              <span className="fw-bold">{getCartTotal().toLocaleString()}đ</span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span className="text-muted">Phí giao hàng:</span>
              <span className="fw-bold text-success">0đ</span>
            </div>
            
            <div className="d-flex justify-content-between mb-4 bg-light p-3 rounded-3">
              <span className="fw-bold fs-5">Tổng cộng:</span>
              <span className="fw-bold fs-4 text-primary-red">{getCartTotal().toLocaleString()}đ</span>
            </div>

            <button 
              className="btn btn-primary-red w-100 py-3 fw-bold fs-5 d-flex align-items-center justify-content-center gap-2"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'ĐANG XỬ LÝ...' : 'ĐẶT HÀNG NGAY'}
              {!loading && <ShieldCheck size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
