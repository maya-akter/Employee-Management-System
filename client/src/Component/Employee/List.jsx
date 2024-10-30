import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelpers";
import DataTable from "react-data-table-component";
import Image from 'react-bootstrap/Image'
import styled from "styled-components";

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filterdEmp,setFilterdEmp] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/api/employee', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
               

                if (response.data.success) {
                    let sno = 1;
                    const data = await response.data.employees.map((emp) => (
                        {

                            _id: emp._id,
                            sno: sno++,
                            dep_name: emp.department ? emp.department.dep_name : 'N/A',
                            name: emp.userId ? emp.userId.name : 'N/A',
                            dob: emp.dob ? new Date(emp.dob).toLocaleDateString(): 'N/A',
                            // profileImage: emp.userId ? emp.userId.profileImage : '',
                            profileImage:<Image className="emp_image_style " src={`http://localhost:8000/${emp.userId.profileImage}` } />,
                            action: <EmployeeButtons Id={emp._id} />
                            
                        }
                    ));
                    setEmployees(data);
                    setFilterdEmp(data);
                }
            } catch (error) {
                if (error.response && !error.response.data.error) {
                    alert(error.response.data.error);
                }
            } finally {
                setEmpLoading(false);
            }
        }
        fetchDepartments();
    }, [])

const handleFilter=(e)=>{
  const records = employees.filter((emp)=>(
    emp.name.toLowerCase().includes(e.target.value.toLowerCase())
  ));
  setFilterdEmp(records);
}


    return (

        <>
            {
                empLoading ? <div>Loading...</div> :
                    <Wrapper className='container mt-4'>
                        <div className="mt-4">
                            {/* <h3 className=' text-center'>Manage Employees</h3> */}
                        </div>
                        <div className="d-flex justify-content-between">
                            <input
                                type="text"
                                placeholder="Search dep by name"
                                className="px-4 py-1 my-5 mx-3 "
                                onChange={handleFilter}
                            />
                            <NavLink to="/admin-dashboard/add-employee" className="active-link px-4 py-1 my-5 mx-3 ">Add New Employee</NavLink>
                        </div>
                        <div>
                            <DataTable  columns={columns}
                                data={filterdEmp}  pagination/>
                        </div>
                        
                    </Wrapper>

            }
        </>
    );
};



const Wrapper=styled.div`

.active-link{
    color:white;
    
    &:hover{
        background:#6A9BC2;
    }
}
.emp_image_style{
    height:60px;
    width:60px;
    border-radius:50%;
    margin:20px;
}

input{
    border:0.2px solid gray;
}


`




export default List;