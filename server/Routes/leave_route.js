import express from 'express';
import varifyUser from '../Middleware/auth_middleware.js';
import { addLeave ,getLeave, getLeaveDetail, getLeaves} from '../Controller/leave_controller.js';


const router = express.Router();

router.post('/add',varifyUser,addLeave);
router.get('/:id',varifyUser,getLeave);
router.get('/detail/:id',varifyUser,getLeaveDetail);
router.get('/',varifyUser,getLeaves);




export default router;

