import {Router} from 'express';
import ItemController from '../../controller/ItemController';

const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:itemId', itemCtrl.getOne);
router.delete('/:itemId', itemCtrl.deleteItem);
router.post('/', itemCtrl.createItem);
router.put('/:itemId', itemCtrl.updateItem);

export default router;