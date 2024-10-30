

import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";



export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable:true
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center:true,
    },
];



export const DepartmetButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate();
    const handleDelet = async (id) => {
        const confirm = window.confirm("do you want to delet it?");
        if(confirm){
            try {
                const response = await axios.delete(`http://localhost:8000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    onDepartmentDelete();
                }
            } catch (error) {
                if (error.response && !error.response.data.error) {
                    alert(error.response.data.error);
                }
            }
       
        }
           

    }
    return (
        <Wrapper>
            <button className="btn edit mx-2" onClick={() => navigate(`/admin-dashboard/department/${_id}`)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelet(_id)}>Delete</button>
        </Wrapper>
    )
}


const Wrapper=styled.div`
.edit{
   background:#ffc107;
   &:hover{
    background:#e0a800;
   }
 }

`
 
DepartmetButtons.propTypes = {
    _id: PropTypes.node,
    onDepartmentDelete: PropTypes.node
};