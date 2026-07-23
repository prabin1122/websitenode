import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import { authGuard } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', ProductController.list);
router.get('/:slug', ProductController.getBySlug);
router.post('/', authGuard(['ADMIN', 'VENDOR', 'SUPER_ADMIN']), ProductController.create);
router.put('/:id', authGuard(['ADMIN', 'VENDOR', 'SUPER_ADMIN']), ProductController.update);
router.delete('/:id', authGuard(['ADMIN', 'SUPER_ADMIN']), ProductController.delete);

export default router;
