import React from 'react';
import { Award, Users, Target, CheckCircle2 } from 'lucide-react';

// --- About Page ---
export const About = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5" data-aos="fade-down">
        <h2 className="fw-bold mb-3">Về LaptopShop</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
          Được thành lập từ niềm đam mê công nghệ, LaptopShop đã trở thành điểm đến tin cậy của hàng nghìn khách hàng khi tìm kiếm những giải pháp máy tính tối ưu nhất.
        </p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-6 col-lg-3" data-aos="zoom-in">
          <div className="card-premium h-100 p-4 text-center">
            <Users className="text-primary-red mb-3 mx-auto" size={40} />
            <h5 className="fw-bold">10,000+</h5>
            <p className="small text-muted mb-0">Khách hàng tin dùng mỗi năm</p>
          </div>
        </div>
        <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="100">
          <div className="card-premium h-100 p-4 text-center">
            <Award className="text-primary-red mb-3 mx-auto" size={40} />
            <h5 className="fw-bold">Top 10</h5>
            <p className="small text-muted mb-0">Nhà bán lẻ Laptop uy tín nhất</p>
          </div>
        </div>
        <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="200">
          <div className="card-premium h-100 p-4 text-center">
            <Target className="text-primary-red mb-3 mx-auto" size={40} />
            <h5 className="fw-bold">Cam Kết</h5>
            <p className="small text-muted mb-0">Hàng chính hãng, bảo hành tận tâm</p>
          </div>
        </div>
        <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="300">
          <div className="card-premium h-100 p-4 text-center">
            <CheckCircle2 className="text-primary-red mb-3 mx-auto" size={40} />
            <h5 className="fw-bold">Chất Lượng</h5>
            <p className="small text-muted mb-0">Kiểm định nghiêm ngặt trước khi bán</p>
          </div>
        </div>
      </div>

      <div className="row align-items-center g-5 mt-5">
        <div className="col-lg-6" data-aos="fade-right">
          <img src="https://lh3.googleusercontent.com/pw/AP1GczO_l8C7oU9U" alt="Store" className="img-fluid rounded-4 shadow-lg" />
        </div>
        <div className="col-lg-6" data-aos="fade-left">
          <h3 className="fw-bold mb-4">Sứ Mệnh Của Chúng Tôi</h3>
          <p className="text-secondary line-height-lg">
            Chúng tôi không chỉ bán Laptop, chúng tôi cung cấp "công cụ" để bạn chinh phục những đỉnh cao mới. Với đội ngũ Senior giàu kinh nghiệm, LaptopShop luôn sẵn sàng tư vấn cấu hình phù hợp nhất với nhu cầu và ngân sách của từng khách hàng.
          </p>
          <ul className="list-unstyled vstack gap-2 mt-4">
            <li className="d-flex align-items-center gap-2"><CheckCircle2 className="text-success" size={18} /> Miễn phí vệ sinh máy trọn đời</li>
            <li className="d-flex align-items-center gap-2"><CheckCircle2 className="text-success" size={18} /> Hỗ trợ trả góp 0% cực nhanh</li>
            <li className="d-flex align-items-center gap-2"><CheckCircle2 className="text-success" size={18} /> Giao hàng siêu tốc trong 2h</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- News Page ---
export const News = () => {
  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-5 border-start border-4 border-primary-red ps-3">Tin Công Nghệ</h2>
      <div className="row g-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="col-md-6 col-lg-4" data-aos="fade-up">
            <div className="card-premium h-100 overflow-hidden">
              <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:200/q:90/plain/https://s3.storage.seline.vn/cellphones/2024/04/tin-tuc-laptop-rog.jpg" alt="News" className="w-100" />
              <div className="p-4">
                <span className="badge bg-primary-red bg-opacity-10 text-primary-red mb-2">Đánh Giá</span>
                <h5 className="fw-bold mb-3 line-clamp-2">Đánh giá ROG Strix G16: Sức mạnh hủy diệt cho Game thủ năm 2026</h5>
                <p className="text-muted small mb-0">Cùng khám phá xem thế hệ chip xử lý mới nhất hoạt động ra sao trên dòng máy gaming hot nhất hiện nay...</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- FAQ Page ---
export const FAQ = () => {
  return (
    <div className="container py-5" style={{ maxWidth: '800px' }}>
      <h2 className="fw-bold text-center mb-5">Hỏi Đáp Thường Gặp</h2>
      <div className="accordion accordion-flush shadow-sm rounded-4 overflow-hidden border" id="faqAccordion">
        {[
          { q: 'Sản phẩm tại LaptopShop có chính hãng không?', a: 'Tất cả sản phẩm tại LaptopShop đều là hàng nhập khẩu chính hãng 100%, có hóa đơn VAT đầy đủ.' },
          { q: 'Tôi có được đổi trả nếu máy gặp lỗi không?', a: 'Có, chúng tôi áp dụng chính sách 1 đổi 1 trong vòng 30 ngày nếu phát hiện lỗi từ nhà sản xuất.' },
          { q: 'Shop có hỗ trợ trả góp không?', a: 'LaptopShop hỗ trợ trả góp 0% qua thẻ tín dụng và các công ty tài chính với thủ tục cực kỳ đơn giản.' },
          { q: 'Thời gian bảo hành là bao lâu?', a: 'Hầu hết các dòng Laptop được bảo hành từ 12-24 tháng chính hãng tại Việt Nam.' }
        ].map((item, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button className="accordion-button collapsed fw-bold py-4" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`}>
                {item.q}
              </button>
            </h2>
            <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body text-secondary py-4">
                {item.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
