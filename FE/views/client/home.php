<?php 
require_once 'helpers/settings_helper.php';
require_once 'models/ProductModel.php';
$productModel = new ProductModel();
$featuredProducts = $productModel->getAllProducts(8, 0, 'default');
include 'views/layouts/header.php'; 
?>

<main class="home-page-scroll" style="background-color: #f4f6f8; min-height: 100vh; padding-bottom: 20px; overflow-x: hidden;">
    <section class="home-hero container pt-4 pb-4">
        <div class="d-flex gap-3" style="flex-wrap: nowrap; height: 460px;">
            <aside class="d-none d-lg-block left-col" style="flex: 0 0 19.5%; max-width: 19.5%;">
                <div class="h-100 shadow-bottom-50 flex flex-col rounded-3 overflow-hidden bg-white py-2 text-neutral-800 sidebar-card categories" style="border-radius: 12px;">
                    <?php 
                    $leftCats = [
                        ['src' => 'https://dashboard.cellphones.com.vn/storage/icon-homepage-mobile.svg', 'parts' => [['text'=>'Điện thoại', 'href'=>'index.php?page=shop'], ['text'=>'Tablet', 'href'=>'index.php?page=shop']]],
                        ['src' => 'https://dashboard.cellphones.com.vn/storage/icon-homepage-laptop.svg', 'parts' => [['text'=>'Laptop', 'href'=>'index.php?page=shop']]],
                        ['src' => 'https://dashboard.cellphones.com.vn/storage/icon-homepage-audio-2.svg', 'parts' => [['text'=>'Âm thanh', 'href'=>'index.php?page=shop']]],
                        ['src' => 'https://dashboard.cellphones.com.vn/storage/icon-homepage-watch.svg', 'parts' => [['text'=>'Đồng hồ', 'href'=>'index.php?page=shop']]],
                        ['src' => 'https://dashboard.cellphones.com.vn/storage/icon-homepage-home-appliances.svg', 'parts' => [['text'=>'Đồ gia dụng', 'href'=>'index.php?page=shop']]],
                        ['src' => 'https://dashboard.cellphones.com.vn/storage/icon-homepage-accessories.svg', 'parts' => [['text'=>'Phụ kiện', 'href'=>'index.php?page=shop']]],
                        ['src' => 'https://dashboard.cellphones.com.vn/storage/icon-homepage-pc.svg', 'parts' => [['text'=>'PC', 'href'=>'index.php?page=shop'], ['text'=>'Màn hình', 'href'=>'index.php?page=shop']]],
                        ['src' => 'https://dashboard.cellphones.com.vn/storage/icon-homepage-tv.svg', 'parts' => [['text'=>'Tivi', 'href'=>'index.php?page=shop']]],
                        ['src' => 'https://dashboard.cellphones.com.vn/storage/icon-homepage-trade-in.svg', 'parts' => [['text'=>'Thu cũ đổi mới', 'href'=>'#']]],
                        ['src' => 'https://dashboard.cellphones.com.vn/storage/icon-homepage-used-goods.svg', 'parts' => [['text'=>'Hàng cũ', 'href'=>'#']]],
                        ['src' => 'https://dashboard.cellphones.com.vn/storage/icon-homepage-promotions.svg', 'parts' => [['text'=>'Khuyến mãi', 'href'=>'#']]],
                        ['src' => 'https://dashboard.cellphones.com.vn/storage/icon-homepage-tech-news.svg', 'parts' => [['text'=>'Tin công nghệ', 'href'=>'#']]]
                    ];
                    foreach ($leftCats as $c): ?>
                    <div class="group cursor-pointer px-3 hover:bg-neutral-100 d-flex align-items-center category-item" style="height: 34px;" onclick="window.location.href='index.php?page=shop'">
                        <img alt="Category" loading="lazy" width="28" height="28" decoding="async" class="me-3" src="<?= $c['src'] ?>" />
                        <div class="d-flex align-items-center parts-wrapper w-100">
                            <span class="text-truncate d-block w-100 fw-bold" style="font-size: 12px;">
                                <?php 
                                $total = count($c['parts']);
                                foreach ($c['parts'] as $i => $p): ?>
                                    <a class="hover-text-primary text-dark text-decoration-none fw-bold" href="<?= $p['href'] ?>"><?= $p['text'] ?></a><?= $i < $total - 1 ? ', ' : '' ?>
                                <?php endforeach; ?>
                            </span>
                        </div>
                        <i class="bi bi-chevron-right ms-auto text-secondary" style="font-size: 12px;"></i>
                    </div>
                    <?php endforeach; ?>
                </div>
            </aside>

            <!-- CENTER: Banner Slider -->
            <main class="d-flex flex-column h-100 justify-content-between" style="flex: 1 1 0; min-width: 0;">
                <div id="heroSlider" class="carousel slide flex-grow-1" data-bs-ride="carousel" data-bs-interval="4000" style="border-radius: 12px; overflow: hidden; background: #f5f5f5; margin-bottom: 8px;">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#heroSlider" data-bs-slide-to="0" class="active"></button>
                        <button type="button" data-bs-target="#heroSlider" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#heroSlider" data-bs-slide-to="2"></button>
                        <button type="button" data-bs-target="#heroSlider" data-bs-slide-to="3"></button>
                    </div>
                    <div class="carousel-inner h-100">
                        <div class="carousel-item active h-100">
                            <a href="index.php?page=shop" class="d-block h-100"><img src="assets/img/banners/s26-home-0526.webp" class="d-block w-100 h-100" alt="Galaxy S26 Ultra" style="object-fit: contain; background: #f8ead5;"></a>
                        </div>
                        <div class="carousel-item h-100">
                            <a href="index.php?page=shop" class="d-block h-100"><img src="assets/img/banners/iphone-17-pro-max_home_05_2026.webp" class="d-block w-100 h-100" alt="iPhone 17 Pro Max" style="object-fit: contain; background: #f5f5f5;"></a>
                        </div>
                        <div class="carousel-item h-100">
                            <a href="index.php?page=shop" class="d-block h-100"><img src="assets/img/banners/Oppo find x9 ultra_pre_home_1.webp" class="d-block w-100 h-100" alt="Oppo Find X9" style="object-fit: contain; background: #eee;"></a>
                        </div>
                        <div class="carousel-item h-100">
                            <a href="index.php?page=shop" class="d-block h-100"><img src="assets/img/banners/poco-pad-m1-home-1.webp" class="d-block w-100 h-100" alt="Poco Pad" style="object-fit: contain; background: #f0f0f0;"></a>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#heroSlider" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#heroSlider" data-bs-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </button>
                </div>

                <!-- 3 Sub-Banners -->
                <div class="row small-cards g-2" style="height: 110px;">
                    <div class="col-md-4 col-4">
                        <a href="index.php?page=shop"><img src="assets/img/banners/mbannnmacpro.webp" class="img-fluid rounded-3 w-100 h-100" alt="MacBook Pro" style="object-fit: contain; background: #111;"></a>
                    </div>
                    <div class="col-md-4 col-4">
                        <a href="index.php?page=shop"><img src="assets/img/banners/a-17.webp" class="img-fluid rounded-3 w-100 h-100" alt="Galaxy A17" style="object-fit: contain; background: #e8eaf6;"></a>
                    </div>
                    <div class="col-md-4 col-4">
                        <a href="index.php?page=shop"><img src="assets/img/banners/macbook-giao-xa-2026.webp" class="img-fluid rounded-3 w-100 h-100" alt="Mua Laptop Online" style="object-fit: contain; background: #b71c1c;"></a>
                    </div>
                </div>
            </main>

            <!-- RIGHT SIDEBAR -->
            <aside class="d-none d-lg-block" style="flex: 0 0 19.5%; max-width: 19.5%;">
                <div class="d-flex flex-column h-100 justify-content-between">
                    <div class="right-card p-3 bg-white rounded-3 shadow-sm mb-2">
                    <!-- Newsletter Form -->
                    <h6 class="fw-bold text-dark text-uppercase mb-2" style="font-size: 13px;">Đăng ký nhận tin khuyến mãi</h6>
                    <p class="text-danger small mb-1 fw-bold">Nhận ngay voucher 10%</p>
                    <p class="text-muted mb-3" style="font-size: 11px;">Voucher sẽ được gửi sau 24h, chỉ áp dụng cho khách hàng mới</p>
                    <form id="newsletterForm" onsubmit="return handleNewsletter(event)">
                        <div class="mb-2">
                            <label class="form-label mb-1 text-dark" style="font-size: 12px; font-weight: 600;">Email</label>
                            <input type="email" class="form-control form-control-sm" name="newsletter_email" placeholder="Nhập email của bạn" required style="border-radius: 8px; border: 1px solid #ddd; padding: 8px 12px; font-size: 12px;">
                        </div>
                        <div class="mb-2">
                            <label class="form-label mb-1 text-dark" style="font-size: 12px; font-weight: 600;">Số điện thoại</label>
                            <input type="tel" class="form-control form-control-sm" name="newsletter_phone" placeholder="Nhập số điện thoại của bạn" required style="border-radius: 8px; border: 1px solid #ddd; padding: 8px 12px; font-size: 12px;">
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="newsletterAgree" required style="margin-top: 3px;">
                            <label class="form-check-label text-muted" style="font-size: 11px;" for="newsletterAgree">
                                Tôi đồng ý với điều khoản của <?= htmlspecialchars($siteName) ?>
                            </label>
                        </div>
                        <button type="submit" class="btn btn-danger w-100 fw-bold" style="border-radius: 20px; padding: 8px; font-size: 13px;">ĐĂNG KÝ NGAY</button>
                    </form>
                    <div id="newsletterMsg" class="mt-2 text-center small" style="display: none;"></div>
                    </div>
                    <div class="flex-grow-1" style="border-radius: 12px; overflow: hidden; background: #e0f2f1;">
                        <a href="index.php?page=shop" class="d-block h-100">
                            <img src="assets/img/banners/lenovo_home.webp" class="img-fluid w-100 h-100" alt="Tuần Lễ Lenovo" style="object-fit: contain; background: #e0f2f1;">
                        </a>
                    </div>
                </div>
            </aside>
        </div>

        <!-- S-EDU Promo Strip -->
        <div class="mt-4">
            <a href="index.php?page=shop">
                <img src="assets/img/banners/s-edu-2-0-special-desk.gif" class="img-fluid w-100 rounded-3" alt="S-Student S-Teacher">
            </a>
        </div>
    </section>

    <!-- FEATURED PRODUCTS SECTION -->
    <section class="container pb-4">
        <div class="row gx-4">
            <div class="col-lg-3 d-none d-lg-block">
                <a href="index.php?page=shop">
                    <img src="assets/img/banners/01KK84Q078JE7HEGK1SF3GGZGZ.webp" class="img-fluid rounded-3 w-100 h-100" alt="Toàn Bộ Laptop" style="object-fit: cover; min-height: 380px;">
                </a>
            </div>
            <div class="col-lg-9">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="fw-bold text-dark mb-0"><i class="bi bi-fire text-danger me-2"></i>LAPTOP NỔI BẬT</h5>
                    <a href="index.php?page=shop" class="text-danger text-decoration-none small fw-bold">Xem tất cả <i class="bi bi-chevron-right"></i></a>
                </div>
                <div class="d-flex gap-2 mb-3 flex-wrap">
                    <?php foreach (['Asus','Dell','HP','Apple'] as $br): ?>
                    <a href="index.php?page=shop&brand=<?= urlencode($br) ?>" class="btn btn-sm btn-outline-secondary rounded-pill px-3"><?= $br ?></a>
                    <?php endforeach; ?>
                </div>
                <div class="row g-3">
                    <?php foreach ($featuredProducts as $product): 
                        $imgSrc = !empty($product['image']) ? $product['image'] : 'assets/img/placeholder.png';
                        $price = isset($product['price']) ? number_format($product['price'], 0, ',', '.') : '0';
                    ?>
                    <div class="col-xl-3 col-lg-4 col-md-4 col-6">
                        <a href="index.php?page=product&id=<?= $product['id'] ?>" class="text-decoration-none">
                            <div class="card h-100 border-0 shadow-sm" style="border-radius: 12px; overflow: hidden; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'">
                                <div class="p-3 text-center" style="background: #fafafa;">
                                    <img src="<?= htmlspecialchars($imgSrc) ?>" alt="<?= htmlspecialchars($product['name']) ?>" class="img-fluid" style="height: 140px; object-fit: contain;" onerror="this.src='assets/img/placeholder.png'">
                                </div>
                                <div class="card-body p-3">
                                    <h6 class="card-title text-dark mb-2" style="font-size: 13px; line-height: 1.4; height: 36px; overflow: hidden;"><?= htmlspecialchars($product['name']) ?></h6>
                                    <div class="text-danger fw-bold" style="font-size: 15px;"><?= $price ?>đ</div>
                                    <?php if (!empty($product['brand'])): ?>
                                    <div class="text-muted small mt-1"><?= htmlspecialchars($product['brand']) ?></div>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </a>
                    </div>
                    <?php endforeach; ?>
                    <?php if (empty($featuredProducts)): ?>
                    <div class="col-12 text-center py-5">
                        <i class="bi bi-box-seam text-muted" style="font-size: 48px;"></i>
                        <p class="text-muted mt-2">Chưa có sản phẩm nào.</p>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </section>

    <!-- PROMOTIONS SECTION -->
    <section class="container pb-4">
        <div class="row g-4 mb-4">
            <div class="col-md-6">
                <div class="bg-white rounded-3 p-4 h-100 shadow-sm">
                    <h6 class="fw-bold text-center text-uppercase mb-3">Ưu đãi Giáo dục</h6>
                    <div class="row g-2">
                        <div class="col-6"><a href="index.php?page=shop"><img src="assets/img/banners/promotion_banner04.webp" class="img-fluid rounded-3 w-100" alt="Ưu đãi 1" style="height: 100px; object-fit: cover;"></a></div>
                        <div class="col-6"><a href="index.php?page=shop"><img src="assets/img/banners/lenovo_home.webp" class="img-fluid rounded-3 w-100" alt="Ưu đãi 2" style="height: 100px; object-fit: cover;"></a></div>
                        <div class="col-6"><a href="index.php?page=shop"><img src="assets/img/banners/macbook-giao-xa-2026.webp" class="img-fluid rounded-3 w-100" alt="Ưu đãi 3" style="height: 100px; object-fit: cover;"></a></div>
                        <div class="col-6"><a href="index.php?page=shop"><img src="assets/img/banners/a-17.webp" class="img-fluid rounded-3 w-100" alt="Ưu đãi 4" style="height: 100px; object-fit: cover;"></a></div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="bg-white rounded-3 p-4 h-100 shadow-sm">
                    <h6 class="fw-bold text-center text-uppercase mb-3">Ưu đãi Thanh toán</h6>
                    <div class="row g-2">
                        <div class="col-6"><a href="index.php?page=shop"><img src="assets/img/banners/promotion_banner04.webp" class="img-fluid rounded-3 w-100" alt="Thanh toán 1" style="height: 100px; object-fit: cover;"></a></div>
                        <div class="col-6"><a href="index.php?page=shop"><img src="assets/img/banners/mbannnmacpro.webp" class="img-fluid rounded-3 w-100" alt="Thanh toán 2" style="height: 100px; object-fit: cover;"></a></div>
                        <div class="col-6"><a href="index.php?page=shop"><img src="assets/img/banners/lenovo_home.webp" class="img-fluid rounded-3 w-100" alt="Thanh toán 3" style="height: 100px; object-fit: cover;"></a></div>
                        <div class="col-6"><a href="index.php?page=shop"><img src="assets/img/banners/macbook-giao-xa-2026.webp" class="img-fluid rounded-3 w-100" alt="Thanh toán 4" style="height: 100px; object-fit: cover;"></a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-4">
            <h6 class="fw-bold text-uppercase mb-3">Chuyên trang Thương hiệu</h6>
            <div class="row g-3">
                <div class="col-md-3 col-6"><a href="index.php?page=shop&brand=Apple" class="text-decoration-none"><div class="bg-white rounded-3 p-3 text-center shadow-sm h-100"><img src="https://dashboard.cellphones.com.vn/storage/icon-homepage-laptop.svg" width="40" height="40" class="mb-2" alt="Apple"><div class="fw-bold small text-dark">Apple Chính Hãng</div><div class="text-danger small">Ưu đãi ngập tràn</div></div></a></div>
                <div class="col-md-3 col-6"><a href="index.php?page=shop&brand=Asus" class="text-decoration-none"><div class="bg-white rounded-3 p-3 text-center shadow-sm h-100"><img src="https://dashboard.cellphones.com.vn/storage/icon-homepage-pc.svg" width="40" height="40" class="mb-2" alt="Asus"><div class="fw-bold small text-dark">Asus</div><div class="text-danger small">Săn Deal cực khủng</div></div></a></div>
                <div class="col-md-3 col-6"><a href="index.php?page=shop&brand=Dell" class="text-decoration-none"><div class="bg-white rounded-3 p-3 text-center shadow-sm h-100"><img src="https://dashboard.cellphones.com.vn/storage/icon-homepage-mobile.svg" width="40" height="40" class="mb-2" alt="Dell"><div class="fw-bold small text-dark">Dell</div><div class="text-danger small">Mua cho bằng hết</div></div></a></div>
                <div class="col-md-3 col-6"><a href="index.php?page=shop&brand=HP" class="text-decoration-none"><div class="bg-white rounded-3 p-3 text-center shadow-sm h-100"><img src="https://dashboard.cellphones.com.vn/storage/icon-homepage-accessories.svg" width="40" height="40" class="mb-2" alt="HP"><div class="fw-bold small text-dark">HP</div><div class="text-danger small">Đại tiệc công nghệ</div></div></a></div>
            </div>
        </div>
        <div class="mb-4">
            <a href="index.php?page=contact" class="text-decoration-none">
                <div class="rounded-3 p-4 d-flex align-items-center justify-content-between text-white" style="background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 50%, #e53935 100%); min-height: 100px;">
                    <div>
                        <h5 class="fw-bold mb-1">Trở Thành Khách Hàng Doanh Nghiệp cùng LaptopShop</h5>
                        <div class="d-flex gap-3 mt-2">
                            <span class="btn btn-sm btn-outline-light rounded-pill px-3">Xem chi tiết ưu đãi</span>
                            <span class="btn btn-sm btn-light text-danger rounded-pill px-3 fw-bold">Đăng ký S-Business</span>
                        </div>
                    </div>
                    <div class="d-none d-md-flex gap-4 text-center">
                        <div><div class="fw-bold fs-4">5%</div><small>Chiết khấu cao</small></div>
                        <div><div class="fw-bold fs-4">1%</div><small>Hoàn tích lũy</small></div>
                        <div><div class="fw-bold fs-4">Free</div><small>Giao hàng & lắp đặt</small></div>
                    </div>
                </div>
            </a>
        </div>
    </section>
</main>

<?php include 'views/layouts/footer.php'; ?>
