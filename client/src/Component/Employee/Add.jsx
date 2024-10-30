import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { fetchDepartments } from "../../utils/EmployeeHelpers";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Add = () => {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [formData, setFromData] = useState({});

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        }
        getDepartments();
    }, []);



    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFromData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFromData((prev) => ({ ...prev, [name]: value }));
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('click');

        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        });


        try {
            const response = await axios.post('http://localhost:8000/api/employee/add', formDataObj, {
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
        <Wrapper className="container d-flex justify-content-center mt-5">
            {/* <h2 className="text-center">Employee Form</h2> */}
            <Wrapper className=" add_emp">
                <Form onSubmit={handleSubmit} className=" add_emp_form p-5">
                    <div className="d-flex justify-content-between ">

                        <div className="w-100 px-4">
                            <Form.Group controlId="formName" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmployeeId" className="mb-3">
                                <Form.Label>Employee ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="employeeId"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formDob" className="mb-3">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dob"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formGender" className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select
                                    name="gender"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="formMaritalStatus" className="mb-3">
                                <Form.Label>Marital Status</Form.Label>
                                <Form.Select
                                    name="maritalStatus"
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

                            <Form.Group controlId="formDesignation" className="mb-3">
                                <Form.Label>Designation</Form.Label>
                                <Form.Select

                                    name="designation"
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
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formDepartment" className="mb-3">
                                <Form.Label>Department</Form.Label>
                                <Form.Select
                                    name="department"
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

                            <Form.Group controlId="formSalary" className="mb-3">
                                <Form.Label>Salary</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="salary"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formRole" className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Select
                                    type="text"
                                    name="role"
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="admin">Admin</option>
                                    <option value="employee">Employee</option>
                                </Form.Select>

                            </Form.Group>

                            <Form.Group controlId="formImage" className="mb-3">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <button type="submit" className=" submit_btn mt-5 m-auto d-flex justify-content-center fs-5">
                        Submit
                    </button>

                </Form>
            </Wrapper>
        </Wrapper>

    );
};

const Wrapper = styled.div`
.add_emp{
    
    background:white;
    width:50vw;
    height:700px;
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


export default Add;