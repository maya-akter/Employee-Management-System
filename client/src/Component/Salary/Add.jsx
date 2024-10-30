
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { fetchDepartments } from "../../utils/EmployeeHelpers";
import axios from "axios";
import { getEmployees } from "../../utils/EmployeeHelpers";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../Styles/Button";

const Add = () => {
    const navigate = useNavigate();
    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: '',
        allowances: '',
        deductions: '0',
        payDate: null,

    });
    const [departments, setDepartments] = useState(null)
    const [employees, setEmployees] = useState([])



    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        }
        getDepartments();
    }, []);





    const handleChange = (e) => {
        const { name, value } = e.target;

        setSalary((prev) => ({ ...prev, [name]: value }));
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('click');



        try {
            const response = await axios.post(`http://localhost:8000/api/salary/add`, salary, {
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


    const handleDepartment = async (e) => {
        const departmentId = e.target.value;
        const emps = await getEmployees(departmentId);
        setEmployees(emps);
        console.log("Employees set in state:", emps); // Log the state data
    };


    return (
        <>
            {departments ? (
                <Wrapper className="container d-flex justify-content-center">
                    <div className="add_salary ">
                        {/* <h2 className="text-center">Add Salary </h2> */}
                        <Form onSubmit={handleSubmit} className="salary_form">
                            <div className="">

                                <div className=" ">
                                    <Form.Group controlId="formDepartment" className="mb-3">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Select
                                            name="department"

                                            onChange={handleDepartment}
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


                                    <Form.Group controlId="formDepartment" className="mb-3">
                                        <Form.Label>Employee</Form.Label>

                                        <Form.Select
                                            name="employeeId"
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Employee</option>
                                            {employees.map((emp) => (
                                                <option value={emp._id} key={emp._id}>{emp.employeeId}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="formEmployeeId" className="mb-3">
                                        <Form.Label>Basic Salary</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="basicSalary"

                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>


                                </div>
                                <div className=" ">
                                    <Form.Group controlId="formSalary" className="mb-3">
                                        <Form.Label>Allowances</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="allowances"

                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formSalary" className="mb-3">
                                        <Form.Label>Deductions</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="deductions"

                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    {/* extra */}
                                    <Form.Group controlId="formSalary" className="mb-3">
                                        <Form.Label>Pay Date</Form.Label>
                                        <Form.Control
                                            type="Date"
                                            name="payDate"

                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <Button type="submit" className="mt-4  d-flex justify-content-center align-items-center">
                                Add Salary
                            </Button>
                        </Form>
                    </div>
                </Wrapper>
            ) : <div>Loading...</div>}
        </>

    );
};

const Wrapper = styled.div`

.add_salary{
    background:white;
    width:500px;
    height:700px;
    margin:50px 0;
}
.salary_form{
    padding:50px;
}
`


export default Add;