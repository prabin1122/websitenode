import AuthService from '../services/auth.service.js';
import ProductService from '../services/product.service.js';
import prisma from '../config/prisma.js';

const resolvers = {
  Query: {
    products: async (_: unknown, args: any) => {
      const { data } = await ProductService.list(args);
      return data;
    },
    product: async (_: unknown, args: { slug: string }) => {
      return await ProductService.findBySlug(args.slug);
    },
    me: async (_: unknown, __: any, context: { user?: { userId: string; role: string } }) => {
      if (!context.user) return null;
      return await prisma.user.findUnique({ where: { id: context.user.userId } });
    },
  },
  Mutation: {
    register: async (_: unknown, { input }: any) => {
      return await AuthService.register({
        email: input.email,
        password: input.password,
        firstName: input.firstName,
        lastName: input.lastName,
      });
    },
    login: async (_: unknown, { input }: any) => {
      return await AuthService.login({
        email: input.email,
        password: input.password,
      });
    },
    createProduct: async (_: unknown, { input }: any) => {
      return await ProductService.create(input);
    },
  },
};

export default resolvers;
