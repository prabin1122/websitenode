import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  enum Role {
    SUPER_ADMIN
    ADMIN
    VENDOR
    CUSTOMER
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    role: Role!
    verified: Boolean!
  }

  type Category {
    id: ID!
    name: String!
    slug: String!
    description: String
  }

  type Product {
    id: ID!
    sku: String!
    name: String!
    slug: String!
    description: String!
    price: Float!
    inventory: Int
  }

  type AuthPayload {
    accessToken: String!
    refreshToken: String
  }

  type Query {
    products(query: String, category: String, page: Int, limit: Int): [Product!]!
    product(slug: String!): Product
    me: User
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateProductInput {
    sku: String!
    name: String!
    slug: String!
    description: String!
    price: Float!
    cost: Float!
    categoryIds: [String!]
  }

  type Mutation {
    register(input: RegisterInput!): User!
    login(input: LoginInput!): AuthPayload!
    createProduct(input: CreateProductInput!): Product!
  }
`;
