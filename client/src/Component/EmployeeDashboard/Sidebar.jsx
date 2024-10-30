


import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBuilding, FaUsers, FaCogs, FaMoneyBillWave } from "react-icons/fa";
import { useAuth } from "../../Context/authContext";
import styled from "styled-components";


// employee sidebar
const Sidebar = () => {
    const { user } = useAuth();
    console.log(user._id);

    return (
        <Wrapper className="sidebar">

            <div className="sidebar-link px-5 d-flex flex-column">
                <NavLink to='/employee-dashboard' className={({ isActive }) => isActive ? "active-link" : ""} end>
                    <FaTachometerAlt className="nav_icons" />
                    <span className="p-2">Dashboard</span></NavLink>
                <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({ isActive }) => isActive ? "active-link" : ""} end >
                    <FaUsers className="nav_icons"/>
                    <span className="p-2">My Profile</span></NavLink>
                <NavLink to='/employee-dashboard/leaves' className={({ isActive }) => isActive ? "active-link" : ""} end >
                    <FaBuilding className="nav_icons"/>
                    <span className="p-2">Leaves</span></NavLink>
                <NavLink to={`/employee-dashboard/salary/${user._id}`} className={({ isActive }) => isActive ? "active-link" : ""} end >
                    <FaMoneyBillWave className="nav_icons"/>
                    <span className="p-2">Salary </span></NavLink>

                <NavLink to='/employee-dashboard/setting' className={({ isActive }) => isActive ? "active-link" : ""} end >
                    <FaCogs className="nav_icons"/>
                    <span className="p-2">Change Password</span></NavLink>
            </div>
        </Wrapper>
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

export default Sidebar;