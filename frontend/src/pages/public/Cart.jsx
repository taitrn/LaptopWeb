import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const Cart = () => {
  const { cartItems, getCartTotal, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="mb-4">
          <ShoppingBag size={80} className="text-muted opacity-50" />
        </div>
        <h3 className="fw-bold mb-3">Giỏ hàng của bạn đang trống</h3>
        <p className="text-muted mb-4">Hãy chọn thêm sản phẩm để mua sắm nhé!</p>
        <Link to="/products" className="btn btn-primary-red px-4 py-2 rounded-pill fw-bold">
          <ArrowRight className="me-2" size={20} />Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4 d-flex align-items-center gap-2">
        <ShoppingBag className="text-primary-red" /> Giỏ Hàng Của Bạn
      </h3>
      
      <div className="row g-4">
        {/* Cart Items List */}
        <div className="col-lg-8">
          <div className="card-premium p-0 border-0 overflow-hidden">
            <div className="list-group list-group-flush">
              {cartItems.map((item, index) => (
                <div key={index} className="list-group-item p-4 d-flex gap-4 align-items-center">
                  <div style={{ width: '100px', height: '100px' }} className="flex-shrink-0 bg-light rounded-3 d-flex align-items-center justify-content-center p-2">
                    <img src={item.image_url || 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/t/gtx-g15-5530-banner.png'} alt="Product" className="img-fluid object-fit-contain" />
                  </div>
                  
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1">{item.product_name}</h6>
                    <div className="text-primary-red fw-bold">{Number(item.price).toLocaleString()}đ</div>
                    
                    <div className="d-flex align-items-center mt-3 gap-3">
                      <div className="input-group input-group-sm" style={{ width: '120px' }}>
                        <button className="btn btn-outline-secondary px-3" type="button">-</button>
                        <input type="text" className="form-control text-center text-dark bg-white" value={item.quantity} readOnly />
                        <button className="btn btn-outline-secondary px-3" type="button">+</button>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="btn btn-light text-danger p-2 rounded-circle hover-bg-danger hover-text-white transition"
                    onClick={() => removeFromCart(item.variant_id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card-premium p-4 border-0 position-sticky" style={{ top: '100px' }}>
            <h5 className="fw-bold mb-4">Tổng Giỏ Hàng</h5>
            
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Tạm tính ({cartItems.length} sản phẩm):</span>
              <span className="fw-bold">{getCartTotal().toLocaleString()}đ</span>
            </div>
            <div className="d-flex justify-content-between mb-3 border-bottom pb-4">
              <span className="text-muted">Phí ship:</span>
              <span className="fw-bold text-success">Miễn phí</span>
            </div>
            
            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold fs-5">Tổng tiền:</span>
              <span className="fw-bold fs-5 text-primary-red">{getCartTotal().toLocaleString()}đ</span>
            </div>

            <button 
              className="btn btn-primary-red w-100 py-3 fw-bold fs-5 mb-3"
              onClick={() => navigate('/checkout')}
            >
              TIẾN HÀNH ĐẶT HÀNG
            </button>
            <p className="small text-muted text-center mb-0">Bạn có thể chọn phương thức thanh toán ở bước tiếp theo.</p>
          </div>
        </div>
      </div>
      
      <style>{`
        .hover-bg-danger:hover { background-color: #dc3545 !important; }
        .hover-text-white:hover { color: white !important; }
      `}</style>
    </div>
  );
};

export default Cart;
