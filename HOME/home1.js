document.addEventListener('DOMContentLoaded', function() {
    // Código existente para favoritos
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    
    favoriteBtns.forEach(btn => {
        const productElement = btn.closest('.product');
        const productId = createProductId(productElement);
        
        if (favorites.some(fav => fav.id === productId)) {
            const icon = btn.querySelector('i');
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
        }
        
        btn.addEventListener('click', function() {
            toggleFavorite(this);
        });
    });
    
    function toggleFavorite(button) {
        const icon = button.querySelector('i');
        const productElement = button.closest('.product');
        const productId = createProductId(productElement);
        
        const product = {
            id: productId,
            name: productElement.querySelector('h3').textContent,
            price: productElement.querySelector('.price').textContent,
            image: productElement.querySelector('img').src,
            category: productElement.dataset.name
        };
        
        const existingIndex = favorites.findIndex(fav => fav.id === productId);
        
        if (existingIndex === -1) {
            favorites.push(product);
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
        } else {
            favorites.splice(existingIndex, 1);
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    function createProductId(productElement) {
        const name = productElement.querySelector('h3').textContent;
        const img = productElement.querySelector('img').src;
        return name.replace(/\s+/g, '-').toLowerCase() + '-' + img.split('/').pop();
    }
    
    // NUEVA FUNCIONALIDAD DE BÚSQUEDA/FILTRADO
    
    // Obtener elementos del DOM
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.search-box button');
    const products = document.querySelectorAll('.product');
    
    // Función de búsqueda/filtrado
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // Si no hay término de búsqueda, mostrar todos los productos
        if (searchTerm === '') {
            products.forEach(product => {
                product.style.display = 'block';
            });
            return;
        }
        
        // Filtrar productos basado en el término de búsqueda
        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            const productCategory = product.dataset.name.toLowerCase();
            
            // Verificar si el término de búsqueda está en el nombre o categoría
            if (productName.includes(searchTerm) || productCategory.includes(searchTerm)) {
                product.style.display = 'block'; // Mostrar producto
            } else {
                product.style.display = 'none'; // Ocultar producto
            }
        });
    }
    
    // Evento para el botón de búsqueda
    searchButton.addEventListener('click', filterProducts);
    
    // Evento para buscar mientras se escribe (opcional)
    searchInput.addEventListener('keyup', function(event) {
        // Filtrar productos al escribir
        filterProducts();
        
        // También filtrar si se presiona Enter
        if (event.key === 'Enter') {
            filterProducts();
        }
    });
});