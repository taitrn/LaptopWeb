<?php 
require_once 'models/PostModel.php';
require_once 'models/ProductModel.php';
require_once 'models/OrderModel.php';
require_once 'models/ContactModel.php';
require_once 'models/UserModel.php';
require_once 'models/ProductReviewModel.php';

$postModel = new PostModel();
$productModel = new ProductModel();
$orderModel = new OrderModel();
$contactModel = new ContactModel();
$userModel = new UserModel();
$reviewModel = new ProductReviewModel();

$pdo = Database::getConnection();
  
// Get stats
$stats = [];
$stats['products'] = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
$stats['orders'] = $pdo->query("SELECT COUNT(*) FROM orders")->fetchColumn();
$stats['revenue'] = $pdo->query("SELECT SUM(final_amount) FROM orders WHERE status = 'completed'")->fetchColumn() ?: 0;
$stats['pending_orders'] = $pdo->query("SELECT COUNT(*) FROM orders WHERE status = 'pending'")->fetchColumn();
$stats['unread_contacts'] = $pdo->query("SELECT COUNT(*) FROM contacts WHERE status = 'unread'")->fetchColumn();
$stats['users'] = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
$stats['posts'] = $pdo->query("SELECT COUNT(*) FROM articles WHERE published_at IS NOT NULL")->fetchColumn();
$stats['reviews'] = $pdo->query("SELECT COUNT(*) FROM reviews")->fetchColumn();

$stmt = $pdo->query("SELECT * FROM orders ORDER BY created_at DESC LIMIT 5");
$recent_orders = $stmt->fetchAll();

include 'views/layouts/admin_header.php'; 
?>

<!-- Sales Report Area Start -->
<div class="sales-report-area mb-3">
    <div class="row g-2">
        <!-- Total Members -->
        <div class="col-md-3 col-sm-6">
            <div class="card mb-0">
                <div class="card-body" style="padding: 15px;">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="icon bg-light rounded p-2 text-primary">
                            <i class="ti-user"></i>
                        </div>
                        <span class="text-success fw-bold" style="font-size: 13px;">+12.5%</span>
                    </div>
                    <div class="text-muted" style="font-size: 12px;">Total Members</div>
                    <h4 class="mb-0 fw-bold"><?= number_format($stats['users']) ?></h4>
                </div>
            </div>
        </div>
        <!-- New Orders -->
        <div class="col-md-3 col-sm-6">
            <div class="card mb-0">
                <div class="card-body" style="padding: 15px;">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="icon bg-danger text-white rounded p-2">
                            <i class="ti-shopping-cart"></i>
                        </div>
                        <span class="text-danger fw-bold" style="font-size: 13px;">Urgent</span>
                    </div>
                    <div class="text-muted" style="font-size: 12px;">New Orders</div>
                    <h4 class="mb-0 fw-bold"><?= number_format($stats['orders']) ?></h4>
                </div>
            </div>
        </div>
        <!-- Pending Reviews -->
        <div class="col-md-3 col-sm-6">
            <div class="card mb-0">
                <div class="card-body" style="padding: 15px;">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="icon bg-info text-white rounded p-2">
                            <i class="ti-comments"></i>
                        </div>
                        <span class="text-dark fw-bold" style="font-size: 13px;"><?= number_format($stats['unread_contacts']) ?> Active</span>
                    </div>
                    <div class="text-muted" style="font-size: 12px;">Pending Reviews</div>
                    <h4 class="mb-0 fw-bold"><?= number_format($stats['reviews']) ?></h4>
                </div>
            </div>
        </div>
        <!-- Active Services -->
        <div class="col-md-3 col-sm-6">
            <div class="card mb-0">
                <div class="card-body" style="padding: 15px;">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="icon bg-light rounded p-2">
                            <i class="ti-settings"></i>
                        </div>
                        <span class="text-primary fw-bold" style="font-size: 13px;">Stable</span>
                    </div>
                    <div class="text-muted" style="font-size: 12px;">Active Services</div>
                    <h4 class="mb-0 fw-bold">12 / 12</h4>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Sales Report Area End -->

<!-- Main Dashboard Content -->
<div class="row g-2">
    <!-- Weekly Traffic Analysis -->
    <div class="col-lg-8 mb-2">
        <div class="card h-100">
            <div class="card-body" style="padding: 14px;">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="header-title mb-0" style="font-size: 18px;">Weekly Traffic Analysis</h5>
                    <div>
                        <span class="badge bg-light text-dark px-2 py-1 border" style="font-size: 11px;">7D</span>
                        <span class="px-2 font-weight-bold" style="font-size: 11px;">30D</span>
                    </div>
                </div>
                <div class="traffic-panel" style="height: 240px;">
                    <div class="traffic-note">
                        <i class="ti-stats-up text-success"></i> Traffic increased by 22% compared to last week.
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Recent Activities -->
    <div class="col-lg-4 mb-2">
        <div class="card h-100">
            <div class="card-body" style="padding: 14px;">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="header-title mb-0" style="font-size: 18px;">Recent Activities</h5>
                    <a href="#" class="text-danger fw-bold" style="font-size: 12px;">View All</a>
                </div>
                <div class="recent-activity">
                    <div class="timeline-task pb-2 border-bottom mb-2 activity-item activity-item-danger">
                        <div class="tm-title">
                            <h5 class="mb-1 activity-title">Inventory Update</h5>
                            <span class="time text-muted activity-time"><i class="ti-time"></i> 14 minutes ago</span>
                        </div>
                        <p class="text-muted small mb-0">MacBook Pro M3 restocked (+50 units)</p>
                    </div>
                    <div class="timeline-task pb-2 border-bottom mb-2 activity-item activity-item-info">
                        <div class="tm-title">
                            <h5 class="mb-1 activity-title">New Member</h5>
                            <span class="time text-muted activity-time"><i class="ti-time"></i> 1 hour ago</span>
                        </div>
                        <p class="text-muted small mb-0">John Smith registered as Platinum Member</p>
                    </div>
                    <div class="timeline-task pb-2 border-bottom mb-2 activity-item activity-item-success">
                        <div class="tm-title">
                            <h5 class="mb-1 activity-title">Order Fulfilled</h5>
                            <span class="time text-muted activity-time"><i class="ti-time"></i> 3 hours ago</span>
                        </div>
                        <p class="text-muted small mb-0">Order #99214 successfully shipped</p>
                    </div>
                    <div class="timeline-task pb-2 activity-item activity-item-danger">
                        <div class="tm-title">
                            <h5 class="mb-1 activity-title">System Alert</h5>
                            <span class="time text-muted activity-time"><i class="ti-time"></i> 5 hours ago</span>
                        </div>
                        <p class="text-muted small mb-0">High latency detected in payment gateway</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row g-2">
    <!-- Low Stock Alert -->
    <div class="col-lg-4 col-md-6 mb-2">
        <div class="card h-100 bg-primary text-white" style="background-color: var(--primary-color) !important;">
            <div class="card-body" style="padding: 12px;">
                <h5 class="card-title text-white mb-2" style="font-size: 16px;">Low Stock Alert</h5>
                <p class="mb-2" style="font-size: 12px;">8 products below critical threshold</p>
                <button class="btn btn-light text-danger w-100 fw-bold" style="font-size: 12px; padding: 6px 8px;">Restock</button>
            </div>
        </div>
    </div>

    <!-- Customer Sentiment -->
    <div class="col-lg-4 col-md-6 mb-2">
        <div class="card h-100 bg-info text-white" style="background-color: #007bff !important;">
            <div class="card-body" style="padding: 12px;">
                <h5 class="card-title text-white mb-2" style="font-size: 16px;">Customer Sentiment</h5>
                <p class="mb-2" style="font-size: 12px;"><strong>94%</strong> <i class="ti-face-smile"></i> Positive (↑4%)</p>
                <button class="btn btn-light text-info w-100 fw-bold" style="color: #007bff !important; font-size: 12px; padding: 6px 8px;">Analyze</button>
            </div>
        </div>
    </div>

    <!-- System Health -->
    <div class="col-lg-4 col-md-6 mb-2">
        <div class="card h-100">
            <div class="card-body" style="padding: 12px;">
                <h5 class="card-title mb-2" style="font-size: 16px;">System Health</h5>
                
                <div class="mb-2">
                    <div class="d-flex justify-content-between mb-1">
                        <span style="font-size: 11px;">Database</span>
                        <span class="text-danger fw-bold" style="font-size: 11px;">99.9%</span>
                    </div>
                    <div class="progress" style="height: 4px;">
                        <div class="progress-bar bg-danger" role="progressbar" style="width: 99.9%" aria-valuenow="99.9" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>

                <div>
                    <div class="d-flex justify-content-between mb-1">
                        <span style="font-size: 11px;">API Gateway</span>
                        <span class="text-info fw-bold" style="font-size: 11px;">94.2%</span>
                    </div>
                    <div class="progress" style="height: 4px;">
                        <div class="progress-bar bg-info" role="progressbar" style="width: 94.2%" aria-valuenow="94.2" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include 'views/layouts/admin_footer.php'; ?>