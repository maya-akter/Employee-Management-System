import express from 'express'
import cors from 'cors'
import authRouter from './Routes/auth_route.js';
import connectTodb from './db/db.js';
import depRouter from './Routes/department_router.js';
import empRouter from './Routes/employee_router.js';
import salaryRouter from './Routes/salary_route.js';
import leaveRouter from './Routes/leave_route.js';
import settingRouter from './Routes/setting_route.js';
import dashboardRouter from './Routes/dashboard_route.js';

connectTodb();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'))



app.use('/api/auth',authRouter);
app.use('/api/department',depRouter);
app.use('/api/employee',empRouter);
app.use('/api/salary',salaryRouter);
app.use('/api/leave',leaveRouter);
app.use('/api/setting',settingRouter);
app.use('/api/dashboard',dashboardRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${process.env.PORT}`);
    
})