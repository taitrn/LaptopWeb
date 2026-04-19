import React from 'react';
import { Edit, Trash2, Plus, Lock, Unlock, Eye } from 'lucide-react';

// --- Admin Orders ---
export const AdminOrders = () => (
  <div className="card-premium p-4 border-0">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h5 className="fw-bold mb-0">Quản lý Đơn hàng</h5>
      <input type="text" className="form-control w-auto" placeholder="Tìm mã đơn..." />
    </div>
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Mã Đơn</th>
            <th>Khách Hàng</th>
            <th>Ngày Đặt</th>
            <th>Tổng Tiền</th>
            <th>Trạng Thái</th>
            <th className="text-end">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span className="fw-bold">ORD-2026-001</span></td>
            <td>Nguyễn Văn A</td>
            <td>19/04/2026</td>
            <td className="text-primary-red fw-bold">25.990.000đ</td>
            <td><span className="badge bg-warning text-dark">Chờ Xử Lý</span></td>
            <td className="text-end">
              <button className="btn btn-sm btn-light text-primary"><Eye size={18} /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// --- Admin Products ---
export const AdminProducts = () => (
  <div className="card-premium p-4 border-0">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h5 className="fw-bold mb-0">Quản lý Sản phẩm</h5>
      <button className="btn btn-primary-red d-flex align-items-center gap-2">
        <Plus size={18} /> Thêm Sản Phẩm Mới
      </button>
    </div>
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Hình Ảnh</th>
            <th>Tên Sản Phẩm</th>
            <th>Hãng</th>
            <th>Giá Gốc</th>
            <th>Kho</th>
            <th className="text-end">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#1</td>
            <td><div className="bg-light rounded p-1" style={{width: '50px'}}><img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/t/gtx-g15-5530-banner.png" className="w-100" alt=""/></div></td>
            <td className="fw-bold">Laptop ASUS ROG Strix G16</td>
            <td>ASUS</td>
            <td>29.990.000đ</td>
            <td><span className="badge bg-success">Còn hàng (15)</span></td>
            <td className="text-end">
              <button className="btn btn-sm btn-light text-primary me-2"><Edit size={16} /></button>
              <button className="btn btn-sm btn-light text-danger"><Trash2 size={16} /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    {/* Pagination */}
    <nav className="mt-4">
      <ul className="pagination justify-content-end mb-0">
        <li className="page-item disabled"><button className="page-link">Trước</button></li>
        <li className="page-item active" style={{'--bs-pagination-active-bg': '#D70018', '--bs-pagination-active-border-color': '#D70018'}}><button className="page-link">1</button></li>
        <li className="page-item"><button className="page-link">Sau</button></li>
      </ul>
    </nav>
  </div>
);

// --- Admin Users ---
export const AdminUsers = () => (
  <div className="card-premium p-4 border-0">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h5 className="fw-bold mb-0">Quản lý Thành viên</h5>
      <input type="text" className="form-control w-auto" placeholder="Tìm theo email..." />
    </div>
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Quyền</th>
            <th>Trạng Thái</th>
            <th className="text-end">Khóa/Mở</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#1</td>
            <td className="fw-bold">Super Admin</td>
            <td>admin@laptopshop.vn</td>
            <td><span className="badge bg-danger">Admin</span></td>
            <td><span className="badge bg-success">Hoạt động</span></td>
            <td className="text-end">
              <button className="btn btn-sm btn-light text-warning" disabled><Lock size={16} /></button>
            </td>
          </tr>
          <tr>
            <td>#2</td>
            <td className="fw-bold">Khách Hàng Cuối</td>
            <td>user@gmail.com</td>
            <td><span className="badge bg-secondary">Member</span></td>
            <td><span className="badge bg-success">Hoạt động</span></td>
            <td className="text-end">
              <button className="btn btn-sm btn-light text-warning"><Lock size={16} /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
