document.addEventListener('DOMContentLoaded', function() {
    // Cargar favoritos desde localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('favorites-container');
    const noFavoritesMessage = document.getElementById('no-favorites');
    
    // Mostrar mensaje si no hay favoritos
    if (favorites.length === 0) {
        noFavoritesMessage.style.display = 'flex';
        favoritesContainer.style.display = 'none';
    } else {
        noFavoritesMessage.style.display = 'none';
        favoritesContainer.style.display = 'grid';
        
        // Renderizar cada producto favorito
        favorites.forEach(product => {
            const productElement = createProductElement(product);
            favoritesContainer.appendChild(productElement);
        });
    }
    
    // Función para crear el elemento HTML de un producto
    function createProductElement(product) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.dataset.name = product.category;
        productDiv.dataset.id = product.id;
        
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-title-container">
                <h3>${product.name}</h3>
                <button class="remove-favorite-btn" data-id="${product.id}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <p class="price">${product.price}</p>
        `;
        
        // Agregar evento para eliminar de favoritos
        const removeBtn = productDiv.querySelector('.remove-favorite-btn');
        removeBtn.addEventListener('click', function() {
            removeFromFavorites(product.id);
        });
        
        return productDiv;
    }
    
    // Función para eliminar un producto de favoritos
    function removeFromFavorites(productId) {
        // Actualizar array de favoritos
        const updatedFavorites = favorites.filter(fav => fav.id !== productId);
        
        // Guardar en localStorage
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        
        // Eliminar elemento de la página
        const productElement = document.querySelector(`.product[data-id="${productId}"]`);
        if (productElement) {
            productElement.remove();
        }
        
        // Mostrar mensaje si no quedan favoritos
        if (updatedFavorites.length === 0) {
            noFavoritesMessage.style.display = 'flex';
            favoritesContainer.style.display = 'none';
        }
    }
});