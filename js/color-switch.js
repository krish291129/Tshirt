// ============================================
// COLOR SWITCHING FUNCTIONALITY
// ============================================

class ColorSwitcher {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('click', (e) => {
      const colorDot = e.target.closest('.color-dot');
      if (colorDot) {
        e.preventDefault();
        e.stopPropagation();
        this.handleColorSwitch(colorDot);
      }
    });
  }

  handleColorSwitch(colorDot) {
    const productCard = colorDot.closest('.product-card');
    if (!productCard) return;

    const colorOptions = productCard.querySelectorAll('.color-dot');
    const productImage = productCard.querySelector('.product-image');
    const newImageSrc = colorDot.dataset.image;
    const colorName = colorDot.dataset.color;

    // Remove active class from all dots
    colorOptions.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to clicked dot
    colorDot.classList.add('active');

    // Animate image change
    if (productImage && newImageSrc) {
      // Fade out
      productImage.style.opacity = '0';
      productImage.style.transform = 'scale(0.95)';

      setTimeout(() => {
        // Change image
        productImage.src = newImageSrc;
        
        // Fade in
        setTimeout(() => {
          productImage.style.opacity = '1';
          productImage.style.transform = 'scale(1)';
        }, 50);
      }, 200);

      // Add transition
      productImage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }

    // Animate color dot
    colorDot.style.transform = 'scale(1.2)';
    setTimeout(() => {
      colorDot.style.transform = 'scale(1)';
    }, 200);

    // Show color change notification (optional)
    this.showColorNotification(colorName);
  }

  showColorNotification(colorName) {
    if (!colorName) return;

    // Remove existing notification
    const existing = document.querySelector('.color-notification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'color-notification';
    notification.innerHTML = `Color: <strong>${colorName}</strong>`;
    notification.style.cssText = `
      position: fixed;
      top: 120px;
      right: 30px;
      background: rgba(26, 26, 40, 0.95);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: white;
      padding: 0.8rem 1.5rem;
      border-radius: 50px;
      font-family: var(--font-heading);
      font-size: 0.85rem;
      letter-spacing: 0.05em;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
      z-index: 10000;
      animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 1.5s;
      pointer-events: none;
    `;

    document.body.appendChild(notification);

    // Auto remove
    setTimeout(() => notification.remove(), 2000);
  }
}

// Add notification animations
const colorNotificationStyle = document.createElement('style');
colorNotificationStyle.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100px);
      opacity: 0;
    }
  }

  .color-notification strong {
    color: var(--color-accent-cyan);
    font-weight: 700;
  }
`;
document.head.appendChild(colorNotificationStyle);

// Initialize color switcher
const colorSwitcher = new ColorSwitcher();

// Export for use in other scripts
window.colorSwitcher = colorSwitcher;