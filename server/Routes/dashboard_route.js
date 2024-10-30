import express from 'express';
import varifyUser from '../Middleware/auth_middleware.js';
import { getSummary } from '../Controller/dashboard_controller.js';



const router = express.Router();
router.get('/summary',varifyUser,getSummary);


export default router;








