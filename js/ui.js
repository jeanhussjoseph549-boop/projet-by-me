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
    if (typeof CartSystem === 'undefined') {
      alert('Le système du panier n’est pas disponible.');
      return;
    }

    let cartContainer = document.getElementById('hds-cart-container');

    if (!cartContainer) {
      cartContainer = document.createElement('div');
      cartContainer.id = 'hds-cart-container';

      cartContainer.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 1000;
        background: rgba(16, 19, 18, 0.45);
        padding: 30px 7%;
        overflow-y: auto;
      `;

      document.body.appendChild(cartContainer);
    }

    const items = CartSystem.getCartSummary();

    let html = `
      <div style="
        max-width:700px;
        margin:40px auto;
        background:#f5f6f3;
        padding:30px;
        border-radius:24px;
      ">
        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:20px;
          margin-bottom:25px;
        ">
          <h2 style="margin:0;">Votre panier</h2>

          <button
            class="btn secondary"
            type="button"
            onclick="UI.hideCart()">
            Fermer
          </button>
        </div>
    `;

    if (items.length === 0) {
      html += `
        <p>Votre panier est vide.</p>
      `;
    } else {
      items.forEach(item => {
        html += `
          <article style="
            background:#fff;
            padding:24px;
            border-radius:20px;
            margin-bottom:16px;
            border:1px solid #e2e5e2;
          ">
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
        <div style="
          display:flex;
          flex-wrap:wrap;
          gap:12px;
          margin-top:20px;
        ">
          <button
            class="btn primary"
            type="button"
            onclick="UI.openWhatsApp()">
            Commander sur WhatsApp
          </button>

          <button
            class="btn secondary"
            type="button"
            onclick="UI.clearCart()">
            Vider le panier
          </button>
        </div>
      `;
    }

    html += `</div>`;

    cartContainer.innerHTML = html;
    cartContainer.style.display = 'block';
  },

  hideCart() {
    const cartContainer = document.getElementById('hds-cart-container');

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