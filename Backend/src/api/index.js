import { Router } from 'express'
import registeruser from './registeruser';
import product from './products';
import company from './company'
import generic from './generic-schemas'

const router = new Router()

router.use('/users', registeruser);
router.use('/product', product);
router.use('/company', company);
router.use('/common', generic);
export default router
