import { Outlet } from "react-router-dom";
import Sidebar from "../Component/EmployeeDashboard/Sidebar";
import Navbar from "../Component/Dashboard/Navbar";


const EmployeeDashboard = () => {
    return (
        <div className="d-flex flex-column">
        <Navbar/>
         
        <div className="d-flex">
        <Sidebar/>
        <Outlet/>
        </div>
        
     </div>
    );
};

export default EmployeeDashboard;