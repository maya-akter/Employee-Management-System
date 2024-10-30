import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";


const View = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState([]);
    useEffect(() => {
        const fetchEmployee = async () => {

            try {
                const response = await axios.get(`http://localhost:8000/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                

                if (response.data.success) {
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                if (error.response && !error.response.data.error) {
                    alert(error.response.data.error);
                }
            }
        }
        fetchEmployee();
    }, []);


    return (
        <Wrapper className="container mt-5">
            <h2 className="text-center m-4">Employee Details</h2>

            <div className="d-flex align-items-center p-5 mt-5 emp_view">
                <div className="m-5">
                    <img className="emp_image" src={`http://localhost:8000/${employee.userId?.profileImage}`} alt="" />
                </div>
                <div className="mx-4">
                    <div>

                        <p>Name : <span>{employee?.userId?.name}</span></p>
                    </div>
                    <div>

                        <p>Employee Id : <span>{employee?.employeeId}</span></p>
                    </div>
                    <div>

                        <p>Department : <span>{employee?.department?.dep_name}</span></p>
                    </div>
                    <div>

                        <p>Gender : <span>{employee?.gender}</span></p>
                    </div>
                    <div>

                        <p>Date of Birth : <span>{new Date(employee.dob).toLocaleDateString()}</span></p>
                    </div>
                    
                    <div>

                        <p>Marital Status : <span>{employee?.maritalStatus}</span></p>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};


const Wrapper = styled.div`

.emp_image{
    height:300px;
    width:300px;
    border-radius:50%;
}
.emp_view{
    background:white;
    height:30rem;
}
`


export default View;