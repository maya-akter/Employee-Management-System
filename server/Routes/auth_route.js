import exporess from 'express'
import  {login, verify } from '../Controller/auth_controller.js';
import verifyUser from '../Middleware/auth_middleware.js';
const router = exporess.Router();

router.post('/login',login);
router.get('/verify',verifyUser,verify);


export default router;