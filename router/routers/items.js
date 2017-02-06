const {Router} = require('express');
const ItemController = require('../../controller/ItemController');

const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:itemId', itemCtrl.getOne);
router.delete('/:itemId', itemCtrl.delete);
router.post('/', itemCtrl.createItem);
router.put('/:itemId', itemCtrl.updateItem);

module.exports = router;