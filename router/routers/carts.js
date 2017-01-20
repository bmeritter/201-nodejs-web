import {Router} from 'express';
import ItemController from '../../controller/ItemController';


const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:itemId', itemCtrl.getItem);
router.delete('/:itemId', itemCtrl.deleteItem);
router.post('/', itemCtrl.addItem);
router.put('/:itemId', itemCtrl.updateItem);

export default router;