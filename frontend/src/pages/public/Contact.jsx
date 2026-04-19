import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-lg-5" data-aos="fade-right">
          <h2 className="fw-bold mb-4 text-primary-red">Liên Hệ Với Chúng Tôi</h2>
          <p className="text-muted mb-5">
            Bạn cần tư vấn cấu hình hay có thắc mắc về đơn hàng? 
            Hãy để lại thông tin, đội ngũ kỹ thuật của chúng tôi sẽ phản hồi sớm nhất.
          </p>
          
          <div className="vstack gap-4">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary-red bg-opacity-10 p-3 rounded-circle text-primary-red">
                <Phone size={24} />
              </div>
              <div>
                <div className="fw-bold">Hotline 24/7</div>
                <div className="text-muted">1800.6067 (Miễn phí)</div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary-red bg-opacity-10 p-3 rounded-circle text-primary-red">
                <Mail size={24} />
              </div>
              <div>
                <div className="fw-bold">Email Hỗ Trợ</div>
                <div className="text-muted">support@laptopshop.vn</div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary-red bg-opacity-10 p-3 rounded-circle text-primary-red">
                <MapPin size={24} />
              </div>
              <div>
                <div className="fw-bold">Địa Chỉ</div>
                <div className="text-muted">123 Đường Công Nghệ, Quận 1, TP.HCM</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7" data-aos="fade-left">
          <div className="card-premium p-5 border-0 rounded-4">
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Họ và Tên</label>
                <input type="text" className="form-control bg-light border-0 py-2" placeholder="Nhập họ tên" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Email</label>
                <input type="email" className="form-control bg-light border-0 py-2" placeholder="email@example.com" />
              </div>
              <div className="col-12">
                <label className="form-label fw-bold">Số điện thoại</label>
                <input type="text" className="form-control bg-light border-0 py-2" placeholder="Nhập SĐT" />
              </div>
              <div className="col-12">
                <label className="form-label fw-bold">Nội dung liên hệ</label>
                <textarea className="form-control bg-light border-0 py-2" rows="5" placeholder="Để lại lời nhắn cho chúng tôi..."></textarea>
              </div>
              <div className="col-12 mt-4 text-end">
                <button type="button" className="btn btn-primary-red px-5 py-3 d-inline-flex align-items-center gap-2">
                  <Send size={20} /> Gửi tin nhắn
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
