/**
 * HAITI DIGITAL STORE - CART SYSTEM
 * Gestion du panier et préparation des commandes WhatsApp
 *
 * Prototype local pour demande de commande sans paiement réel.
 * Le numéro WhatsApp est centralisé dans config/site-config.js.
 */

const CartSystem = {
  STORAGE_KEY: 'hds_cart',
  MAX_QUANTITY: 100,
  MIN_QUANTITY: 1,

  getWhatsAppNumber() {
    return HDSConfig && HDSConfig.whatsappNumber ? HDSConfig.whatsappNumber : '50948471374';
  },

  init() {
    if (!this.getCart()) {
      this.saveCart([]);
    }
  },

  getCart() {
    try {
      const cart = localStorage.getItem(this.STORAGE_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Erreur lecture panier:', error);
      return [];
    }
  },

  saveCart(items) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      return true;
    } catch (error) {
      console.error('Erreur sauvegarde panier:', error);
      return false;
    }
  },

  validateQuantity(quantity) {
    if (typeof quantity !== 'number' || Number.isNaN(quantity)) {
      return { valid: false, value: this.MIN_QUANTITY, reason: 'La quantité doit être un nombre.' };
    }

    const intQuantity = Math.floor(quantity);

    if (intQuantity < this.MIN_QUANTITY) {
      return { valid: false, value: this.MIN_QUANTITY, reason: `La quantité minimum est ${this.MIN_QUANTITY}.` };
    }

    if (intQuantity > this.MAX_QUANTITY) {
      return { valid: false, value: this.MAX_QUANTITY, reason: `La quantité maximum est ${this.MAX_QUANTITY}.` };
    }

    return { valid: true, value: intQuantity, reason: '' };
  },

  addItem(item) {
    if (!item || !item.productId || !item.optionId) {
      return { success: false, message: 'Données manquantes pour ajouter un article.' };
    }

    const product = ProductsData.getProduct(item.productId);
    if (!product) {
      return { success: false, message: `Produit introuvable: ${item.productId}` };
    }

    if (product.status !== 'available') {
      return { success: false, message: 'Ce produit n\'est pas disponible pour le moment.' };
    }

    const option = product.options.find(opt => opt.id === item.optionId);
    if (!option) {
      return { success: false, message: `Option introuvable: ${item.optionId}` };
    }

    const quantityValidation = this.validateQuantity(item.quantity || 1);
    if (!quantityValidation.valid) {
      return { success: false, message: quantityValidation.reason };
    }

    const cart = this.getCart();
    const cartItem = {
      id: `${item.productId}-${item.optionId}-${Date.now()}`,
      productId: item.productId,
      optionId: item.optionId,
      quantity: quantityValidation.value,
      customerInfo: item.customerInfo || {},
      addedAt: new Date().toISOString(),
    };

    cart.push(cartItem);
    this.saveCart(cart);
    return { success: true, message: 'Article ajouté au panier.' };
  },

  removeItem(itemId) {
    const cart = this.getCart().filter(item => item.id !== itemId);
    this.saveCart(cart);
    return true;
  },

  clearCart() {
    this.saveCart([]);
    return true;
  },

  getItemCount() {
    return this.getCart().length;
  },

  getCartSummary() {
    return this.getCart().map(item => {
      const product = ProductsData.getProduct(item.productId);
      const option = product ? product.options.find(opt => opt.id === item.optionId) : null;

      return {
        ...item,
        product: product || null,
        option: option || null,
      };
    });
  },

  generateWhatsAppMessage(items = null) {
    const cartItems = items || this.getCart();

    if (cartItems.length === 0) {
      return 'Bonjour, je souhaite passer une commande sur Haiti Digital Store.';
    }

    let message = 'Bonjour,\n\n';
    message += 'Je souhaite passer une commande sur Haiti Digital Store.\n\n';
    message += '📋 *Détails de la commande :*\n';
    message += '―――――――――――――――――――\n';

    cartItems.forEach((item, index) => {
      const product = ProductsData.getProduct(item.productId);
      if (!product) return;

      const option = product.options.find(opt => opt.id === item.optionId);
      if (!option) return;

      message += `\n${index + 1}. *${product.name}*\n`;
      message += `   Option: ${option.name}\n`;
      message += `   Quantité: ${item.quantity}\n`;

      if (item.customerInfo && Object.keys(item.customerInfo).length > 0) {
        message += '   Infos client:\n';
        Object.entries(item.customerInfo).forEach(([key, value]) => {
          const infoType = ProductsData.infoTypes[key];
          const label = infoType ? infoType.label : key;
          message += `      • ${label}: ${value}\n`;
        });
      }
    });

    message += '\n―――――――――――――――――――\n';
    message += '\n💬 Veuillez confirmer la disponibilité et les tarifs.\n';
    message += 'Merci!\n';

    return message;
  },

  getWhatsAppLink(items = null) {
    const message = this.generateWhatsAppMessage(items);
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = this.getWhatsAppNumber();
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  },

  openWhatsAppChat(items = null) {
    const link = this.getWhatsAppLink(items);
    window.open(link, '_blank');
  },

  validateItem(itemId) {
    const item = this.getCart().find(entry => entry.id === itemId);
    if (!item) {
      return { valid: false, reason: 'Article introuvable.' };
    }

    const product = ProductsData.getProduct(item.productId);
    if (!product) {
      return { valid: false, reason: 'Produit introuvable.' };
    }

    if (product.status !== 'available') {
      if (product.status === 'coming-soon') {
        return { valid: false, reason: 'Ce produit sera disponible bientôt.' };
      }
      if (product.status === 'on-demand') {
        return { valid: false, reason: 'Ce produit est sur demande.' };
      }
      if (product.status === 'unavailable') {
        return { valid: false, reason: 'Ce produit n\'est pas disponible.' };
      }
      return { valid: false, reason: 'Ce produit ne peut pas être commandé pour le moment.' };
    }

    const option = product.options.find(opt => opt.id === item.optionId);
    if (!option) {
      return { valid: false, reason: 'Option invalide.' };
    }

    const quantityValidation = this.validateQuantity(item.quantity);
    if (!quantityValidation.valid) {
      return { valid: false, reason: quantityValidation.reason };
    }

    return { valid: true, reason: '' };
  },

  exportCartData() {
    return {
      timestamp: new Date().toISOString(),
      items: this.getCartSummary(),
      itemCount: this.getItemCount(),
    };
  },
};

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    CartSystem.init();
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CartSystem;
}
