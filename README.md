# 🛒 Toropal Backend - Cart API (GraphQL)

This is a simple in-memory shopping cart backend API developed with **Node.js**, **Apollo Server**, and **GraphQL**. It was created as part of the technical assessment for a Backend Software Engineer position at Toropal.

---

## 🚀 Getting Started

### 1. Install Dependencies
```
npm install
```

### 2. Run the Server
```
node index.js
```

Server will start at: `http://localhost:4000/`

---

## 🔐 Authorization

Every request must include a valid `Authorization` header:

```
Authorization: Bearer <any-non-empty-token>
```

This token is used to associate a user with their unique cart.

---

## 🧠 GraphQL Schema Summary

### Types
- `Item`: Represents a product in the cart
- `Cart`: Contains a list of items and total price

### Queries
- `getCart`: Get current user's cart

### Mutations
- `createCart`: Create a new empty cart
- `addItem`: Add a product to the cart
- `updateItemQuantity`: Change the quantity of an item
- `removeItem`: Remove an item from the cart
- `clearCart`: Clear all items (bonus)

---

## 🧪 Running Tests

### Run all tests:
```
npm test
```

Tests are written using `jest` and located under the `__tests__` directory.

---

## 🧾 Example Mutation (Add Item)

```graphql
mutation {
  addItem(id: "1", name: "Apple", quantity: 2, unitPrice: 1.5) {
    id
    name
    quantity
    unitPrice
    totalPrice
  }
}
```

---

## ⚙️ Tech Stack
- Node.js
- Apollo Server (GraphQL)
- In-Memory Storage (Map)
- Jest + Supertest (Testing)

---

## 📂 Project Structure
```
toropal-backend/
├── index.js
├── schema.js
├── resolvers.js
├── server.js
├── __tests__/
│   └── cart.test.js
├── README.md
└── design.md
```

---

## 📬 Contact
alperkuzucuoglu@gmail.com / linkedin.com/in/alperkuzucuoglu/
Created by Alper Kuzucuoglu for the Toropal technical interview.