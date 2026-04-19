import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ChevronRight, Cpu, Smartphone, ShieldCheck, Truck, Loader2 } from 'lucide-react';
import axiosClient from '../../services/axiosClient';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        // Lấy sản phẩm nổi bật (Featured) từ API
        const res = await axiosClient.get('/products?featured=1');
        if (res.success) {
          setFeaturedProducts(res.data.slice(0, 8)); // Lấy tối đa 8 cái tiêu biểu
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const banners = [
    { 
      id: 1, 
      img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/banner-sliding-rog-strix-g16-18.png', 
      title: 'ROG Strix G16/18 - Siêu Phẩm Gaming' 
    },
    { 
      id: 2, 
      img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/banner-sliding-lenovo-loq-2024.png', 
      title: 'Lenovo LOQ 2024 - Chiến Game Cực Đỉnh' 
    },
    { 
      id: 3, 
      img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/laptop-apple-macbook-sliding.png', 
      title: 'MacBook Air M3 - Mỏng Nhẹ, Quyền Năng' 
    }
  ];

  return (
    <div className="home-page pb-5">
      {/* Hero Banner Carousel */}
      <section className="container mt-4">
        <div className="row g-3">
          <div className="col-lg-8">
            <Swiper
              spaceBetween={10}
              centeredSlides={true}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="rounded-4 shadow-sm overflow-hidden"
              style={{ height: '300px' }}
            >
              {banners.map((banner) => (
                <SwiperSlide key={banner.id}>
                  <img src={banner.img} alt={banner.title} className="w-100 h-100 object-fit-cover" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="col-lg-4 d-none d-lg-flex flex-column gap-3">
            <div className="rounded-4 overflow-hidden shadow-sm flex-grow-1">
              <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/right-banner-hp-pavilion-14-15.png" alt="Side 1" className="w-100 h-100 object-fit-cover" />
            </div>
            <div className="rounded-4 overflow-hidden shadow-sm flex-grow-1">
              <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/right-banner-asus-vobook-go-14-15.png" alt="Side 2" className="w-100 h-100 object-fit-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-4 mt-5 border-top border-bottom">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-6 col-md-3" data-aos="fade-up">
              <ShieldCheck className="text-primary-red mb-2" size={32} />
              <h6 className="fw-bold mb-1">Chính Hãng 100%</h6>
              <p className="text-muted small mb-0">Hoàn tiền 200% nếu giả</p>
            </div>
            <div className="col-6 col-md-3" data-aos="fade-up" data-aos-delay="100">
              <Truck className="text-primary-red mb-2" size={32} />
              <h6 className="fw-bold mb-1">Giao Hàng Nhanh</h6>
              <p className="text-muted small mb-0">Miễn phí nội thành TP.HCM</p>
            </div>
            <div className="col-6 col-md-3" data-aos="fade-up" data-aos-delay="200">
              <Smartphone className="text-primary-red mb-2" size={32} />
              <h6 className="fw-bold mb-1">Đổi Trả 30 Ngày</h6>
              <p className="text-muted small mb-0">Lỗi là đổi mới lập tức</p>
            </div>
            <div className="col-6 col-md-3" data-aos="fade-up" data-aos-delay="300">
              <Cpu className="text-primary-red mb-2" size={32} />
              <h6 className="fw-bold mb-1">Hỗ Trợ Kỹ Thuật</h6>
              <p className="text-muted small mb-0">Đội ngũ Senior 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0 border-start border-4 border-primary-red ps-3">LAPTOP NỔI BẬT</h4>
          <Link to="/products" className="text-primary-red text-decoration-none small fw-bold">Xem tất cả <ChevronRight size={16}/></Link>
        </div>
        
        {loading ? (
          <div className="text-center py-5">
            <Loader2 className="animate-spin text-primary-red mx-auto mb-2" size={40} />
            <p className="text-muted">Đang tải sản phẩm nổi bật...</p>
          </div>
        ) : (
          <div className="row g-3">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col-6 col-md-4 col-lg-3" data-aos="zoom-in">
                <div className="card-premium h-100 p-3 d-flex flex-column shadow-hover position-relative">
                  <div className="text-center mb-3">
                    <img 
                      src={product.image_url || 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/t/gtx-g15-5530-banner.png'} 
                      alt={product.name} 
                      className="img-fluid" 
                      style={{ maxHeight: '160px', objectFit: 'contain' }} 
                    />
                  </div>
                  <h6 className="fw-bold mb-2 text-dark line-clamp-2" style={{ fontSize: '0.9rem' }}>{product.name}</h6>
                  <div className="mt-auto">
                    <div className="text-primary-red fw-bold fs-5">
                      {product.min_price ? `${Number(product.min_price).toLocaleString()}đ` : 'Liên hệ'}
                    </div>
                    <div className="text-muted text-decoration-line-through small">
                      {product.min_price ? `${(Number(product.min_price) * 1.1).toLocaleString()}đ` : ''}
                    </div>
                    <div className="bg-light p-2 mt-2 rounded-3 small text-secondary">
                      Bảo hành {product.warranty_months || 12} tháng chính hãng
                    </div>
                  </div>
                  {/* stretched-link giúp cả card đều có thể click được */}
                  <Link to={`/product/${product.slug}`} className="stretched-link"></Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        .shadow-hover:hover {
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
          transform: translateY(-5px);
          transition: all 0.3s ease;
        }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Home;
