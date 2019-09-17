import { Router } from 'express'
import registeruser from './registeruser'

const router = new Router()

router.use('/users', registeruser)

export default router
