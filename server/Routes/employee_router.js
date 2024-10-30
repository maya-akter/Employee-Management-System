import express from 'express';
import varifyUser from '../Middleware/auth_middleware.js';
import { addEmployees, getEmployee, getEmployees, updateEmployee,fetchEmployessByDepId, upload } from '../Controller/employee_controller.js';



const router = express.Router();
 router.get('/',varifyUser,getEmployees);
router.post('/add',varifyUser,upload.single('image'),addEmployees);
 router.get('/:id',varifyUser,getEmployee);
 router.put('/:id',varifyUser,updateEmployee);
 router.get('/department/:id',varifyUser,fetchEmployessByDepId);


export default router;



