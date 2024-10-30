import { NavLink } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { columns, DepartmetButtons } from "../../utils/DepartmentHelpers";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false);
   const [filtereredDepartment,setFilteredDepartment] = useState([]);




   const onDepartmentDelete=()=>{
    fetchDepartments();
   }

   const fetchDepartments = async () => {
    setDepLoading(true);
    try {
        const response = await axios.get('http://localhost:8000/api/department', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.data.success) {
            let sno = 1;
            const data = await response.data.departments.map((dep) => (
                {
                    _id: dep._id,
                    sno: sno++,
                    dep_name: dep.dep_name,
                    action: (<DepartmetButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete}/>)
                }
            ));
            setDepartments(data);
            setFilteredDepartment(data);
        }
    } catch (error) {
        if (error.response && !error.response.data.error) {
            alert(error.response.data.error);
        }
    } finally {
        setDepLoading(false);
    }
}


    useEffect(() => {
       fetchDepartments();
    }, [])

 const filterDepartments=(e)=>{
    const records = departments.filter((dep)=>
    dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredDepartment(records);
 }






    return (

        <>
            {
                depLoading ? <div>Loading...</div> :
                    <Wrapper className='container '>
                        <div className="">
                            {/* <h3 className=' text-center'>Manage Department</h3> */}
                        </div>
                        <div className="d-flex justify-content-between">
                            <input 
                            type="text" 
                            placeholder="Search dep by name"
                             className="px-4 py-1 my-5 mx-3 "
                            onChange={filterDepartments}
                              />
                            <NavLink to="/admin-dashboard/add-department" className="active-link px-4 py-1 my-5 mx-3 ">Add New Dep</NavLink>
                        </div>
                        <div>
                            <DataTable columns={columns} data={filtereredDepartment} pagination/>
                        </div>
                    </Wrapper>
            }
        </>

    );
};

const Wrapper = styled.div`
.active-link{
    color:white;
    
    &:hover{
        background:#6A9BC2;
    }
}
input{
    border:0.2px solid gray;
}

`


export default DepartmentList;