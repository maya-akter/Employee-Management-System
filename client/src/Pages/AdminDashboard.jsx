import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import Adminsidebar from "../Component/Dashboard/Adminsidebar";
import Navbar from "../Component/Dashboard/Navbar";

const AdminDashboard = () => {
    const {user,loading} = useAuth();
    const navigate = useNavigate();
    if(loading){
        return <div>Loading....</div>
    }
    if(!user){
       navigate('/login');
    }
    return (
        <div className="">
           <Navbar/>
           <div className="d-flex">
           <Adminsidebar/>
           <Outlet/>
           </div>
           
        </div>
    );
};

export default AdminDashboard;