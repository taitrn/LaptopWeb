import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ShieldCheck, Truck, RotateCcw, Loader2, AlertCircle } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import axiosClient from '../../services/axiosClient';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(`/products/${slug}`);
        if (res.success) {
          setProduct(res.data);
          if (res.data.variants && res.data.variants.length > 0) {
            setSelectedVariant(res.data.variants[0]);
          }
        } else {
          setError('Không tìm thấy sản phẩm');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi tải thông tin sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [slug]);

  if (loading) return (
    <div className="container py-5 text-center">
      <Loader2 className="animate-spin text-primary-red mx-auto mb-3" size={50} />
      <p className="text-muted">Đang tải cấu hình chi tiết...</p>
    </div>
  );

  if (error || !product) return (
    <div className="container py-5 text-center">
      <AlertCircle className="text-danger mx-auto mb-3" size={50} />
      <h3 className="fw-bold">{error || 'Sản phẩm không tồn tại'}</h3>
      <button className="btn btn-primary-red mt-3" onClick={() => navigate('/products')}>Quay lại cửa hàng</button>
    </div>
  );

  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart({
        ...product,
        variant_id: selectedVariant.id,
        price: selectedVariant.base_price,
        quantity: quantity,
        ram: selectedVariant.ram,
        storage: selectedVariant.storage,
        color: selectedVariant.color
      });
      alert('Đã thêm sản phẩm vào giỏ hàng!');
    }
  };

  return (
    <div className="container py-4 fade-in-up">
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card-premium p-4 text-center border-0 mb-3">
            <img 
              src={product.image_url || 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/t/gtx-g15-5530-banner.png'} 
              alt={product.name} 
              className="img-fluid object-fit-contain" 
              style={{ maxHeight: '400px' }} 
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="product-info shadow-sm bg-white p-4 rounded-4 h-100 border">
            <h2 className="fw-bold mb-3">{product.name}</h2>
            
            <div className="d-flex align-items-center gap-3 mb-4">
              <span className="fs-2 fw-bold text-primary-red">
                {selectedVariant ? `${Number(selectedVariant.base_price).toLocaleString()}đ` : '---đ'}
              </span>
              <span className="text-muted text-decoration-line-through mt-2">
                {selectedVariant ? `${(Number(selectedVariant.base_price) * 1.1).toLocaleString()}đ` : ''}
              </span>
            </div>

            <div className="mb-4">
              <h6 className="fw-bold mb-3 small text-muted text-uppercase">Chọn cấu hình:</h6>
              <div className="d-flex flex-wrap gap-2">
                {product.variants?.map((v) => (
                  <button 
                    key={v.id}
                    className={`btn border-2 py-2 px-3 rounded-3 text-start transition ${selectedVariant?.id === v.id ? 'border-primary-red bg-primary-red bg-opacity-10' : 'btn-light border-light'}`}
                    onClick={() => setSelectedVariant(v)}
                    style={{ minWidth: '130px' }}
                  >
                    <div className="small fw-bold">{v.ram} - {v.storage}</div>
                    <div className="text-primary-red fw-bold small">{Number(v.base_price).toLocaleString()}đ</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-12">
                <div className="d-flex align-items-center gap-3 bg-light p-3 rounded-3">
                  <div className="text-center">
                    <Truck className="text-primary-red mb-1" size={20}/>
                    <div style={{ fontSize: '10px' }}>Giao hàng</div>
                  </div>
                  <div className="text-center border-start ps-3">
                    <ShieldCheck className="text-primary-red mb-1" size={20}/>
                    <div style={{ fontSize: '10px' }}>Bảo hành 12th</div>
                  </div>
                  <div className="text-center border-start ps-3">
                    <RotateCcw className="text-primary-red mb-1" size={20}/>
                    <div style={{ fontSize: '10px' }}>Đổi trả 30n</div>
                  </div>
                  <div className="ms-auto fw-bold text-success small"> CÒN HÀNG </div>
                </div>
              </div>
            </div>

            <div className="d-flex gap-3 mt-auto">
              <div className="input-group" style={{ width: '120px' }}>
                <button className="btn btn-outline-secondary" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <input type="text" className="form-control text-center bg-white" value={quantity} readOnly />
                <button className="btn btn-outline-secondary" onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
              <button 
                className="btn btn-primary-red flex-grow-1 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-3 shadow-sm"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} /> THÊM VÀO GIỎ HÀNG
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5 g-4 mb-5">
        <div className="col-lg-8">
          <div className="card-premium p-4 border-0 shadow-sm">
            <h5 className="fw-bold mb-4 border-bottom pb-3 text-uppercase">Đặc điểm nổi bật</h5>
            <div className="product-description" dangerouslySetInnerHTML={{ __html: product.short_description || '<p className="text-muted italic">Thông tin đang cập nhật...</p>' }}>
            </div>
            <hr className="my-4"/>
            <p>Sản phẩm <strong>{product.name}</strong> hiện đang là mẫu laptop được giới công nghệ săn đón nhất năm 2024. LaptopShop cam kết cung cấp hàng chính hãng, nguyên seal, bảo hành 12 tháng tại các trung tâm bảo hành ủy quyền của {product.brand_name}.</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card-premium p-4 border-0 shadow-sm sticky-top" style={{ top: '100px' }}>
            <h5 className="fw-bold mb-4 border-bottom pb-3 text-uppercase">Thông số kỹ thuật</h5>
            <div className="table-responsive">
              <table className="table table-sm mb-0 small">
                <tbody>
                  <tr><th className="py-2 text-muted">Thương hiệu</th><td className="fw-bold">{product.brand_name}</td></tr>
                  <tr><th className="py-2 text-muted">Dòng máy</th><td>{product.category_name}</td></tr>
                  <tr><th className="py-2 text-muted">RAM tối thiểu</th><td>{selectedVariant?.ram || 'Theo option'}</td></tr>
                  <tr><th className="py-2 text-muted">Lưu trữ</th><td>{selectedVariant?.storage || 'Theo option'}</td></tr>
                  <tr><th className="py-2 text-muted">Màu sắc</th><td>{selectedVariant?.color || 'Đa dạng'}</td></tr>
                  <tr><th className="py-2 text-muted">Tình trạng</th><td className="text-success fw-bold">Mới 100%</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .product-description p { line-height: 1.6; color: #444; }
        .transition { transition: all 0.2s ease; }
      `}</style>
    </div>
  );
};

export default ProductDetail;
