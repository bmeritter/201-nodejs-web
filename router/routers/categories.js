const {Router} = require('express');
const CategoryController = require('../../controller/CategoryController');

const router = Router();
const categoryCtrl = new CategoryController();

router.get('/', categoryCtrl.getAll);
router.get('/:categoryId', categoryCtrl.getOne);
router.delete('/:categoryId', categoryCtrl.delete);
router.post('/', categoryCtrl.createCategory);
router.put('/:categoryId', categoryCtrl.updateCategory);

module.exports = router;