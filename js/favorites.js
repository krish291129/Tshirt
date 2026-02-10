// ============================================
// FAVORITES FUNCTIONALITY
// ============================================

class FavoritesManager {
  constructor() {
    this.favorites = this.loadFavorites();
    this.init();
  }

  loadFavorites() {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  }

  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.updateUI();
  }

  addFavorite(productId) {
    if (!this.favorites.includes(productId)) {
      this.favorites.push(productId);
      this.saveFavorites();
      this.showNotification('Added to favorites ❤️');
      return true;
    }
    return false;
  }

  removeFavorite(productId) {
    const index = this.favorites.indexOf(productId);
    if (index > -1) {
      this.favorites.splice(index, 1);
      this.saveFavorites();
      this.showNotification('Removed from favorites');
      return true;
    }
    return false;
  }

  toggleFavorite(productId) {
    if (this.isFavorite(productId)) {
      return this.removeFavorite(productId);
    } else {
      return this.addFavorite(productId);
    }
  }

  isFavorite(productId) {
    return this.favorites.includes(productId);
  }

  getFavorites() {
    return this.favorites;
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all favorites?')) {
      this.favorites = [];
      this.saveFavorites();
      this.showNotification('All favorites cleared');
    }
  }

  updateUI() {
    // Update all favorite buttons
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
      const productId = btn.dataset.productId;
      if (this.isFavorite(productId)) {
        btn.classList.add('active');
        btn.innerHTML = '❤️';
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '🤍';
      }
    });

    // Update favorite count badge
    const countBadge = document.querySelector('.favorite-count');
    if (countBadge) {
      if (this.favorites.length > 0) {
        countBadge.textContent = this.favorites.length;
        countBadge.style.display = 'block';
      } else {
        countBadge.style.display = 'none';
      }
    }

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('favoritesUpdated', {
      detail: { favorites: this.favorites }
    }));
  }

  init() {
    // Initialize UI
    this.updateUI();

    // Add click handlers
    document.addEventListener('click', (e) => {
      const favoriteBtn = e.target.closest('.favorite-btn');
      if (favoriteBtn) {
        e.preventDefault();
        e.stopPropagation();
        
        const productId = favoriteBtn.dataset.productId;
        this.toggleFavorite(productId);
        
        // Add animation
        favoriteBtn.style.transform = 'scale(1.3)';
        setTimeout(() => {
          favoriteBtn.style.transform = 'scale(1)';
        }, 200);
      }
    });
  }

  showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.favorites-notification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'favorites-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: linear-gradient(135deg, rgba(0, 240, 255, 0.95) 0%, rgba(112, 0, 255, 0.95) 100%);
      color: white;
      padding: 1rem 2rem;
      border-radius: 50px;
      font-family: var(--font-heading);
      font-weight: 600;
      font-size: 0.95rem;
      letter-spacing: 0.05em;
      box-shadow: 0 10px 40px rgba(0, 240, 255, 0.4);
      z-index: 10000;
      animation: slideInUp 0.4s ease, slideOutDown 0.4s ease 2.5s;
      pointer-events: none;
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => notification.remove(), 3000);
  }
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
  @keyframes slideInUp {
    from {
      transform: translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideOutDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(notificationStyle);

// Initialize favorites manager
const favoritesManager = new FavoritesManager();

// Export for use in other scripts
window.favoritesManager = favoritesManager;