import { Router } from 'express'
import registeruser from './registeruser';
import product from './products';
import company from './company';
import generic from './generic-schemas';
import role from './role';
import usergroup from './usergroup';

const router = new Router()

router.use('/rouge/usermanagement/user', registeruser);
router.use('/rouge/product', product);
router.use('/rouge/company', company);
router.use('/rouge/common', generic);
router.use('/rouge/usermanagement/role', role);
router.use('/rouge/usermanagement/usergroup', usergroup);

export default router
