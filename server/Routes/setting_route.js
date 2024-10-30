import express from 'express';
import varifyUser from '../Middleware/auth_middleware.js';
import { changePassword } from '../Controller/setting_controller.js';


const router = express.Router();

router.put('/change-password',varifyUser,changePassword);




export default router;

