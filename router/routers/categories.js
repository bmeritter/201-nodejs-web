import {Router} from 'express';
import CategoryController from '../../controller/CategoryController';

const router = Router();
const categoryCtrl = new CategoryController();

router.get('/', categoryCtrl.getAll);
router.get('/:categoryId', categoryCtrl.getCategory);
router.delete('/:categoryId', categoryCtrl.deleteCategory);
router.post('/', categoryCtrl.addCategory);
router.put('/:categoryId', categoryCtrl.updateCategory);

export default router;