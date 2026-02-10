// ============================================
// MODAL VIEW FUNCTIONALITY
// ============================================

class ModalView {
  constructor() {
    this.modal = null;
    this.createModal();
    this.init();
  }

  createModal() {
    // Create modal HTML structure
    this.modal = document.createElement('div');
    this.modal.className = 'product-modal hidden';
    this.modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <button class="modal-close" aria-label="Close modal">
          <span>✕</span>
        </button>
        <div class="modal-grid">
          <div class="modal-image-section">
            <div class="modal-image-container">
              <img src="" alt="" class="modal-image" id="modal-product-image">
              <div class="zoom-hint">Click to zoom</div>
            </div>
          </div>
          <div class="modal-info-section">
            <div class="modal-category" id="modal-category"></div>
            <h2 class="modal-title" id="modal-title"></h2>
            <div class="modal-price" id="modal-price"></div>
            <div class="modal-rating">
              <div class="stars">★★★★★</div>
              <span class="rating-text">(4.8/5.0 · 234 reviews)</span>
            </div>
            <div class="modal-description" id="modal-description"></div>
            <div class="modal-details">
              <h4>Product Details</h4>
              <ul id="modal-details-list"></ul>
            </div>
            <div class="modal-sizes">
              <h4>Select Size</h4>
              <div class="size-options">
                <button class="size-btn">XS</button>
                <button class="size-btn">S</button>
                <button class="size-btn active">M</button>
                <button class="size-btn">L</button>
                <button class="size-btn">XL</button>
                <button class="size-btn">XXL</button>
              </div>
            </div>
            <div class="modal-colors">
              <h4>Available Colors</h4>
              <div class="modal-color-options" id="modal-colors"></div>
            </div>
            <div class="modal-actions">
              <button class="modal-favorite-btn" id="modal-favorite">
                🤍 <span>Add to Favorites</span>
              </button>
              <button class="btn-primary modal-cta">
                View Full Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add modal styles
    this.addModalStyles();
    
    // Append to body
    document.body.appendChild(this.modal);
  }

  addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .product-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }

      .product-modal:not(.hidden) {
        opacity: 1;
        visibility: visible;
      }

      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 10, 15, 0.95);
        backdrop-filter: blur(20px);
        z-index: 1;
      }

      .modal-content {
        position: relative;
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-xl);
        max-width: 1200px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        z-index: 2;
        box-shadow: 0 20px 80px rgba(0, 0, 0, 0.8);
        transform: scale(0.9);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .product-modal:not(.hidden) .modal-content {
        transform: scale(1);
      }

      .modal-close {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        background: rgba(0, 0, 0, 0.8);
        border: 1px solid var(--glass-border);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 3;
        transition: var(--transition-fast);
        color: white;
        font-size: 1.5rem;
      }

      .modal-close:hover {
        background: var(--color-accent-magenta);
        transform: rotate(90deg) scale(1.1);
        box-shadow: var(--glow-magenta);
      }

      .modal-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        padding: 3rem;
      }

      .modal-image-container {
        position: relative;
        width: 100%;
        padding-top: 120%;
        background: var(--color-bg-secondary);
        border-radius: var(--radius-lg);
        overflow: hidden;
        cursor: zoom-in;
      }

      .modal-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      .modal-image-container:hover .modal-image {
        transform: scale(1.1);
      }

      .zoom-hint {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-family: var(--font-heading);
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
      }

      .modal-image-container:hover .zoom-hint {
        opacity: 1;
      }

      .modal-info-section {
        overflow-y: auto;
        padding-right: 1rem;
      }

      .modal-category {
        font-family: var(--font-heading);
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--color-accent-cyan);
        margin-bottom: 1rem;
      }

      .modal-title {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      .modal-price {
        font-family: var(--font-display);
        font-size: 2rem;
        font-weight: 900;
        color: var(--color-accent-gold);
        margin-bottom: 1.5rem;
        letter-spacing: 0.05em;
      }

      .modal-rating {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid var(--glass-border);
      }

      .stars {
        color: var(--color-accent-gold);
        font-size: 1.2rem;
      }

      .rating-text {
        font-size: 0.9rem;
        color: var(--color-text-secondary);
      }

      .modal-description {
        line-height: 1.8;
        margin-bottom: 2rem;
        color: var(--color-text-secondary);
      }

      .modal-details h4,
      .modal-sizes h4,
      .modal-colors h4 {
        font-family: var(--font-heading);
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: var(--color-text-primary);
      }

      .modal-details {
        margin-bottom: 2rem;
      }

      .modal-details ul {
        list-style: none;
        padding: 0;
      }

      .modal-details li {
        padding: 0.6rem 0;
        color: var(--color-text-secondary);
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        display: flex;
        justify-content: space-between;
      }

      .modal-details li strong {
        color: var(--color-text-primary);
      }

      .modal-sizes {
        margin-bottom: 2rem;
      }

      .size-options {
        display: flex;
        gap: 0.8rem;
        flex-wrap: wrap;
      }

      .size-btn {
        padding: 0.8rem 1.5rem;
        background: transparent;
        border: 2px solid var(--glass-border);
        color: var(--color-text-primary);
        font-family: var(--font-heading);
        font-weight: 600;
        border-radius: var(--radius-sm);
        cursor: pointer;
        transition: var(--transition-fast);
      }

      .size-btn:hover {
        border-color: var(--color-accent-cyan);
        color: var(--color-accent-cyan);
        background: rgba(0, 240, 255, 0.1);
      }

      .size-btn.active {
        border-color: var(--color-accent-cyan);
        background: var(--color-accent-cyan);
        color: var(--color-bg-primary);
      }

      .modal-colors {
        margin-bottom: 2rem;
      }

      .modal-color-options {
        display: flex;
        gap: 1rem;
      }

      .modal-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
      }

      .modal-favorite-btn {
        flex: 1;
        padding: 1rem;
        background: transparent;
        border: 2px solid var(--color-accent-magenta);
        color: var(--color-accent-magenta);
        font-family: var(--font-heading);
        font-weight: 600;
        letter-spacing: 0.08em;
        border-radius: var(--radius-sm);
        cursor: pointer;
        transition: var(--transition-fast);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }

      .modal-favorite-btn:hover {
        background: var(--color-accent-magenta);
        color: white;
        box-shadow: var(--glow-magenta);
      }

      .modal-favorite-btn.active {
        background: var(--color-accent-magenta);
        color: white;
      }

      .modal-cta {
        flex: 2;
      }

      @media (max-width: 968px) {
        .modal-grid {
          grid-template-columns: 1fr;
          gap: 2rem;
          padding: 2rem;
        }

        .modal-title {
          font-size: 2rem;
        }

        .modal-actions {
          flex-direction: column;
        }
      }

      @media (max-width: 480px) {
        .product-modal {
          padding: 0;
        }

        .modal-content {
          border-radius: 0;
          max-height: 100vh;
        }

        .modal-grid {
          padding: 1.5rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  init() {
    // Close modal handlers
    const overlay = this.modal.querySelector('.modal-overlay');
    const closeBtn = this.modal.querySelector('.modal-close');

    overlay.addEventListener('click', () => this.close());
    closeBtn.addEventListener('click', () => this.close());

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
        this.close();
      }
    });

    // Size button handlers
    const sizeButtons = this.modal.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // View More button handlers
    document.addEventListener('click', (e) => {
      const viewBtn = e.target.closest('.btn-view');
      if (viewBtn) {
        e.preventDefault();
        const productCard = viewBtn.closest('.product-card');
        if (productCard) {
          this.open(productCard);
        }
      }
    });
  }

  open(productCard) {
    // Extract product data
    const image = productCard.querySelector('.product-image')?.src || '';
    const category = productCard.querySelector('.product-category')?.textContent || 'Premium';
    const name = productCard.querySelector('.product-name')?.textContent || 'T-Shirt';
    const price = productCard.querySelector('.product-price')?.textContent || '$29.99';
    const productId = productCard.querySelector('.favorite-btn')?.dataset.productId || '';

    // Populate modal
    document.getElementById('modal-product-image').src = image;
    document.getElementById('modal-category').textContent = category;
    document.getElementById('modal-title').textContent = name;
    document.getElementById('modal-price').textContent = price;
    document.getElementById('modal-description').textContent = 
      'Experience premium comfort with our futuristic T-shirt design. Crafted from high-quality materials with innovative fabric technology for ultimate breathability and style.';

    // Product details
    const detailsList = document.getElementById('modal-details-list');
    detailsList.innerHTML = `
      <li><strong>Material:</strong> <span>100% Premium Cotton</span></li>
      <li><strong>Fabric:</strong> <span>Breathable Tech Weave</span></li>
      <li><strong>Fit:</strong> <span>Regular Slim Fit</span></li>
      <li><strong>Care:</strong> <span>Machine Washable</span></li>
      <li><strong>Origin:</strong> <span>Designed in USA</span></li>
    `;

    // Color options
    const colorOptions = productCard.querySelectorAll('.color-dot');
    const modalColors = document.getElementById('modal-colors');
    modalColors.innerHTML = '';
    colorOptions.forEach(dot => {
      const newDot = dot.cloneNode(true);
      modalColors.appendChild(newDot);
    });

    // Favorite button
    const modalFavoriteBtn = document.getElementById('modal-favorite');
    modalFavoriteBtn.dataset.productId = productId;
    if (window.favoritesManager && window.favoritesManager.isFavorite(productId)) {
      modalFavoriteBtn.classList.add('active');
      modalFavoriteBtn.innerHTML = '❤️ <span>Added to Favorites</span>';
    } else {
      modalFavoriteBtn.classList.remove('active');
      modalFavoriteBtn.innerHTML = '🤍 <span>Add to Favorites</span>';
    }

    modalFavoriteBtn.onclick = () => {
      if (window.favoritesManager) {
        window.favoritesManager.toggleFavorite(productId);
        if (window.favoritesManager.isFavorite(productId)) {
          modalFavoriteBtn.classList.add('active');
          modalFavoriteBtn.innerHTML = '❤️ <span>Added to Favorites</span>';
        } else {
          modalFavoriteBtn.classList.remove('active');
          modalFavoriteBtn.innerHTML = '🤍 <span>Add to Favorites</span>';
        }
      }
    };

    // Show modal
    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Initialize modal view
const modalView = new ModalView();

// Export for use in other scripts
window.modalView = modalView;