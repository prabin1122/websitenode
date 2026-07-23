import prisma from '../config/prisma.js';
import { Prisma } from '@prisma/client';

const ProductService = {
  async list(query: Record<string, any>) {
    const page = Number(query.page ?? 1);
    const perPage = Math.min(Number(query.limit ?? 20), 100);
    const where: any = {};

    if (query.category) {
      where.categories = { some: { slug: { equals: query.category } } };
    }
    if (query.query) {
      where.OR = [
        { name: { contains: query.query, mode: 'insensitive' } },
        { description: { contains: query.query, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: { createdAt: 'desc' },
      include: { categories: true, images: true, inventory: true },
    });

    return { data: products, meta: { page, perPage } };
  },

  async findBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { categories: true, images: true, inventory: true, variants: true, reviews: { where: { published: true } } },
    });
    if (!product) throw new Error('Product not found');
    return product;
  },

  async create(payload: any) {
    const product = await prisma.product.create({
      data: {
        ...payload,
        price: new Prisma.Decimal(payload.price),
        cost: new Prisma.Decimal(payload.cost),
        categories: { connect: payload.categoryIds?.map((id: string) => ({ id })) ?? [] },
      },
    });
    return product;
  },

  async update(id: string, payload: any) {
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...payload,
        price: payload.price ? new Prisma.Decimal(payload.price) : undefined,
        cost: payload.cost ? new Prisma.Decimal(payload.cost) : undefined,
      },
    });
    return product;
  },

  async delete(id: string) {
    await prisma.product.delete({ where: { id } });
  },
};

export default ProductService;
