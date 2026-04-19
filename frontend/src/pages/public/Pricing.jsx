import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Tablet, Cpu, Battery, MousePointer2, RefreshCw } from 'lucide-react';

const Pricing = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    { id: 1, category: 'Nâng cấp', name: 'Nâng cấp RAM 8GB DDR4 3200MHz', price: '750.000đ', duration: '30 phút', icon: <Cpu className="text-primary-red" /> },
    { id: 2, category: 'Nâng cấp', name: 'Nâng cấp Ổ cứng SSD NVMe 512GB Gen4', price: '1.250.000đ', duration: '45 phút', icon: <Cpu className="text-primary-red" /> },
    { id: 3, category: 'Sửa chữa', name: 'Thay Pin Laptop Dell/HP/Asus (Chính hãng)', price: '950.000đ', duration: '60 phút', icon: <Battery className="text-primary-red" /> },
    { id: 4, category: 'Sửa chữa', name: 'Thay Màn hình Laptop 15.6 inch FHD IPS', price: '2.450.000đ', duration: '90 phút', icon: <Tablet className="text-primary-red" /> },
    { id: 5, category: 'Vệ sinh', name: 'Vệ sinh & Thay keo tản nhiệt (Gấu MX4)', price: '250.000đ', duration: '60 phút', icon: <MousePointer2 className="text-primary-red" /> },
    { id: 6, category: 'Dịch vụ', name: 'Cài đặt Windows 11 & Phần mềm cơ bản', price: '200.000đ', duration: '60 phút', icon: <RefreshCw className="text-primary-red" /> },
    { id: 7, category: 'Dịch vụ', name: 'Cứu dữ liệu ổ cứng (Tùy mức độ)', price: 'Từ 500.000đ', duration: '1-3 ngày', icon: <RefreshCw className="text-primary-red" /> },
  ];

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pricing-page container py-5">
      <div className="text-center mb-5" data-aos="fade-down">
        <h2 className="fw-bold mb-3">Bảng Giá Dịch Vụ Sửa Chữa & Nâng Cấp</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
          Chúng tôi cung cấp dịch vụ hậu mãi chuyên nghiệp với linh kiện chính hãng. 
          Bảng giá dưới đây đã bao gồm công thay thế.
        </p>
      </div>

      {/* Search Bar */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-6">
          <div className="position-relative shadow-sm rounded-pill overflow-hidden">
            <input 
              type="text" 
              className="form-control border-0 py-3 ps-4 pe-5" 
              placeholder="Tìm kiếm dịch vụ (ví dụ: Thay pin, RAM...)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="position-absolute end-0 top-0 h-100 d-flex align-items-center pe-4 text-muted pointer-none">
              <Search size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="card-premium overflow-hidden border-0" data-aos="fade-up">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-primary-red text-white">
              <tr>
                <th className="px-4 py-3 border-0">Dịch vụ</th>
                <th className="py-3 border-0">Phân loại</th>
                <th className="py-3 border-0">Thời gian chờ</th>
                <th className="py-3 border-0 text-end pe-4">Chi phí ước tính</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <tr key={service.id}>
                    <td className="px-4 py-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-light p-2 rounded-3">{service.icon}</div>
                        <span className="fw-bold">{service.name}</span>
                      </div>
                    </td>
                    <td><span className="badge bg-light text-dark border">{service.category}</span></td>
                    <td className="text-muted">{service.duration}</td>
                    <td className="text-end pe-4 fw-bold text-primary-red fs-5">{service.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-5 text-muted">Không tìm thấy dịch vụ tương ứng</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-warning bg-opacity-10 border border-warning rounded-4 p-4 mt-5 d-flex gap-3 align-items-start">
        <RefreshCw className="text-warning mt-1" />
        <div>
          <h6 className="fw-bold mb-1 text-warning-emphasis">Lưu ý cho khách hàng:</h6>
          <p className="small mb-0 text-secondary">
            Mức giá trên mang tính chất tham khảo cho các dòng laptop phổ thông. Với các dòng Gaming high-end hoặc MacBook, 
            chi phí linh kiện có thể thay đổi tùy thời điểm. Vui lòng liên hệ Hotline <Link to="/contact">1800.6067</Link> để nhận báo giá chính xác nhất qua Serial Number máy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
