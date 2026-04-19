import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Filter, Grid, List as ListIcon, ChevronDown, SlidersHorizontal, Loader2 } from 'lucide-react';
import axiosClient from '../../services/axiosClient';

const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(100000000); 

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search') || '';
    setSearchQuery(q);
    fetchProducts(q);
  }, [location.search]);

  const fetchProducts = async (q = '') => {
    setLoading(true);
    try {
      // Gọi API lấy sản phẩm thực tế từ Database
      const res = await axiosClient.get(`/products?search=${q}`);
      if (res.success) {
        setProducts(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row g-4 align-items-start">
        {/* Sidebar Filters */}
        <aside className="col-lg-3 d-none d-lg-block">
          <div className="card-premium p-4 sticky-top" style={{ top: '100px', zIndex: 10 }}>
            <div className="d-flex align-items-center gap-2 mb-4">
              <SlidersHorizontal size={20} className="text-primary-red" />
              <h5 className="fw-bold mb-0">Bộ lọc tìm kiếm</h5>
            </div>

            <div className="mb-4">
              <h6 className="fw-bold mb-3 small text-uppercase text-muted">Thương Hiệu</h6>
              {['Apple', 'Asus', 'HP', 'Lenovo', 'MSI', 'Acer', 'Dell'].map(brand => (
                <div key={brand} className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id={`brand-${brand}`} />
                  <label className="form-check-label small" htmlFor={`brand-${brand}`}>{brand}</label>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <h6 className="fw-bold mb-3 small text-uppercase text-muted">Khoảng Giá (VNĐ)</h6>
              <input 
                type="range" 
                className="form-range custom-range" 
                min="0" 
                max="100000000" 
                step="5000000"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              <div className="d-flex justify-content-between small text-muted mt-2">
                <span>0đ</span>
                <span className="fw-bold text-primary-red">Dưới {Number(priceRange).toLocaleString()}đ</span>
              </div>
            </div>

            <button className="btn btn-primary-red w-100 py-2 rounded-3 fw-bold">Áp dụng lọc</button>
          </div>
        </aside>

        {/* Product Listing */}
        <main className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded-4 shadow-sm">
            <h6 className="mb-0 fw-bold">
              {searchQuery ? `Kết quả cho: "${searchQuery}"` : 'Tất cả sản phẩm'} 
              <span className="text-muted fw-normal ms-2 small">({products.length} sản phẩm)</span>
            </h6>
            <div className="d-flex gap-2">
              <button className="btn btn-light btn-sm rounded-3 px-3 border py-2">Mới nhất <ChevronDown size={14}/></button>
              <div className="btn-group rounded-3 overflow-hidden border">
                <button className="btn btn-white btn-sm px-2 border-end active text-primary-red"><Grid size={18}/></button>
                <button className="btn btn-white btn-sm px-2"><ListIcon size={18}/></button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Loader2 className="animate-spin text-primary-red mx-auto mb-2" size={40} />
              <p className="text-muted">Đang tải danh sách sản phẩm...</p>
            </div>
          ) : (
            <>
              <div className="row g-3">
                {products.length > 0 ? products.map((product) => (
                  <div key={product.id} className="col-6 col-md-4" data-aos="fade-up">
                    <div className="card-premium h-100 p-3 position-relative d-flex flex-column border-0 shadow-hover">
                      <div className="text-center mb-3">
                        <img 
                          src={product.image_url || 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/t/gtx-g15-5530-banner.png'} 
                          alt={product.name} 
                          className="img-fluid transition-transform" 
                          style={{ maxHeight: '160px', objectFit: 'contain' }} 
                        />
                      </div>
                      <div className="badge bg-danger position-absolute top-0 start-0 m-3 small px-2 py-1">HOT</div>
                      <h6 className="fw-bold mb-2 text-dark line-clamp-2" style={{ fontSize: '0.95rem' }}>{product.name}</h6>
                      <div className="mt-auto">
                        <div className="text-primary-red fw-bold fs-5 mb-0">
                          {product.min_price ? `${Number(product.min_price).toLocaleString()}đ` : 'Liên hệ'}
                        </div>
                        <div className="text-muted text-decoration-line-through small mb-3">
                          {product.min_price ? `${(Number(product.min_price) * 1.1).toLocaleString()}đ` : ''}
                        </div>
                        <Link 
                          to={`/product/${product.slug}`} 
                          className="btn btn-outline-danger w-100 btn-sm rounded-3 fw-bold py-2"
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-12 text-center py-5">
                    <p className="text-muted fs-5">Không tìm thấy sản phẩm nào phù hợp.</p>
                  </div>
                )}
              </div>

              {/* Pagination if applicable */}
              {products.length > 20 && (
                <nav className="mt-5">
                  <ul className="pagination justify-content-center gap-2">
                    <li className="page-item active"><button className="page-link rounded-circle border-0 bg-primary-red text-white">1</button></li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </main>
      </div>

      <style>{`
        .shadow-hover:hover {
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
          transform: translateY(-5px);
          transition: all 0.3s ease;
        }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .transition-transform:hover { transform: scale(1.05); }
        .custom-range::-webkit-slider-thumb { background: var(--primary-red); }
        .custom-range::-moz-range-thumb { background: var(--primary-red); }
      `}</style>
    </div>
  );
};

export default Products;
