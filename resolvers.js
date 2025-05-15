const carts = new Map(); // Kullanıcı token'ına göre sepet saklayan bellek içi veri yapısı

module.exports = {
  Query: {
    getCart: (_, __, { userToken }) => {
      const cart = carts.get(userToken) || [];
      const total = cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
      return {
        items: cart.map(item => ({
          ...item,
          totalPrice: item.quantity * item.unitPrice,
        })),
        total,
      };
    },
  },

  Mutation: {
    // Yeni boş bir sepet oluşturur (aslında boş bir array ekler)
    createCart: (_, __, { userToken }) => {
      carts.set(userToken, []);
      return 'Cart created';
    },

    // Sepete yeni ürün ekler
    addItem: (_, { id, name, quantity, unitPrice }, { userToken }) => {
      if (quantity <= 0 || unitPrice < 0) {
        throw new Error('Quantity and price must be positive');
      }

      const cart = carts.get(userToken) || [];
      const existingItem = cart.find(item => item.id === id);

      if (existingItem) {
        throw new Error('Item already exists in cart');
      }

      const newItem = { id, name, quantity, unitPrice };
      cart.push(newItem);
      carts.set(userToken, cart);
      return { ...newItem, totalPrice: quantity * unitPrice };
    },

    // Sepetteki ürün miktarını günceller
    updateItemQuantity: (_, { id, quantity }, { userToken }) => {
      if (quantity < 0) {
        throw new Error('Quantity cannot be negative');
      }

      const cart = carts.get(userToken);
      if (!cart) throw new Error('Cart not found');

      const item = cart.find(item => item.id === id);
      if (!item) throw new Error('Item not found');

      item.quantity = quantity;
      return { ...item, totalPrice: item.quantity * item.unitPrice };
    },

    // Sepetten bir ürün siler
    removeItem: (_, { id }, { userToken }) => {
      const cart = carts.get(userToken);
      if (!cart) throw new Error('Cart not found');

      const index = cart.findIndex(item => item.id === id);
      if (index === -1) throw new Error('Item not found');

      cart.splice(index, 1);
      return 'Item removed';
    },

    // Sepeti tamamen temizler (Bonus)
    clearCart: (_, __, { userToken }) => {
      carts.set(userToken, []);
      return 'Cart cleared';
    },
  },
};
