import express from 'express';
import varifyUser from '../Middleware/auth_middleware.js';
import { addDepartment, deleteDepartment, getDepartment, getDepartments, updateDepartment } from '../Controller/department_controller.js';



const router = express.Router();
router.get('/',varifyUser,getDepartments);
router.post('/add',varifyUser,addDepartment);
router.get('/:id',varifyUser,getDepartment);
router.put('/:id',varifyUser,updateDepartment);
router.delete('/:id',varifyUser,deleteDepartment);


export default router;








