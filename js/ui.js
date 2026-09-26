/**
 * HAITI DIGITAL STORE - UI
 * Gestion de l'affichage des produits, catégories et panier.
 */

const UI = {
  init() {
    this.updateCartCount();
    this.bindCartEvents();
  },

  updateCartCount() {
    const countElement = document.getElementById('hds-cart-count');

    if (countElement && typeof CartSystem !== 'undefined') {
      countElement.textContent = CartSystem.getItemCount();
    }
  },

  showCategory(categoryId) {
    const container = document.getElementById('hds-products-container');

    if (!container || typeof ProductsData === 'undefined') {
      return;
    }

    const category = ProductsData.getCategory(categoryId);
    const products = ProductsData.getProductsByCategory(categoryId);

    if (!category) {
      container.innerHTML = `
        <h1>Catégorie introuvable</h1>
        <p>Cette catégorie n'existe pas.</p>
      `;
      return;
    }

    let html = `
      <p class="eyebrow">HAITI DIGITAL STORE</p>
      <h1>${category.name}</h1>
      <p class="lead">${category.description || ''}</p>
      <div class="grid" style="margin-top:40px;">
    `;

    if (!products || products.length === 0) {
      html += `
        <article>
          <h3>Aucun produit</h3>
          <p>Aucun produit n'est disponible dans cette catégorie pour le moment.</p>
        </article>
      `;
    } else {
      products.forEach(product => {
        const available = product.status === 'available';

        html += `
          <article>
            <div class="icon">${product.icon || '📦'}</div>
            <h3>${product.name}</h3>
            <p>${product.description || ''}</p>

            <p>
              <strong>
                ${available ? 'Disponible' : 'Bientôt disponible'}
              </strong>
            </p>

            ${
              available
                ? `<button
                    class="btn primary"
                    type="button"
                    onclick="UI.addProduct('${product.id}')">
                    Ajouter au panier
                  </button>`
                : `<button
                    class="btn secondary"
                    type="button"
                    disabled>
                    Bientôt disponible
                  </button>`
            }
          </article>
        `;
      });
    }

    html += `</div>`;
    container.innerHTML = html;
  },

  addProduct(productId) {
    const product = ProductsData.getProduct(productId);

    if (!product || !product.options || product.options.length === 0) {
      alert('Aucune option disponible pour ce produit.');
      return;
    }

    const option = product.options[0];

    const result = CartSystem.addItem({
      productId: product.id,
      optionId: option.id,
      quantity: 1
    });

    alert(result.message);

    if (result.success) {
      this.updateCartCount();
    }
  },

  showCart() {
    const productsContainer = document.getElementById('hds-products-container');
    const cartContainer = document.getElementById('hds-cart-container');

    if (!cartContainer) {
      alert('Le panier n’est pas disponible sur cette page.');
      return;
    }

    if (productsContainer) {
      productsContainer.style.display = 'none';
    }

    cartContainer.style.display = 'block';

    const items = CartSystem.getCartSummary();

    if (items.length === 0) {
      cartContainer.innerHTML = `
        <h2>Votre panier</h2>
        <p>Votre panier est vide.</p>
        <button class="btn secondary" onclick="UI.hideCart()">
          Retour aux produits
        </button>
      `;
      return;
    }

    let html = `
      <h2>Votre panier</h2>
    `;

    items.forEach(item => {
      html += `
        <article style="background:#fff;padding:24px;border-radius:20px;margin-bottom:16px;border:1px solid #e2e5e2;">
          <h3>${item.product ? item.product.name : 'Produit'}</h3>
          <p>Option : ${item.option ? item.option.name : '—'}</p>
          <p>Quantité : ${item.quantity}</p>

          <button
            class="btn secondary"
            type="button"
            onclick="UI.removeFromCart('${item.id}')">
            Retirer
          </button>
        </article>
      `;
    });

    html += `
      <button class="btn primary" type="button" onclick="UI.openWhatsApp()">
        Commander sur WhatsApp
      </button>

      <button class="btn secondary" type="button" onclick="UI.clearCart()">
        Vider le panier
      </button>

      <button class="btn secondary" type="button" onclick="UI.hideCart()">
        Retour aux produits
      </button>
    `;

    cartContainer.innerHTML = html;
  },

  hideCart() {
    const productsContainer = document.getElementById('hds-products-container');
    const cartContainer = document.getElementById('hds-cart-container');

    if (productsContainer) {
      productsContainer.style.display = 'block';
    }

    if (cartContainer) {
      cartContainer.style.display = 'none';
    }
  },

  removeFromCart(itemId) {
    CartSystem.removeItem(itemId);
    this.updateCartCount();
    this.showCart();
  },

  clearCart() {
    CartSystem.clearCart();
    this.updateCartCount();
    this.showCart();
  },

  openWhatsApp() {
    CartSystem.openWhatsAppChat();
  },

  bindCartEvents() {
    this.updateCartCount();
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UI;
}
