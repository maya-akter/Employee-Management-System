import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBuilding, FaUsers, FaCogs, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import styled from "styled-components";




const Adminsidebar = () => {




    return (
        <div>
            <Wrapper className="sidebar ">

                <div className="sidebar-link px-5 d-flex flex-column">
                    <NavLink to='/admin-dashboard' className={({ isActive }) => isActive ? "active-link " : ""} end>
                        <FaTachometerAlt className="nav_icons" />
                        <span className="p-2">Dashboard</span></NavLink>
                    <NavLink to='/admin-dashboard/employees' className={({ isActive }) => isActive ? "active-link" : ""} end ><FaUsers className="nav_icons"/>
                        <span className="p-2">Employee</span></NavLink>
                    <NavLink to='/admin-dashboard/departments' className={({ isActive }) => isActive ? "active-link" : ""} ><FaBuilding className="nav_icons"/>
                        <span className="p-2">Department</span></NavLink>
                    <NavLink to='/admin-dashboard/leaves' className={({ isActive }) => isActive ? "active-link " : ""} end >
                        <FaCalendarAlt className="nav_icons"/>
                        <span className="p-2">Leave</span></NavLink>
                    <NavLink to='/admin-dashboard/salary/add' className={({ isActive }) => isActive ? "active-link" : ""} end  >
                        <FaMoneyBillWave className="nav_icons"/>
                        <span className="p-2">Salary</span></NavLink>
                    <NavLink to='/admin-dashboard'>
                        <FaCogs className="nav_icons"/>
                        <span className="p-2">Settings</span></NavLink>
                </div>
            </Wrapper>
        </div>

    );
};


const Wrapper = styled.div`
background:white;
margin-top:1px;
height:100vh;
.sidebar-link a{
  margin-top:25px;
}
.nav_icons{
    font-size:25px;
    color:${({ theme }) => theme.colors.login_btnHover_background};
}
`
















export default Adminsidebar;