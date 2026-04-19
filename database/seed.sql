USE laptopshop;

-- =============================================
-- Seed Settings
-- =============================================
INSERT INTO site_settings (`key`, `value`) VALUES
('company_name',        'LaptopShop VN'),
('phone',               '1800 6067'),
('email',               'contact@laptopshop.vn'),
('address',             '123 Đường Công Nghệ, Quận 1, TP.HCM'),
('homepage_intro_title','Về LaptopShop'),
('homepage_intro_text', 'Chuyên cung cấp các dòng Laptop Gaming, Văn phòng, Đồ họa chính hãng với giá tốt nhất thị trường.'),
('social_facebook',     'https://facebook.com/laptopshop'),
('social_youtube',      'https://youtube.com/laptopshop'),
('homepage_banner_1',   'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/lenovo-loq-banner-home.jpg'),
('homepage_banner_2',   'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/laptop-ai-hom-nay-banner-cate-moi.jpg');

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
-- =============================================
INSERT INTO users (id, fullname, email, phone, password_hash, avatar_url, is_active) VALUES
(1, 'Super Admin',  'admin@laptop.vn', '0901234567',
    '$2y$10$nGmmkhAr/YzdE25rN6NjGOOX9.SP0VcsdOrHudf3syYuXpmXvS11e', NULL, 1),
(2, 'Nguyễn Văn A', 'nva@gmail.com',   '0912345678',
    '$2y$10$nGmmkhAr/YzdE25rN6NjGOOX9.SP0VcsdOrHudf3syYuXpmXvS11e', NULL, 1),
(3, 'Trần Thị B',   'ttb@gmail.com',   '0923456789',
    '$2y$10$nGmmkhAr/YzdE25rN6NjGOOX9.SP0VcsdOrHudf3syYuXpmXvS11e', NULL, 1);

INSERT INTO admins (user_id) VALUES (1);

INSERT INTO members (user_id, tier_id, points) VALUES
(2, 1,  10),
(3, 2, 150);

-- =============================================
-- Seed Categories & Brands
-- =============================================
INSERT INTO categories (id, name, slug, is_featured) VALUES
(1, 'Laptop Gaming',    'laptop-gaming',    1),
(2, 'Laptop Văn Phòng', 'laptop-van-phong', 1),
(3, 'Laptop Đồ Họa',    'laptop-do-hoa',    1),
(4, 'MacBook',          'macbook',          1);

INSERT INTO brands (id, name, slug) VALUES
(1, 'Asus',  'asus'),
(2, 'Dell',  'dell'),
(3, 'HP',    'hp'),
(4, 'Apple', 'apple'),
(5, 'Lenovo', 'lenovo'),
(6, 'MSI',   'msi'),
(7, 'Acer',  'acer');

-- =============================================
-- Seed Products (40+ items)
-- =============================================
INSERT INTO products (id, category_id, brand_id, name, slug, short_description, is_featured) VALUES
-- Gaming (1-15)
(1, 1, 1, 'Asus ROG Strix G16 G614J', 'asus-rog-strix-g16', 'Laptop gaming hiệu năng cực đỉnh 2024', 1),
(2, 1, 6, 'MSI Katana 15 B13VFK', 'msi-katana-15', 'Thanh kiếm rực lửa cho game thủ chuyên nghiệp', 1),
(3, 1, 5, 'Lenovo LOQ 15IRH8', 'lenovo-loq-15irh8', 'Chiến thần gaming phân khúc tầm trung', 1),
(4, 1, 7, 'Acer Nitro V ANV15-51', 'acer-nitro-v', 'Lựa chọn số 1 cho sinh viên gaming', 1),
(5, 1, 1, 'Asus TUF Gaming A15', 'asus-tuf-a15', 'Bền bỉ chuẩn quân đội, chiến game mượt mà', 1),
(6, 1, 2, 'Dell G15 5530', 'dell-g15-5530', 'Thiết kế hầm hố, tản nhiệt tối ưu', 1),
(7, 1, 3, 'HP Victus 15-fa1139TX', 'hp-victus-15', 'Phong cách tối giản, sức mạnh tối đa', 1),
(8, 1, 1, 'Asus ROG Zephyrus G14', 'rog-zephyrus-g14', 'Laptop gaming 14 inch mạnh nhất thế giới', 0),
(9, 1, 6, 'MSI Cyborg 15 A12V', 'msi-cyborg-15', 'Thiết kế xuyên thấu tương lai', 0),
(10, 1, 7, 'Acer Predator Helios Neo 16', 'predator-helios-neo-16', 'Vũ khí tối thượng của thợ săn', 0),
(11, 1, 5, 'Lenovo Legion 5 Slim', 'legion-5-slim', 'Mỏng nhẹ nhưng không khoan nhượng', 0),
(12, 1, 6, 'MSI Titan GT77', 'msi-titan-gt77', 'Siêu máy tính xách tay mạnh nhất hành tinh', 0),
(13, 1, 1, 'Asus ROG Flow X13', 'rog-flow-x13', 'Laptop gaming xoay gập độc đáo', 0),
(14, 1, 2, 'Dell Alienware m16 R1', 'alienware-m16', 'Đẳng cấp Alienware huyền thoại', 0),
(15, 1, 3, 'HP OMEN 16', 'hp-omen-16', 'Kiểm soát mọi trận đấu', 0),

-- Office (16-30)
(16, 2, 2, 'Dell Inspiron 15 3520', 'dell-inspiron-15-3520', 'Laptop văn phòng bền bỉ giá tốt', 1),
(17, 2, 3, 'HP Pavilion 15-eg3093TU', 'hp-pavilion-15', 'Vẻ đẹp thanh lịch cho dân văn phòng', 1),
(18, 2, 1, 'Asus Vivobook 15 X1504VA', 'asus-vivobook-15', 'Màu sắc cá tính, hiệu năng ổn định', 1),
(19, 2, 5, 'Lenovo IdeaPad Slim 3', 'lenovo-ideapad-slim-3', 'Mỏng nhẹ, đa năng cho học tập', 1),
(20, 2, 7, 'Acer Aspire 5 A515', 'acer-aspire-5', 'Hỗ trợ công việc và giải trí toàn diện', 1),
(21, 2, 2, 'Dell Vostro 3430', 'dell-vostro-3430', 'Bảo mật tối ưu cho doanh nghiệp nhỏ', 0),
(22, 2, 3, 'HP 250 G9', 'hp-250-g9', 'Đơn giản, chắc chắn, giá cực rẻ', 0),
(23, 2, 5, 'Lenovo Yoga 7 14IRL8', 'lenovo-yoga-7', 'Xoay gập 360 độ linh hoạt', 0),
(24, 2, 1, 'Asus Zenbook 14 OLED', 'asus-zenbook-14', 'Tuyệt phẩm màn hình OLED siêu nét', 0),
(25, 2, 4, 'MacBook Air M1', 'macbook-air-m1', 'Laptop quốc dân chưa bao giờ hết hot', 0),
(26, 2, 4, 'MacBook Air M2', 'macbook-air-m2', 'Thiết kế mới, trải nghiệm mới', 1),
(27, 2, 4, 'MacBook Air M3', 'macbook-air-m3', 'Đỉnh cao sức mạnh AI từ Apple', 1),
(28, 2, 5, 'Lenovo ThinkPad E14 Gen 5', 'thinkpad-e14', 'Bàn phím trứ danh, độ bền ThinkPad', 0),
(29, 2, 2, 'Dell Latitude 3540', 'dell-latitude-3540', 'Dòng máy doanh nhân cao cấp', 0),
(30, 2, 3, 'HP ProBook 450 G10', 'hp-probook-450', 'Thiết kế kim loại sang trọng', 0),

-- Graphics / Creative (31-40)
(31, 3, 2, 'Dell XPS 13 9320 Plus', 'dell-xps-13-plus', 'Laptop Windows đẹp và mạnh mẽ nhất', 1),
(32, 3, 3, 'HP Envy 16-h1033TX', 'hp-envy-16', 'Sáng tạo không giới hạn', 1),
(33, 3, 1, 'Asus ProArt Studiobook 16', 'proart-studiobook-16', 'Dành riêng cho chuyên gia thiết kế', 1),
(34, 3, 4, 'MacBook Pro 14 M3', 'macbook-pro-14', 'Màn hình Liquid Retina XDR sống động', 1),
(35, 3, 4, 'MacBook Pro 16 M3 Max', 'macbook-pro-16', 'Trạm đồ họa di động tối thượng', 1),
(36, 3, 5, 'Lenovo ThinkPad P14s', 'thinkpad-p14s', 'Workstation nhỏ gọn cho kỹ sư', 0),
(37, 3, 2, 'Dell Precision 3581', 'dell-precision-3581', 'Sự lựa chọn của dân kiến trúc', 0),
(38, 3, 1, 'Asus Vivobook Pro 16', 'vivobook-pro-16', 'Đồ họa chuyên nghiệp giá hợp lý', 0),
(39, 3, 3, 'HP Spectre x360 14', 'hp-spectre-x360', 'Đỉnh cao nghệ thuật chế tác', 0),
(40, 3, 6, 'MSI Prestige 16 AI Evo', 'msi-prestige-16', 'Sang trọng và mạnh mẽ', 0);

-- =============================================
-- Seed Product Variants (1-2 per product)
-- =============================================
INSERT INTO product_variants (product_id, sku_code, ram, color, storage, quantity, base_price) VALUES
(1, 'G16-16-512', '16GB', 'Gray', '512GB SSD', 15, 32990000.00),
(1, 'G16-32-1TB', '32GB', 'Gray', '1TB SSD', 5, 38990000.00),
(2, 'MSI-K15-16', '16GB', 'Black', '512GB SSD', 12, 21990000.00),
(3, 'LOQ-8-512', '8GB', 'Storm Grey', '512GB SSD', 25, 18490000.00),
(4, 'NV-8-512', '8GB', 'Black', '512GB SSD', 30, 16990000.00),
(16, 'INS-8-256', '8GB', 'Silver', '256GB SSD', 50, 11490000.00),
(17, 'PAV-16-512', '16GB', 'Gold', '512GB SSD', 20, 17990000.00),
(26, 'MBA-M2-8-256', '8GB', 'Midnight', '256GB SSD', 40, 24990000.00),
(31, 'XPS-16-512', '16GB', 'Silver', '512GB SSD', 10, 45990000.00),
(35, 'MBP-M3-MAX', '36GB', 'Space Black', '1TB SSD', 3, 79990000.00);

-- =============================================
-- Seed FAQs
-- =============================================
INSERT INTO faqs (question, answer, sort_order) VALUES
('Sản phẩm tại LaptopShop có chính hãng không?', 'Tất cả sản phẩm tại LaptopShop đều là hàng nhập khẩu chính hãng 100%, có hóa đơn VAT đầy đủ.', 1),
('Tôi có được đổi trả nếu máy gặp lỗi không?', 'Có, chúng tôi áp dụng chính sách 1 đổi 1 trong vòng 30 ngày nếu phát hiện lỗi từ nhà sản xuất.', 2),
('Shop có hỗ trợ trả góp không?', 'LaptopShop hỗ trợ trả góp 0% qua thẻ tín dụng và các công ty tài chính với thủ tục cực kỳ đơn giản.', 3),
('Thời gian bảo hành là bao lâu?', 'Hầu hết các dòng Laptop được bảo hành từ 12-24 tháng chính hãng tại Việt Nam.', 4);
