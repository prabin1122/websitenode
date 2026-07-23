import { Request, Response } from 'express';
import ProductService from '../services/product.service.js';

const ProductController = {
  async list(req: Request, res: Response) {
    const products = await ProductService.list(req.query);
    return res.json({ status: 'success', data: products });
  },

  async getBySlug(req: Request, res: Response) {
    const product = await ProductService.findBySlug(req.params.slug);
    return res.json({ status: 'success', data: product });
  },

  async create(req: Request, res: Response) {
    const product = await ProductService.create(req.body);
    return res.status(201).json({ status: 'success', data: product });
  },

  async update(req: Request, res: Response) {
    const product = await ProductService.update(req.params.id, req.body);
    return res.json({ status: 'success', data: product });
  },

  async delete(req: Request, res: Response) {
    await ProductService.delete(req.params.id);
    return res.status(204).send();
  },
};

export default ProductController;
