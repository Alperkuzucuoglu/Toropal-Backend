const { gql } = require('apollo-server');

const typeDefs = gql`
  type Item {
    id: ID!
    name: String!
    quantity: Int!
    unitPrice: Float!
    totalPrice: Float!
  }

  type Cart {
    items: [Item!]!
    total: Float!
  }

  type Query {
    getCart: Cart!
    getAnItem(id: ID!): Item
  }

  type Mutation {
    createCart: String!
    addItem(id: ID!, name: String!, quantity: Int!, unitPrice: Float!): Item!
    updateItemQuantity(id: ID!, quantity: Int!): Item!
    removeItem(id: ID!): String!
    clearCart: String!
  }
`;

module.exports = typeDefs;
