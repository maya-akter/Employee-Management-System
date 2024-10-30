import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const AddDepartment = () => {
const navigate = useNavigate();
const [department,setDepartment] = useState({
    dep_name:'',
    description:''
})

const handleChange = (e)=>{
    const {name,value} = e.target;
    setDepartment({...department,[name]:value});
}


const handleSubmit=async(e)=>{
    e.preventDefault();
     
    try {
        const response = await axios.post('http://localhost:8000/api/department/add',department,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        });
        if(response.data.success){
            navigate('/admin-dashboard/departments')
        }
    } catch (error) {
        if(error.response && !error.response.data.error){
            alert(error.response.data.error);
        }
    }
}



    return (
        <Wrapper className="container d-flex justify-content-center">

            <div className="departmentadd p-4">

                <form action=""  className="px-4" onSubmit={handleSubmit}>
                    {/* <h3 className="text-center">Add Departments</h3> */}
                    <div className="mt-3">
                        <label htmlFor="dep_name" className="mb-2">Department Name</label><br />
                        <input type="text" placeholder="dep name" name="dep_name" className="inputfild" onChange={handleChange}/>
                    </div>
                    <div className="mt-3 mb-3">
                        <label htmlFor="description" className="mb-2">Description</label><br />
                        <textarea name="description" placeholder="Description" className="inputfild" onChange={handleChange}></textarea>
                    </div>
                    <button type="submit" className="submit_btn  m-auto d-flex justify-content-center ">Add Department</button>
                </form>
            </div>
        </Wrapper>
    );
};


const Wrapper=styled.div`
display:flex;
margin-top:100px;
.submit_btn{
    width:100%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.colors.login_btn_background};
        color: white;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover{
            background-color:${({ theme }) => theme.colors.login_btnHover_background};
}
}

.departmentadd{
    background:white;
    width:400px;
    height:350px;
    margin:50px 0;
    padding:20px;
}
input,textarea{
    width:100%;
    padding:10px;
    border:0.2px solid gray;
}

`
export default AddDepartment;