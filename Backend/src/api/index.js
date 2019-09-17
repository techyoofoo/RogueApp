import { Router } from 'express'
import registeruser from './registeruser';
import product from './products';
import company from './company'

const router = new Router()

router.use('/users', registeruser);
router.use('/product', product);
router.use('/company', company);

export default router
