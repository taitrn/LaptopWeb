document.addEventListener('DOMContentLoaded', function() {
    // Đếm số lượng filter đang active
    function countActiveFilters() {
        const urlParams = new URLSearchParams(window.location.search);
        let count = 0;
        
        // Đếm brand filters
        const brands = urlParams.getAll('brand[]');
        count += brands.length;
        
        // Đếm category filter
        if (urlParams.get('category')) count++;
        
        // Đếm storage filters
        const storages = urlParams.getAll('storage[]');
        count += storages.length;
        
        // Đếm price filters
        if (urlParams.get('price_min') || urlParams.get('price_max')) count++;
        
        return count;
    }
    
    // Hiển thị badge số lượng filter
    const filterButton = document.querySelector('[data-bs-target="#filterModal"]');
    const activeCount = countActiveFilters();
    
    if (activeCount > 0 && filterButton) {
        filterButton.innerHTML = `
            <i class="bi bi-funnel-fill"></i> Lọc
            <span class="badge bg-light text-danger rounded-pill">${activeCount}</span>
        `;
    }
});
