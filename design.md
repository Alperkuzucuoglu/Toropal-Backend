# 🛠️ Design Document – Toropal Cart API

This document provides a high-level overview of the architecture, request flow, and technical decisions made for the Toropal eCommerce Cart API.

---

## 1. High-Level Architecture

**Components:**
- **GraphQL API (Apollo Server)**: Handles all incoming requests.
- **Auth Stub (Context)**: Extracts token from headers and determines the user.
- **In-Memory Data Store**: Stores cart data in a JavaScript Map per user.
- **Resolvers**: Business logic layer implementing GraphQL operations.

```
[Client]
   ↓
[GraphQL Request → Apollo Server]
   ↓ (Extract token from header)
[Context] → [Resolvers] → [In-memory DB (Map)] → Response
```

---

## 2. Request Flow Example – "Add Item to Cart"

1. Client sends a GraphQL mutation with Authorization header.
2. Server extracts userToken from header.
3. Resolver `addItem()` is called with userToken and item data.
4. Resolver validates input, updates the cart array in Map.
5. Returns the added item with calculated total price.

---

## 3. Technology & Design Decisions

### 🔹 GraphQL vs REST
GraphQL was chosen for its flexibility in querying exactly the data needed. This allows better control over response structure and reduces overfetching.

### 🔹 In-Memory vs SQLite
In-memory `Map` was used for simplicity and speed in this exercise context. It simulates user-specific isolated storage and avoids persistent complexity.

### 🔹 Authentication
Token-based mock auth using context injection. Any non-empty Bearer token is accepted.

---

## 4. Trade-offs
- **In-memory storage** is volatile — not suitable for production.
- **No persistence or real user auth** — as required by the scope.

---

## 5. Diagram (Request Lifecycle)

```
[Client]
   ↓ (GraphQL Mutation)
[Apollo Server]
   ↓
[Context Auth Extractor]
   ↓
[Resolver Logic]
   ↓
[In-Memory Map]
   ↓
[GraphQL Response]
```

---

## ✅ Summary
This design prioritizes simplicity, separation of concerns, and testability. It meets the requirements using clean code structure and clear user isolation based on tokens.
