
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { fetchDepartments } from "../../utils/EmployeeHelpers";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Edit = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: '0',
        department: '',
        employeeId: '',
        dob: '',
        gender: ''
    });
    const [departments, setDepartments] = useState(null)
    const { id } = useParams();


    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        }
        getDepartments();
    }, []);


    useEffect(() => {
        const fetchEmployee = async () => {

            try {
                const response = await axios.get(`http://localhost:8000/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                console.log("employee data ", employee);

                if (response.data.success) {
                    const employee = response.data.employee;
                    setEmployee((prev) => ({
                        ...prev,
                        name: employee.userId.name,
                        maritalStatus: employee.maritalStatus,
                        designation: employee.designation,
                        salary: employee.salary,
                        department: employee.department,
                        employeeId: employee.employeeId,
                        dob: employee.dob,
                        gender: employee.gender,
                    }));
                }
            } catch (error) {
                if (error.response && !error.response.data.error) {
                    alert(error.response.data.error);
                }
            }
        }
        fetchEmployee();
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;

        setEmployee((prev) => ({ ...prev, [name]: value }));
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('click');



        try {
            const response = await axios.put(`http://localhost:8000/api/employee/${id}`, employee, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                console.log(response.data.message);

                navigate('/admin-dashboard/employees')
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            }
        }
    }

    return (
        <>
            {departments && employee ? (
                <Wrapper className="container d-flex justify-content-center mt-5">
                    {/* <h2 className="text-center">Edit Employee </h2> */}
                    <div className="employee_edit">
                        <Form onSubmit={handleSubmit} className="container mt-5">
                            <div className="d-flex justify-content-between add_emp_form">

                                <div className="w-100 px-4">
                                    <Form.Group controlId="formName" className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={employee.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formDepartment" className="mb-3">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Select
                                            name="department"
                                            value={employee.department}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Department</option>
                                            {
                                                departments.map(dep => (
                                                    <option value={dep._id} key={dep._id}>{dep.dep_name}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    
                                    <Form.Group controlId="formGender" className="mb-3">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select
                                            name="gender"
                                            value={employee.gender}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="formDesignation" className="mb-3">
                                        <Form.Label>Designation</Form.Label>
                                        <Form.Select

                                            name="designation"
                                            value={employee.designation}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">IT</option>
                                            <option value="single">Software</option>
                                            <option value="married">Developer</option>
                                        </Form.Select>

                                    </Form.Group>
                                </div>
                                <div className="w-100 px-4">

                                <Form.Group controlId="formEmployeeId" className="mb-3">
                                        <Form.Label>Employee ID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="employeeId"
                                            value={employee.employeeId}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formSalary" className="mb-3">
                                        <Form.Label>Salary</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="salary"
                                            value={employee.salary}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group controlId="formMaritalStatus" className="mb-3">
                                        <Form.Label>Marital Status</Form.Label>
                                        <Form.Select
                                            name="maritalStatus"
                                            value={employee.maritalStatus}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Marital Status</option>
                                            <option value="single">Single</option>
                                            <option value="married">Married</option>
                                            <option value="divorced">Divorced</option>
                                            <option value="widowed">Widowed</option>
                                        </Form.Select>
                                    </Form.Group>
                                    {/* extra */}
                                    
                                    <Form.Group controlId="formDob" className="mb-3">
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="dob"
                                            value={employee.dob}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                </div>
                            </div>

                            <button type="submit" className=" submit_btn mt-5 m-auto d-flex justify-content-center fs-5">
                                Edit Employee
                            </button>
                        </Form>
                    </div>
                </Wrapper>
            ) : <div>Loading...</div>}
        </>

    );
};

const Wrapper = styled.div`
.employee_edit{
    padding:30px;
    background:white;
    width:40vw;
    height:600px;
    margin:50px 0;
}
.submit_btn{
        width: 30%;
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

`


export default Edit;