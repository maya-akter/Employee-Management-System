import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import { ThemeProvider } from 'styled-components';
import Login from './Pages/Login';
import AdminDashboard from './Pages/AdminDashboard';
import EmployeeDashboard from './Pages/EmployeeDashboard';
import PrivateRoute from './utils/PrivateRoute';
import RolebaseRoure from './utils/RolebaseRoure';
import AdminSummery from './Component/Dashboard/AdminSummery';
import DepartmentList from './Component/Departments/DepartmentList';
import AddDepartment from './Component/Departments/AddDepartment';
import EditDepartment from './Component/Departments/EditDepartment';
import List from './Component/Employee/List';
import Add from './Component/Employee/Add';
import View from './Component/Employee/View';
import Edit from './Component/Employee/Edit';
import AddSalary from './Component/Salary/Add';
import ViewSalary from './Component/Salary/View';
import Summery from './Component/EmployeeDashboard/Summery';
import LeaveList from './Component/Leave/List';
import AddLeave from './Component/Leave/Add';
import Setting from './Component/EmployeeDashboard/Setting';
import { GlobalStyle } from './GlobalStyle';
import Table from './Component/Leave/Table';
import Detail from './Component/Leave/Detail';


function App() {
const theme={
  colors:{
    background:'#fff',
    white:'#fff',
    black:'#000',
    login_btn_background:'#7BADD2',
    login_btnHover_background:'#324C7C',
  }
}

  return (
    <ThemeProvider theme={theme}>
     <GlobalStyle/>
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashboard" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin-dashboard' element={
          <PrivateRoute>
            <RolebaseRoure requiredRole={["admin"]}>
              <AdminDashboard />
            </RolebaseRoure>
          </PrivateRoute>
        }>
          <Route index element={<AdminSummery />} />

          <Route path='/admin-dashboard/departments' element={<DepartmentList />} />
          <Route path='/admin-dashboard/add-department' element={<AddDepartment />} />
          <Route path='/admin-dashboard/department/:id' element={<EditDepartment />} />
          <Route path='/admin-dashboard/employees' element={<List />} />
          <Route path='/admin-dashboard/add-employee' element={<Add />} />
          <Route path='/admin-dashboard/employees/:id' element={<View />} />
          <Route path='/admin-dashboard/employees/edit/:id' element={<Edit />} />
          <Route path='/admin-dashboard/employees/salary/:id' element={<ViewSalary />} />

          <Route path='/admin-dashboard/salary/add' element={<AddSalary />} />
          <Route path='/admin-dashboard/leaves' element={<Table />} />
          <Route path='/admin-dashboard/leaves/:id' element={<Detail />} />

        </Route>

        <Route path='/employee-dashboard' element={
          <PrivateRoute>
            <RolebaseRoure requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RolebaseRoure>

          </PrivateRoute>
        }>

          <Route index element={<Summery />} />
          <Route path='/employee-dashboard/profile/:id' element={<View />} />
          <Route path='/employee-dashboard/leaves' element={<LeaveList />} />
          <Route path='/employee-dashboard/add-leave' element={<AddLeave />} />
          <Route path='/employee-dashboard/salary/:id' element={<ViewSalary />} />
          <Route path='/employee-dashboard/setting' element={<Setting />} />
        </Route>
      </Routes>
    </ThemeProvider>

  )
}

export default App
