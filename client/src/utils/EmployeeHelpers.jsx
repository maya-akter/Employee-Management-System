import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";





export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        center:true,
        
    },
    {
        name: " Name",
        selector: (row) => row.name,
      center:true
    },
    {
        name: " Image",
       
        selector: (row) => row.profileImage,
       center:true
    },
    {
        name: " Department",
        selector: (row) => row.dep_name,
        center:true
    },
    {
        name: " Dob",
        selector: (row) => row.dob,
        sortable:true,
        center:true
       
    },
    {
        name:'Action',
        selector:(row)=> row.action,
        width:'400px',
        center:true
    }
];







 export const  fetchDepartments = async () => {
   let departments = [];
    try {
        const response = await axios.get('http://localhost:8000/api/department', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.data.success) {
            departments= response.data.departments;
        }
    } catch (error) {
        if (error.response && !error.response.data.error) {
            alert(error.response.data.error);
        }
    } 
    return departments;
}


// employess for salary form

// export const getEmployees = async (id) => {
//     let employees = [];
//      try {
//          const response = await axios.get(`http://localhost:8000/api/employee/department/${id}`, {
//              headers: {
//                  "Authorization": `Bearer ${localStorage.getItem('token')}`
//              }
//          });
//          if (response.data.success) {
//             employees= response.data.employees;
//          }
//      } catch (error) {
//          if (error.response && !error.response.data.error) {
//              alert(error.response.data.error);
//          }
//      } 
//      return employees;
//  } 
export const getEmployees = async (id) => {
    let employees = [];
    try {
        const response = await axios.get(`http://localhost:8000/api/employee/department/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.data.success) {
            employees = response.data.employees;
        }
        console.log("Employee data fetched:", response.data); // Log the response
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            alert(error.response.data.error);
        }
    }
    return employees;
};

export const EmployeeButtons = ({Id}) => {
    const navigate = useNavigate();

   
    return (
        <Wrapper>
            <button className="btn view mx-2" onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}>View</button>
            <button className="btn edit mx-2" onClick={()=>navigate(`/admin-dashboard/employees/edit/${Id}`)}>Edit</button>
            <button className="btn  salary mx-2" onClick={()=>navigate(`/admin-dashboard/employees/salary/${Id}`)} >Salary</button>
            <button className="btn leave mx-2" >Leave</button>
        </Wrapper>
    )
}


const Wrapper=styled.div`
.view{
    background:#28a745;
    &:hover{
        background:#218838;
    }
}
 .edit{
   background:#ffc107;
   &:hover{
    background:#e0a800;
   }
 }
 .salary{
    background:#b6effb;
    &:hover{
        background:#138496;
    }
 }
 .leave{
    background:#6c757d;
    &:hover{
        background:#5a6268;
    }
 }

`


EmployeeButtons.propTypes = {
    Id: PropTypes.node,
    
};