import express from 'express';
import varifyUser from '../Middleware/auth_middleware.js';
import { addSalary, getSalary } from '../Controller/salary_controller.js';

const router = express.Router();

router.post('/add',varifyUser,addSalary);
router.get('/:id/:role',varifyUser,getSalary);



export default router;

