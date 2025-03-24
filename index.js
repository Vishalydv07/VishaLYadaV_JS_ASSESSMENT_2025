document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const categoryBtns = document.querySelectorAll('.category-btn');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const products = document.querySelectorAll('.product');

    // Initial filter
    filterProducts();

    // Event listeners
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', handleCategoryClick);
    });

    minPriceInput.addEventListener('input', filterProducts);
    maxPriceInput.addEventListener('input', filterProducts);

    function handleCategoryClick(e) {
        // Remove active class from all buttons
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        e.target.classList.add('active');
        filterProducts();
    }

    function filterProducts() {
        const selectedCategory = document.querySelector('.category-btn.active').dataset.category;
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

        products.forEach(product => {
            const productCategory = product.dataset.category;
            const productPrice = parseFloat(product.dataset.price);

            const categoryMatch = selectedCategory === 'all' || productCategory === selectedCategory;
            const priceMatch = productPrice >= minPrice && productPrice <= maxPrice;

            if (categoryMatch && priceMatch) {
                product.classList.remove('hidden');
            } else {
                product.classList.add('hidden');
            }
        });
    }
});