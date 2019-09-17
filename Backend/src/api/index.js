import { Router } from 'express'
import registeruser from './registeruser';
import product from './products';

const router = new Router()

router.use('/users', registeruser);
router.use('/product', product);

export default router
