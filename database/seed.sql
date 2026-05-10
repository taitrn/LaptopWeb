USE laptopshop;

-- =============================================
-- Seed Settings
-- =============================================
INSERT INTO site_settings (`key`, `value`) VALUES
('general.site_name',        'LaptopShop VN'),
('general.site_tagline',     'Laptop chính hãng - Giá tốt nhất'),
('general.site_description', 'Chuyên cung cấp các dòng laptop chính hãng, giá cạnh tranh với dịch vụ hậu mãi tốt nhất thị trường.'),
('general.site_logo',        'assets/img/logo.png'),
('header.phone_number',      '1900 1234'),
('header.email',             'contact@laptopshop.vn'),
('header.announcement_bar_text', 'Miễn phí giao hàng cho đơn từ 500K'),
('header.announcement_bar_enabled', '1'),
('contact.phone',            '1900 1234'),
('contact.email',            'contact@laptopshop.vn'),
('contact.address',          '123 Đường Công Nghệ, Quận 1, TP.HCM'),
('contact.page_title',       'Liên hệ với chúng tôi'),
('contact.page_subtitle',    'Hãy để lại lời nhắn, chúng tôi sẽ phản hồi sớm nhất'),
('contact.working_hours',    'Thứ 2 - Thứ 7: 8:00 - 21:00\nChủ nhật: 9:00 - 18:00'),
('contact.form_title',       'Gửi lời nhắn'),
('contact.success_message',  'Cảm ơn bạn! Chúng tôi đã nhận được tin nhắn và sẽ phản hồi trong 24h.'),
('footer.about_text',        'LaptopShop VN - Chuyên cung cấp laptop chính hãng từ các thương hiệu hàng đầu.'),
('footer.newsletter_title',  'Đăng ký nhận tin'),
('footer.newsletter_subtitle','Nhận thông tin khuyến mãi mới nhất'),
('footer.social_facebook',   'https://facebook.com/laptopshop'),
('footer.social_youtube',    'https://youtube.com/laptopshop'),
('footer.social_instagram',  ''),
('footer.social_twitter',    ''),
('footer.copyright_text',    '© 2026 LaptopShop VN. All rights reserved.'),
('footer.payment_methods_enabled', '1'),
('home.hero_title',          'Laptop chính hãng'),
('home.hero_subtitle',       'Giá tốt nhất thị trường'),
('home.hero_button_text',    'Mua ngay'),
('home.featured_section_title', 'Laptop nổi bật'),
('home.featured_section_subtitle', 'Sản phẩm được yêu thích nhất'),
('shop.page_title',          'Cửa hàng'),
('shop.page_subtitle',       'Tất cả sản phẩm'),
('shop.filter_title',        'Bộ lọc'),
('shop.sort_label',          'Sắp xếp theo'),
('shop.no_products_message', 'Không tìm thấy sản phẩm phù hợp');

-- =============================================
-- Seed Membership Tiers
-- =============================================
INSERT INTO membership_tiers (id, name, min_points, discount_percent) VALUES
(1, 'S-New',     0,    0.00),
(2, 'S-Student', 100,  2.00),
(3, 'S-Mem',     500,  3.00),
(4, 'S-Vip',     2000, 5.00);

-- =============================================
-- Seed Users, Admins, Members
-- All passwords = Admin@123
-- Hash generated with PHP password_hash('Admin@123', PASSWORD_BCRYPT)
-- =============================================
-- avatar_url and is_active are now part of users table
INSERT INTO users (id, fullname, email, phone, password_hash, avatar_url, is_active) VALUES
(1, 'Super Admin',  'admin@laptop.vn', '0901234567',
    '$2y$10$nGmmkhAr/YzdE25rN6NjGOOX9.SP0VcsdOrHudf3syYuXpmXvS11e', NULL, 1),
(2, 'Nguyen Van A', 'nva@gmail.com',   '0912345678',
    '$2y$10$nGmmkhAr/YzdE25rN6NjGOOX9.SP0VcsdOrHudf3syYuXpmXvS11e', NULL, 1),
(3, 'Tran Thi B',   'ttb@gmail.com',   '0923456789',
    '$2y$10$nGmmkhAr/YzdE25rN6NjGOOX9.SP0VcsdOrHudf3syYuXpmXvS11e', NULL, 1),
-- User 4 is banned (is_active = 0) to demo the ban feature
(4, 'Le Van C',     'lvc@gmail.com',   '0934567890',
    '$2y$10$nGmmkhAr/YzdE25rN6NjGOOX9.SP0VcsdOrHudf3syYuXpmXvS11e', NULL, 0);

INSERT INTO admins (user_id) VALUES (1);

INSERT INTO members (user_id, tier_id, points) VALUES
(2, 1,  10),  -- S-New
(3, 2, 150),  -- S-Student
(4, 3, 620);  -- S-Mem (account is banned via users.is_active = 0)

-- =============================================
-- Seed Categories & Brands
-- =============================================
INSERT INTO categories (id, name, slug, is_featured) VALUES
(1, 'Laptop Gaming',    'laptop-gaming',    1),
(2, 'Laptop Van Phong', 'laptop-van-phong', 1),
(3, 'Laptop Do Hoa',    'laptop-do-hoa',    0),
(4, 'MacBook',          'macbook',          1);

INSERT INTO brands (id, name, slug) VALUES
(1, 'Asus',  'asus'),
(2, 'Dell',  'dell'),
(3, 'HP',    'hp'),
(4, 'Apple', 'apple');

-- =============================================
-- Seed Products & Variants
-- =============================================
INSERT INTO products (id, category_id, brand_id, name, slug, short_description, is_featured) VALUES
(1, 1, 1, 'Asus ROG Strix G15', 'asus-rog-strix-g15', 'Co may choi game thuc thu',     1),
(2, 2, 2, 'Dell Inspiron 15',   'dell-inspiron-15',   'Laptop van phong ben bi',        1),
(3, 4, 4, 'MacBook Air M2',     'macbook-air-m2',     'Sieu mong nhe, hieu nang manh',  1);

INSERT INTO product_variants (id, product_id, sku_code, ram, color, storage, quantity, base_price) VALUES
(1, 1, 'ROG-G15-8GB-BLK',   '8GB',  'Black',    '512GB SSD', 10, 25000000.00),
(2, 1, 'ROG-G15-16GB-BLK',  '16GB', 'Black',    '512GB SSD',  5, 27500000.00),
(3, 2, 'DELL-INS-8GB-SIL',  '8GB',  'Silver',   '256GB SSD', 20, 15000000.00),
(4, 3, 'MAC-M2-8GB-MID',    '8GB',  'Midnight', '256GB SSD',  8, 28000000.00);

-- =============================================
-- Seed FAQs (required by spec task #2)
-- =============================================
INSERT INTO faqs (question, answer, sort_order) VALUES
('Chinh sach bao hanh cua LaptopShop la gi?',
 'Tat ca san pham duoc bao hanh chinh hang toi thieu 12 thang. Mot so dong may Apple duoc bao hanh len den 24 thang.',
 1),
('Toi co the doi tra san pham khong?',
 'Ban co the doi tra trong vong 7 ngay neu san pham co loi tu nha san xuat, con nguyen seal va day du phu kien.',
 2),
('LaptopShop co ho tro tra gop khong?',
 'Co, chung toi ho tro tra gop 0% qua the tin dung cua cac ngan hang doi tac: VIB, Techcombank, Sacombank.',
 3),
('Thoi gian giao hang la bao lau?',
 'Noi thanh TP.HCM: 2-4 gio. Cac tinh thanh khac: 1-3 ngay lam viec.',
 4);

-- =============================================
-- Seed Articles (posted by admin user_id = 1)
-- =============================================
INSERT INTO articles (id, admin_id, title, slug, content, meta_title, meta_description, meta_keywords, published_at) VALUES
(1, 1,
 'Top 5 Laptop Gaming Tot Nhat 2025',
 'top-5-laptop-gaming-tot-nhat-2025',
 '<p>Noi dung chi tiet ve top 5 laptop gaming 2025...</p>',
 'Top 5 Laptop Gaming 2025 | LaptopShop VN',
 'Danh sach top 5 laptop gaming tot nhat nam 2025 voi hieu nang cao, tan nhiet tot.',
 'laptop gaming, laptop gaming 2025, laptop choi game',
 NOW()),
(2, 1,
 'MacBook Air M2 - Co Dang Mua Khong?',
 'macbook-air-m2-co-dang-mua-khong',
 '<p>Danh gia chi tiet MacBook Air M2...</p>',
 'Review MacBook Air M2 | LaptopShop VN',
 'Danh gia chi tiet MacBook Air M2 - hieu nang, thiet ke, pin va gia ban.',
 'macbook air m2, apple m2, review macbook',
 NOW());

-- =============================================
-- Seed Reviews (user_id must exist in members; product_id from products)
-- =============================================
INSERT INTO reviews (user_id, product_id, rating, comment, status) VALUES
(2, 1, 5, 'May choi game muot lam, tan nhiet tot.', 'approved'),
(3, 2, 4, 'Phu hop voi cong viec van phong, pin on.', 'approved'),
(2, 3, 5, 'Thiet ke dep, mong nhe, dang tien.', 'pending');

-- =============================================
-- Seed Contacts
-- =============================================
INSERT INTO contacts (customer_name, customer_email, subject, message, status) VALUES
('Khach Hang X', 'khachhangx@gmail.com',
 'Hoi ve thoi gian giao hang',
 'Cho minh hoi don hang giao noi thanh mat bao lau?',
 'unread'),
('Nguyen Thi Y', 'nty@gmail.com',
 'Yeu cau xuat hoa don VAT',
 'Cho toi xin hoa don VAT cho don hang DH240001.',
 'replied');
