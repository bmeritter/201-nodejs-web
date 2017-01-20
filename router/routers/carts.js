import {Router} from 'express';
import CartController from '../../controller/CartController';

const router = Router();
const cartCml = new CartController();

router.get('/', cartCml.getAll);
router.get('/:cartId', cartCml.getCart);
router.delete('/:cartId', cartCml.deleteCart);
router.post('/', cartCml.addCart);
router.put('/:cartId', cartCml.updateCart);

export default router;