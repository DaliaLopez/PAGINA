document.addEventListener('DOMContentLoaded', function() {
    // Cargar favoritos desde localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Obtener todos los botones de favoritos
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    
    // Inicializar el estado de los botones basado en localStorage
    favoriteBtns.forEach(btn => {
        const productElement = btn.closest('.product');
        const productId = createProductId(productElement);
        
        // Si el producto está en favoritos, mostrar corazón lleno
        if (favorites.some(fav => fav.id === productId)) {
            const icon = btn.querySelector('i');
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
        }
        
        // Agregar evento click a cada botón
        btn.addEventListener('click', function() {
            toggleFavorite(this);
        });
    });
    
    // Función para alternar estado de favorito
    function toggleFavorite(button) {
        const icon = button.querySelector('i');
        const productElement = button.closest('.product');
        const productId = createProductId(productElement);
        
        // Crear objeto con datos del producto
        const product = {
            id: productId,
            name: productElement.querySelector('h3').textContent,
            price: productElement.querySelector('.price').textContent,
            image: productElement.querySelector('img').src,
            category: productElement.dataset.name
        };
        
        // Verificar si ya está en favoritos
        const existingIndex = favorites.findIndex(fav => fav.id === productId);
        
        if (existingIndex === -1) {
            // Agregar a favoritos
            favorites.push(product);
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
        } else {
            // Quitar de favoritos
            favorites.splice(existingIndex, 1);
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
        }
        
        // Guardar en localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    // Función para crear un ID único para cada producto
    function createProductId(productElement) {
        const name = productElement.querySelector('h3').textContent;
        const img = productElement.querySelector('img').src;
        return name.replace(/\s+/g, '-').toLowerCase() + '-' + img.split('/').pop();
    }
});