const {Router} = require('express');
const CartController = require('../../controller/CartController');

const router = Router();
const cartCml = new CartController();

router.get('/', cartCml.getAll);
router.get('/:cartId', cartCml.getOne);
router.delete('/:cartId', cartCml.delete);
router.post('/', cartCml.createCart);
router.put('/:cartId', cartCml.updateCart);

module.exports = router;