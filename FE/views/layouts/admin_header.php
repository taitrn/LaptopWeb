<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION['is_admin']) || !$_SESSION['is_admin']) {
    header("Location: index.php?page=home");
    exit();
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>CellphoneS - Admin Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="assets/srtdash/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/srtdash/css/fontawesome.min.css">
    <link rel="stylesheet" href="assets/srtdash/css/themify-icons.css">
    <link rel="stylesheet" href="assets/srtdash/css/metismenujs.min.css">
    <link rel="stylesheet" href="assets/srtdash/css/typography.css">
    <link rel="stylesheet" href="assets/srtdash/css/default-css.css">
    <link rel="stylesheet" href="assets/srtdash/css/style.css">
    <link rel="stylesheet" href="assets/srtdash/css/responsive.css">
    
    <!-- Custom styling to override Srtdash with CellphoneS primary red -->
    <style>
        :root {
            --primary-color: #e11b22;
            --sidebar-bg: #252d3d;
            --sidebar-text: #9ca7ba;
            --sidebar-active: #e11b22;
        }

        body {
            margin: 0;
            background: #eef2f6 !important;
        }
        
        /* Page Container & Layout */
        .page-container {
            display: flex;
            min-height: 100vh;
            flex-direction: row;
            background: #eef2f6;
        }
        
        /* Sidebar Menu */
        .sidebar-menu {
            width: 250px;
            background: var(--sidebar-bg) !important;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            flex-shrink: 0;
            height: 100vh;
            overflow-y: auto;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 1000;
        }
        
        .sidebar-menu .sidebar-header {
            background: var(--primary-color) !important;
            padding: 16px 20px !important;
            border: none !important;
        }
        
        .sidebar-menu .sidebar-header h2 {
            color: white !important;
            font-size: 18px !important;
            margin: 0 !important;
            font-weight: 800 !important;
            letter-spacing: 0.5px;
            line-height: 1;
        }
        
        .sidebar-menu .main-menu {
            margin: 0 !important;
            padding: 15px 0 !important;
        }
        
        .metismenu li {
            margin: 0 !important;
            border: none !important;
        }
        
        .metismenu > li > a {
            color: var(--sidebar-text) !important;
            padding: 10px 16px !important;
            margin: 0 !important;
            display: flex !important;
            align-items: center !important;
            font-size: 16px !important;
            font-weight: 500 !important;
            transition: all 0.3s ease !important;
            border-left: 3px solid transparent !important;
        }
        
        .metismenu > li > a:hover {
            color: white !important;
            background: rgba(255,255,255,0.05) !important;
            padding-left: 24px !important;
        }
        
        .metismenu > li > a i {
            margin-right: 12px !important;
            font-size: 16px !important;
            min-width: 20px !important;
            color: var(--sidebar-text) !important;
        }
        
        .metismenu > li.active > a {
            color: var(--primary-color) !important;
            background: rgba(225, 27, 34, 0.1) !important;
            border-left-color: var(--primary-color) !important;
            padding-left: 17px !important;
            font-weight: 600 !important;
        }
        
        .metismenu > li.active > a i {
            color: var(--primary-color) !important;
        }
        
        .metismenu .collapse {
            background: rgba(0,0,0,0.2) !important;
        }
        
        .metismenu .collapse > li > a {
            padding-left: 40px !important;
            color: rgba(160, 169, 176, 0.9) !important;
            font-size: 14px !important;
        }
        
        .metismenu .collapse > li.active > a {
            color: var(--primary-color) !important;
        }
        
        /* Main Content */
        .main-content {
            flex: 1;
            margin-left: 250px;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        
        /* Header Area */
        .header-area {
            background: #ffffff !important;
            border-bottom: 1px solid #e0e0e0 !important;
            padding: 12px 18px !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            min-height: 60px;
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .header-title {
            margin: 0;
            color: #1f2a37;
            font-size: 26px;
            font-weight: 700;
        }
        
        .search-box {
            padding: 0 !important;
            margin: 0 !important;
            display: none !important;
        }
        
        .search-box input {
            border: 1px solid #ddd !important;
            border-radius: 4px !important;
            padding: 8px 12px !important;
            min-width: 300px !important;
            transition: all 0.3s ease !important;
        }
        
        .search-box input:focus {
            outline: none !important;
            border-color: var(--primary-color) !important;
            box-shadow: 0 0 0 2px rgba(225, 27, 34, 0.1) !important;
        }
        
        .notification-area {
            margin: 0 !important;
            list-style: none !important;
            display: none !important;
            gap: 20px !important;
        }
        
        .notification-area li {
            cursor: pointer !important;
            color: #666 !important;
            font-size: 18px !important;
            transition: color 0.3s ease !important;
        }
        
        .notification-area li:hover {
            color: var(--primary-color) !important;
        }
        
        /* User Profile */
        .user-profile {
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
        }
        
        .user-thumb {
            width: 40px !important;
            height: 40px !important;
            border-radius: 50% !important;
            object-fit: cover !important;
        }
        
        .user-name {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            color: white !important;
            padding: 6px 12px !important;
            border-radius: 6px !important;
            font-weight: 600 !important;
            font-size: 14px !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            margin: 0;
        }
        
        .user-dropdown {
            box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
            border: none !important;
            border-radius: 6px !important;
        }
        
        .user-dropdown .dropdown-item {
            padding: 10px 16px !important;
            color: #333 !important;
            transition: all 0.3s ease !important;
        }
        
        .user-dropdown .dropdown-item:hover {
            background: #f5f5f5 !important;
            color: var(--primary-color) !important;
        }
        
        /* Main Content Inner */
        .main-content-inner {
            flex: 1;
            padding: 18px !important;
            overflow-y: auto !important;
        }

        .footer-area {
            text-align: right;
            padding: 14px 28px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            background: #fff;
        }

        .footer-area p {
            margin: 0;
            font-size: 12px;
        }
        
        /* Card Styles */
        .card {
            border-radius: 8px !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important;
            border: 1px solid #e8eef5 !important;
        }
        
        .card-body {
            padding: 20px !important;
        }

        .sales-report-area .card {
            border-radius: 10px !important;
        }

        .traffic-panel {
            height: 320px;
            border-radius: 8px;
            border: 1px solid #e6eaf0;
            background-image: linear-gradient(180deg, rgba(225, 27, 34, 0.12), rgba(225, 27, 34, 0.12)), url('assets/img/hero-bg.jpg');
            background-size: cover;
            background-position: center;
            position: relative;
            display: flex;
            align-items: flex-end;
            padding: 14px;
        }

        .traffic-note {
            background: rgba(255, 255, 255, 0.94);
            border-radius: 6px;
            padding: 7px 10px;
            font-size: 13px;
            font-weight: 500;
            color: #374151;
        }

        .activity-item {
            border-left: 3px solid transparent;
            padding-left: 15px;
        }

        .activity-item-danger {
            border-left-color: #e11b22;
        }

        .activity-item-info {
            border-left-color: #17a2b8;
        }

        .activity-item-success {
            border-left-color: #28a745;
        }

        .activity-title {
            font-size: 15px;
        }

        .activity-time {
            font-size: 12px;
        }
        
        /* Primary Button */
        .btn-primary, .bg-primary {
            background-color: var(--primary-color) !important;
            border-color: var(--primary-color) !important;
        }
        
        .btn-primary:hover {
            background-color: #c71a1a !important;
            border-color: #c71a1a !important;
        }

        @media (max-width: 1200px) {
            .sidebar-menu {
                width: 240px;
            }

            .main-content {
                margin-left: 240px;
            }

            .header-title {
                font-size: 30px;
            }

            .user-name {
                font-size: 18px !important;
            }

            .metismenu > li > a {
                font-size: 17px !important;
            }

            .metismenu > li > a i {
                font-size: 16px !important;
            }
        }

        @media (max-width: 768px) {
            .sidebar-menu {
                width: 210px;
            }

            .main-content {
                margin-left: 210px;
            }

            .header-title {
                font-size: 24px;
            }
        }

        @media (max-width: 576px) {
            .sidebar-menu {
                position: fixed;
                left: 0;
                transition: left 0.3s;
                width: 210px;
                z-index: 1050;
            }

            .main-content {
                margin-left: 0;
            }

            .header-title {
                font-size: 20px;
            }
        }
    </style>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="page-container">
        <!-- sidebar menu area start -->
        <?php include 'views/layouts/admin_sidebar.php'; ?>
        <!-- sidebar menu area end -->

        <!-- main content area start -->
        <div class="main-content">
            <!-- header area start -->
            <div class="header-area">
                <div class="header-left">
                    <h4 class="header-title">Admin Panel</h4>
                </div>
                <div class="user-profile">
                    <img class="avatar user-thumb" src="assets/img/placeholder.png" alt="avatar">
                    <h4 class="user-name dropdown-toggle" data-bs-toggle="dropdown">
                        <?= htmlspecialchars($_SESSION['username'] ?? 'Admin') ?> <i class="fa-solid fa-angle-down"></i>
                    </h4>
                    <div class="dropdown-menu user-dropdown dropdown-menu-end">
                        <a class="dropdown-item" href="?page=home">Back to Site</a>
                        <a class="dropdown-item" href="?page=logout">Log Out</a>
                    </div>
                </div>
            </div>
            <!-- header area end -->
            
            <div class="main-content-inner">
