import { Router } from 'express'
import registeruser from './registeruser';
import product from './products';
import company from './company';
import generic from './generic-schemas';
import role from './role';
import usergroup from './usergroup';

const router = new Router()

router.use('/rouge/UserManagement/user', registeruser);
router.use('/rouge/product', product);
router.use('/rouge/company', company);
router.use('/rouge/common', generic);
router.use('/rouge/UserManagement/role', role);
router.use('/rouge/UserManagement/usergroup', usergroup);

export default router
