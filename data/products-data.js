/**
 * HAITI DIGITAL STORE - PRODUCTS DATA
 * Structure centralisée de tous les produits et catégories
 * 
 * Cette structure permet d'ajouter facilement de nouveaux produits,
 * catégories et options sans modifier le code de l'interface.
 */

const ProductsData = {
  // ============================================
  // CATÉGORIES PRINCIPALES
  // ============================================
  categories: [
    {
      id: 'gaming',
      name: 'Gaming',
      icon: '🎮',
      description: 'Top-ups de jeux populaires',
      order: 1,
      active: true,
    },
    {
      id: 'gift-cards',
      name: 'Gift Cards',
      icon: '🎁',
      description: 'Cartes cadeaux numériques',
      order: 2,
      active: true,
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      icon: '🎵',
      description: 'Services de divertissement',
      order: 3,
      active: true,
    },
    {
      id: 'digital-payments',
      name: 'Paiements Numériques',
      icon: '💳',
      description: 'Services de paiement digital',
      order: 4,
      active: false,
    },
    {
      id: 'virtual-cards',
      name: 'Cartes Virtuelles',
      icon: '💳',
      description: 'Cartes virtuelles et services similaires',
      order: 5,
      active: false,
    },
    {
      id: 'international-orders',
      name: 'Commandes Internationales',
      icon: '🛍️',
      description: 'Demander une commande sur un site international',
      order: 6,
      active: false,
    },
  ],

  // ============================================
  // PRODUITS
  // ============================================
  products: [
    // GAMING CATEGORY
    {
      id: 'free-fire-diamonds',
      name: 'Free Fire Diamonds',
      categoryId: 'gaming',
      description: 'Diamonds pour Free Fire',
      icon: '🎮',
      status: 'coming-soon',
      provider: 'pending',
      currency: 'HTG',
      options: [
        { id: 'ff-50', name: '50 Diamonds', price: null, description: '50 diamants' },
        { id: 'ff-100', name: '100 Diamonds', price: null, description: '100 diamants' },
        { id: 'ff-200', name: '200 Diamonds', price: null, description: '200 diamants' },
      ],
      requiredInfo: ['player-id', 'player-name'],
    },
    {
      id: 'efootball-coins',
      name: 'eFootball Coins',
      categoryId: 'gaming',
      description: 'Coins pour eFootball',
      icon: '🎮',
      status: 'coming-soon',
      provider: 'pending',
      currency: 'HTG',
      options: [
        { id: 'ef-1000', name: '1000 Coins', price: null, description: '1000 pièces' },
        { id: 'ef-2000', name: '2000 Coins', price: null, description: '2000 pièces' },
      ],
      requiredInfo: ['player-id', 'player-name'],
    },
    {
      id: 'cod-mobile-cp',
      name: 'Call of Duty Mobile CP',
      categoryId: 'gaming',
      description: 'CP (Call of Points) pour Call of Duty Mobile',
      icon: '🎮',
      status: 'coming-soon',
      provider: 'pending',
      currency: 'HTG',
      options: [
        { id: 'cod-500', name: '500 CP', price: null, description: '500 CP' },
        { id: 'cod-1000', name: '1000 CP', price: null, description: '1000 CP' },
      ],
      requiredInfo: ['player-id', 'player-name'],
    },
    {
      id: 'pubg-uc',
      name: 'PUBG Mobile UC',
      categoryId: 'gaming',
      description: 'Unknown Cash pour PUBG Mobile',
      icon: '🎮',
      status: 'coming-soon',
      provider: 'pending',
      currency: 'HTG',
      options: [
        { id: 'pubg-600', name: '600 UC', price: null, description: '600 UC' },
        { id: 'pubg-1200', name: '1200 UC', price: null, description: '1200 UC' },
      ],
      requiredInfo: ['player-id', 'player-name'],
    },
    {
      id: 'roblox-robux',
      name: 'Roblox Robux',
      categoryId: 'gaming',
      description: 'Robux pour Roblox',
      icon: '🎮',
      status: 'coming-soon',
      provider: 'pending',
      currency: 'HTG',
      options: [
        { id: 'rbx-400', name: '400 Robux', price: null, description: '400 Robux' },
        { id: 'rbx-800', name: '800 Robux', price: null, description: '800 Robux' },
      ],
      requiredInfo: ['username'],
    },
    {
      id: 'mobile-legends-diamonds',
      name: 'Mobile Legends Diamonds',
      categoryId: 'gaming',
      description: 'Diamonds pour Mobile Legends',
      icon: '🎮',
      status: 'coming-soon',
      provider: 'pending',
      currency: 'HTG',
      options: [
        { id: 'ml-50', name: '50 Diamonds', price: null, description: '50 diamants' },
        { id: 'ml-100', name: '100 Diamonds', price: null, description: '100 diamants' },
      ],
      requiredInfo: ['player-id', 'player-name'],
    },

    // GIFT CARDS CATEGORY
    {
      id: 'google-play',
      name: 'Google Play Card',
      categoryId: 'gift-cards',
      description: 'Cartes Google Play pour les applications et jeux',
      icon: '🎁',
      status: 'coming-soon',
      provider: 'pending',
      currency: 'HTG',
      options: [
        { id: 'gp-10', name: '$10', price: null, description: 'Carte $10' },
        { id: 'gp-25', name: '$25', price: null, description: 'Carte $25' },
        { id: 'gp-50', name: '$50', price: null, description: 'Carte $50' },
      ],
      requiredInfo: ['email'],
    },
    {
      id: 'apple-itunes',
      name: 'Apple iTunes Card',
      categoryId: 'gift-cards',
      description: 'Cartes Apple pour l\'App Store et iTunes',
      icon: '🎁',
      status: 'coming-soon',
      provider: 'pending',
      currency: 'HTG',
      options: [
        { id: 'ap-10', name: '$10', price: null, description: 'Carte $10' },
        { id: 'ap-25', name: '$25', price: null, description: 'Carte $25' },
      ],
      requiredInfo: ['email'],
    },
    {
      id: 'playstation-network',
      name: 'PlayStation Network',
      categoryId: 'gift-cards',
      description: 'Cartes PSN pour PlayStation Store',
      icon: '🎁',
      status: 'coming-soon',
      provider: 'pending',
      currency: 'HTG',
      options: [
        { id: 'psn-10', name: '$10', price: null, description: 'Carte $10' },
        { id: 'psn-20', name: '$20', price: null, description: 'Carte $20' },
      ],
      requiredInfo: ['email', 'psn-account'],
    },
    {
      id: 'xbox-gift-card',
      name: 'Xbox Gift Card',
      categoryId: 'gift-cards',
      description: 'Cartes Xbox pour le Microsoft Store',
      icon: '🎁',
      status: 'coming-soon',
      provider: 'pending',
      currency: 'HTG',
      options: [
        { id: 'xbox-10', name: '$10', price: null, description: 'Carte $10' },
        { id: 'xbox-20', name: '$20', price: null, description: 'Carte $20' },
      ],
      requiredInfo: ['email', 'xbox-gamertag'],
    },
    {
      id: 'steam-gift-card',
      name: 'Steam Gift Card',
      categoryId: 'gift-cards',
      description: 'Cartes Steam pour les jeux PC',
      icon: '🎁',
      status: 'coming-soon',
      provider: 'pending',
      currency: 'HTG',
      options: [
        { id: 'steam-10', name: '$10', price: null, description: 'Carte $10' },
        { id: 'steam-25', name: '$25', price: null, description: 'Carte $25' },
      ],
      requiredInfo: ['email', 'steam-username'],
    },
    {
      id: 'amazon-gift-card',
      name: 'Amazon Gift Card',
      categoryId: 'gift-cards',
      description: 'Cartes cadeaux Amazon',
      icon: '🎁',
      status: 'coming-soon',
      provider: 'pending',
      currency: 'HTG',
      options: [
        { id: 'amz-25', name: '$25', price: null, description: 'Carte $25' },
        { id: 'amz-50', name: '$50', price: null, description: 'Carte $50' },
      ],
      requiredInfo: ['email'],
    },

    // ENTERTAINMENT CATEGORY
    {
      id: 'spotify-premium',
      name: 'Spotify Premium',
      categoryId: 'entertainment',
      description: 'Abonnement Spotify Premium',
      icon: '🎵',
      status: 'coming-soon',
      provider: 'pending',
      currency: 'HTG',
      options: [
        { id: 'spot-1m', name: '1 Mois', price: null, description: 'Abonnement 1 mois' },
        { id: 'spot-3m', name: '3 Mois', price: null, description: 'Abonnement 3 mois' },
      ],
      requiredInfo: ['email'],
    },
    {
      id: 'netflix',
      name: 'Netflix',
      categoryId: 'entertainment',
      description: 'Abonnement Netflix',
      icon: '🎵',
      status: 'coming-soon',
      provider: 'pending',
      currency: 'HTG',
      options: [
        { id: 'net-1m', name: '1 Mois Standard', price: null, description: 'Plan Standard' },
        { id: 'net-1m-premium', name: '1 Mois Premium', price: null, description: 'Plan Premium' },
      ],
      requiredInfo: ['email'],
    },
    {
      id: 'prime-video',
      name: 'Prime Video',
      categoryId: 'entertainment',
      description: 'Abonnement Prime Video',
      icon: '🎵',
      status: 'coming-soon',
      provider: 'pending',
      currency: 'HTG',
      options: [
        { id: 'prime-1m', name: '1 Mois', price: null, description: 'Abonnement 1 mois' },
        { id: 'prime-1y', name: '1 An', price: null, description: 'Abonnement 1 an' },
      ],
      requiredInfo: ['email'],
    },
    {
      id: 'youtube-premium',
      name: 'YouTube Premium',
      categoryId: 'entertainment',
      description: 'Abonnement YouTube Premium',
      icon: '🎵',
      status: 'coming-soon',
      provider: 'pending',
      currency: 'HTG',
      options: [
        { id: 'yt-1m', name: '1 Mois', price: null, description: 'Abonnement 1 mois' },
        { id: 'yt-1y', name: '1 An', price: null, description: 'Abonnement 1 an' },
      ],
      requiredInfo: ['email'],
    },
  ],

  // ============================================
  // INFORMATION TYPES (pour validation/affichage)
  // ============================================
  infoTypes: {
    'player-id': {
      label: 'Identifiant du joueur',
      placeholder: 'ex: 12345678',
      type: 'text',
      required: true,
    },
    'player-name': {
      label: 'Nom du joueur',
      placeholder: 'ex: MonPseudo',
      type: 'text',
      required: true,
    },
    'username': {
      label: 'Nom d\'utilisateur',
      placeholder: 'ex: MonUsername',
      type: 'text',
      required: true,
    },
    'email': {
      label: 'Adresse email',
      placeholder: 'ex: exemple@email.com',
      type: 'email',
      required: true,
    },
    'psn-account': {
      label: 'Compte PSN',
      placeholder: 'ex: MonPSNAccount',
      type: 'text',
      required: true,
    },
    'xbox-gamertag': {
      label: 'Xbox Gamertag',
      placeholder: 'ex: MonGamertag',
      type: 'text',
      required: true,
    },
    'steam-username': {
      label: 'Nom d\'utilisateur Steam',
      placeholder: 'ex: MonSteamName',
      type: 'text',
      required: true,
    },
  },

  // ============================================
  // STATUTS PRODUITS
  // ============================================
  statuses: {
    'available': {
      label: 'Disponible',
      badge: '✅ Disponible',
      color: '#27b56d',
    },
    'coming-soon': {
      label: 'Bientôt disponible',
      badge: '⏳ Bientôt disponible',
      color: '#f59e0b',
    },
    'on-demand': {
      label: 'Sur demande',
      badge: '📞 Sur demande',
      color: '#3b82f6',
    },
    'unavailable': {
      label: 'Indisponible',
      badge: '❌ Indisponible',
      color: '#ef4444',
    },
  },

  // ============================================
  // MÉTHODES POUR ACCÉDER AUX DONNÉES
  // ============================================

  /**
   * Obtenir une catégorie par ID
   */
  getCategory(categoryId) {
    return this.categories.find(cat => cat.id === categoryId);
  },

  /**
   * Obtenir tous les produits d'une catégorie
   */
  getProductsByCategory(categoryId) {
    return this.products.filter(prod => prod.categoryId === categoryId);
  },

  /**
   * Obtenir un produit par ID
   */
  getProduct(productId) {
    return this.products.find(prod => prod.id === productId);
  },

  /**
   * Obtenir les catégories actives uniquement
   */
  getActiveCategories() {
    return this.categories.filter(cat => cat.active).sort((a, b) => a.order - b.order);
  },

  /**
   * Obtenir les produits disponibles d'une catégorie
   */
  getAvailableProducts(categoryId) {
    return this.getProductsByCategory(categoryId).filter(
      prod => prod.status === 'available'
    );
  },

  /**
   * Obtenir les catégories inactives
   */
  getInactiveCategories() {
    return this.categories.filter(cat => !cat.active).sort((a, b) => a.order - b.order);
  },
};

// Export pour Node.js/modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProductsData;
}
