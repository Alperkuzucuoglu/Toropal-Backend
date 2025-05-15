const { createTestServer } = require('../server');
const gql = require('graphql-tag');

// Bu dosya, GraphQL API'yi test etmek için kullanılır

describe('Cart API', () => {
  let server;
  const token = 'test-user-token'; // Her testte kullanılacak sabit kullanıcı token'ı

  beforeEach(() => {
    server = createTestServer({ userToken: token }); // Her test öncesi yeni test sunucusu oluştur
  });

  it('should create a cart', async () => {
    const res = await server.executeOperation({
      query: gql`
        mutation {
          createCart
        }
      `
    });

    expect(res.errors).toBeUndefined(); // Hata olmamalı
    expect(res.data.createCart).toBe('Cart created');
  });

  it('should add an item to the cart', async () => {
    await server.executeOperation({ query: gql`mutation { createCart }` });

    const res = await server.executeOperation({
      query: gql`
        mutation {
          addItem(id: "1", name: "Apple", quantity: 2, unitPrice: 1.5) {
            id
            name
            quantity
            unitPrice
            totalPrice
          }
        }
      `
    });

    expect(res.errors).toBeUndefined();
    expect(res.data.addItem.totalPrice).toBe(3); // 2 * 1.5 = 3
  });

  it('should return cart with total price', async () => {
    const res = await server.executeOperation({
      query: gql`
        query {
          getCart {
            items {
              id
              name
              quantity
              unitPrice
              totalPrice
            }
            total
          }
        }
      `
    });

    expect(res.errors).toBeUndefined();
    expect(res.data.getCart.items.length).toBeGreaterThan(0); // En az bir ürün olmalı
    expect(res.data.getCart.total).toBeGreaterThan(0);  // Toplam tutar pozitif olmalı
  });

  it('should not allow negative quantity when adding item', async () => {
    const res = await server.executeOperation({
      query: gql`
        mutation {
          addItem(id: "2", name: "Banana", quantity: -3, unitPrice: 1.0) {
            id
          }
        }
      `
    });

    expect(res.errors).toBeDefined(); // Negatif değer hataya neden olmalı
    expect(res.errors[0].message).toMatch(/Quantity and price must be positive/);
  });

  it('should return error if item not found on update', async () => {
    const res = await server.executeOperation({
      query: gql`
        mutation {
          updateItemQuantity(id: "999", quantity: 5) {
            id
          }
        }
      `
    });

    expect(res.errors).toBeDefined();
    expect(res.errors[0].message).toMatch(/Item not found/); // Var olmayan ürün için hata
  });
});
