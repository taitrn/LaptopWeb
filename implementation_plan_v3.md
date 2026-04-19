# Kế Hoạch Triển Khai Frontend Toàn Diện V3 (Final Blueprint) - LaptopShop

Đây là bản kế hoạch tổng thể cuối cùng (V3), được đúc kết từ phiên bản 1 & 2 và đã giải quyết triệt để các rào cản về Trải nghiệm người dùng (UX), Tối ưu công cụ tìm kiếm (SEO) và Thẩm mỹ thiết kế (Cosmetic) theo phản hồi của bạn.

## Ý Kiến Của AI (Về vấn đề cấu hình SEO & Bundle Size)
> **Về SEO trên CSR (Client-Side Rendering)**: Phân tích của bạn hoàn toàn chính xác. Trình chấm điểm tự động hoặc trình duyệt khi View Source React thông thường sẽ chỉ thấy thẻ `<div id="root"></div>`. Để giải quyết triệt để mà không vi phạm quy tắc "Không dùng Framework (Next.js/Remix)", tôi sẽ tích hợp plugin **`vite-plugin-prerender`** (hoặc prerender-spa-plugin) vào tiến trình Build của Vite. Khi chạy `npm run build`, Vite sẽ tự động giả lập trình duyệt, render các Route tính (như `/`, `/about`, `/pricing`, `/news`) ra thành các file `.html` thật, chứa đầy đủ thẻ `<title>`, `<meta>` và content bên trong. Điều này đảm bảo 100% điểm SEO khi chấm bài.
>
> **Về Hoạt ảnh (Animations)**: `Framer Motion` thực sự rất nặng (~30-40kb gzipped). Vì chúng ta dùng Bootstrap 5, tôi đề xuất ưu tiên dùng **CSS Transitions thuần** và thư viện siêu nhẹ **AOS (Animate On Scroll)** (chỉ <3KB) để xử lý các hiệu ứng fade-in khi cuộn trang thay vì Framer Motion. Nếu buộc phải dùng tính năng quá phức tạp, tôi mới dùng `React.lazy` và `Suspense` để bọc chúng lại.

---

## I. Cơ Sở Hạ Tầng & Quy Định Thiết Kế (Infrastructure & UI Rules)

### 1. Hệ thống Style (Design System)
Thiết lập file `src/assets/styles/index.css` làm "trái tim" của giao diện, tránh tình trạng "phèn" khi lạm dụng Bootstrap thuần:
```css
:root {
  --primary-red: #D70018; /* Màu chuẩn CellphoneS */
  --bg-color: #f3f4f6; /* Xám nhạt nâng khối container */
  --text-main: #333333;
  --text-muted: #777777;
  --border-color: #e5e7eb;
}
```
Các component sẽ ưu tiên kết hợp layout của Bootstrap (container, row, col, d-flex) và màu sắc từ biến CSS (CSS Variables) này.

### 2. Tối Ưu Hóa Trải Nghiệm (UX & Performance)
- **Frictionless Cart (Giỏ Hàng Không Ma Sát)**: 
  - Khách chưa đăng nhập (Guest): Thêm sản phẩm mượt mà, lưu tại `localStorage`.
  - Khách đăng nhập (User): Frontend bốc toàn bộ `localStorage` gửi lên API `/api/cart/sync` để gộp vào Database. Xóa localStorage sau khi Sync thành công.
- **Tiêu chuẩn W3C (Semantic HTML)**: Cố gắng sử dụng các semantic tags `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`. Nếu gặp lỗi lặt vặt (hạt sạn) từ W3C do Bootstrap hoặc thư viện cũ sinh ra, chúng ta sẽ bỏ qua để tiết kiệm thời gian, tập trung vào tính năng lõi.
- **Lazy Loading**: `react-lazy-load-image-component` cho toàn bộ ảnh sản phẩm.

---

## II. Bản Đồ Routing & Tính Năng Public (Dành cho Khách & Thành Viên)

Trọng tâm thiết kế: Layout theo chuẩn e-commerce, UX thao tác một tay tốt trên Mobile.

| Trang (Route) | Chức Năng Chính & Yêu Cầu Đặc Tả |
| :--- | :--- |
| **Trang Chủ** (`/`) | Carousel Banner lớn (SwiperJS). Danh mục sản phẩm nổi bật (Laptop Gaming, Văn Phòng...). Khối hiển thị ưu đãi. (Được Prerender HTML tĩnh). |
| **Giới Thiệu** (`/about`) | Lịch sử công ty, cam kết chính hãng. Nội dung kéo từ backend settings. (Prerender HTML tĩnh). |
| **Sản Phẩm** (`/products`) | Grid hiển thị danh sách sản phẩm. Thanh tìm kiếm (debounce search) và bộ lọc (lọc theo Hãng, lọc theo khoảng Giá). |
| **Chi Tiết** (`/product/:slug`) | Ảnh lớn, giá gốc mờ/giá giảm đỏ. Cho chọn cấu hình (Variants). Component "Bình luận & Đánh giá" (Chặn XSS, yêu cầu login để viết, chờ Admin duyệt mới hiện). |
| **Bảng Giá** (`/pricing`) | **[BỔ SUNG]** Bảng giá dịch vụ Hậu mãi (Sửa chữa, Nâng cấp RAM/Ổ cứng, Thu cũ đổi mới). Mảng kinh doanh sinh lời lớn của các hệ thống bán lẻ. Thiết kế UX hiển thị bảng chuyên nghiệp. Vừa khớp 100% checklist chấm thi, vừa hợp logic mô hình kinh doanh thực tế thay vì liệt kê giá laptop dạng bảng thô kệch. (Prerender). |
| **Tin Tức** (`/news`) | Blog list, phân trang. Click vào đọc chi tiết (`/news/:slug`). Có plugin SEO meta tags theo từng bài. (Prerender). |
| **Hỏi/Đáp** (`/faqs`) | Trang FAQ dùng Bootstrap Accordion UX xổ xuống mượt mà. |
| **Liên Hệ** (`/contact`) | Form gửi Feedback kèm CAPTCHA đơn giản (hoặc xác thực tính toán) để chống SPAM. |
| **Giỏ Hàng** (`/cart`) | Render từ `CartContext`. Tính tổng tiền tạm tính. |
| **Thanh Toán** (`/checkout`) | Form nhập địa chỉ. Checkout xử lý hoàn toàn "Zero-Trust Pricing" từ Back-end truyền về số Order. |
| **Authentication** | Modal/Page Đăng ký, Đăng nhập. Có báo lỗi form màu đỏ trực quan. |
| **Profile** (`/profile`) | Layout chia 2 tab: (1) Cập nhật Thông tin (có Drag&Drop Avatar), Đổi Password. (2) Xem tình trạng Đơn Hàng (Đang giao, Hoàn thành). |

---

## III. Bản Đồ Routing & Tính Năng Admin (Phong cách Srtdash)

Route gốc: `/admin/*`. Chặn toàn bộ luồng nếu JWT token không chứa `role === 'admin'`. Layout sẽ khóa bên trái làm Dark Sidebar, bên phải là Content màu trắng xám. Phân quyền nhiệm vụ cho 4 Node (4 Thành viên):

### 1. Quản Trị Hệ Thống (Member 1)
- **Cài Đặt (Settings)**: Form cập nhật thông tin cửa hàng, thẻ Meta mặc định, thay đổi Text trên trang chủ/Giới thiệu.
- **Hộp Thư Liên Hệ (Contacts)**: Nhận tin từ Form Liên hệ. Bảng danh sách phân trang. Các nút Action: [Mark as Read], [Reply (gửi email)], [Delete].

### 2. Quản Trị Nội Dung (Member 2)
- **Nội dung FAQ**: CRUD các cặp Câu Hỏi - Câu Trả Lời.
- **Trang Giới Thiệu**: Trình soạn thảo hình ảnh + Text (WYSIWYG - dùng React Quill) để cập nhật `/about`.

### 3. Quản Trị Kinh Doanh (Member 3)
- **Danh Mục & Hãng**: Cấu hình Categories, Brands.
- **Sản Phẩm**: Bảng CRUD khổng lồ. Form thêm sản phẩm cho phép đính kèm biến thể (Variants: RAM 8GB giá X, 16GB giá Y), nhúng tính năng Dropzone upload nhiều ảnh.
- **Đơn Hàng**: Quá trình duyệt đơn (Pending -> Processing -> Shipping -> Completed). Nắm được khách mua giá nào, địa chỉ nào.

### 4. Quản Trị Cộng Đồng (Member 4)
- **Tin Tức**: Đăng tin khuyến mãi. Tích hợp thanh URL Slug sinh tự động, cấu hình Meta Title cho bài báo.
- **Duyệt Bình Luận**: Mod xem qua các bình luận đánh giá, có quyền "Ẩn", "Xóa", hoặc "Publish" lên trang Public. Quản lý user.

---

## IV. Quy Trình Thực Thi Thực Tế (Execution Workflow)

Vì dự án lớn, tôi sẽ Code qua **5 Cột Mốc (Milestones)** để bạn dễ dàng test và duyệt từng phần:

1. **Milestone 1 (Core)**: Thiết lập Router, cấu hình biến CSS (Theme), xây dựng `axiosClient.js`, tạo các Context (Auth, Cart), cấu hình chức năng Sync Cart khi login.
2. **Milestone 2 (Admin UI)**: Xây dựng Admin Layout giống Srtdash (Sidebar + Header tĩnh), một trang Dashboard nháp chứa biểu đồ đơn giản.
3. **Milestone 3 (Public Flow - Part 1)**: Xây dựng Public Layout, trang Home, danh sách Sản phẩm, trang Bảng Giá.
4. **Milestone 4 (Ecommerce Core)**: Hoàn thiện luồng Product Detail -> Cart -> Checkout (Test API mua hàng).
5. **Milestone 5 (Content & Admin Features)**: Trang Tin tức, Trang Bình luận, Các form CRUD của Admin.

## Open Questions

> Bạn có đồng ý với đề xuất tạo `vite-plugin-prerender` để giải quyết vấn đề SEO thay vì sử dụng framework nặng nề không? Nếu bạn phê duyệt V3 này, tôi sẽ bắt tay vào thực thi ngay **Milestone 1**!
