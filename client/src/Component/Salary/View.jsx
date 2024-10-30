import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useAuth } from "../../Context/authContext";
import styled from "styled-components";

const View = () => {
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalarier] = useState(null);
    const { id } = useParams();
    let sno = 1;
    const { user } = useAuth();
    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/salary/${id}/${user.role}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                setSalaries(response.data.salary);


                setFilteredSalarier(response.data.salary)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    }


    useEffect(() => {
        fetchSalaries();
    }, []);

    const filterSalaries = (q) => {
        const filterdRecords = salaries.filter((leave) =>
            leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
        );
        setFilteredSalarier(filterdRecords);
    }


    return (
        <>
            {filteredSalaries === null ? (<div>Loading...</div>) :
                (
                    <Wrapper className="container mt-4">
                        {/* <div>
                            <h2>Salary History</h2>
                        </div> */}
                        <div className=" my-5  ">
                            <input type="text" placeholder="Search by emp id " onChange={filterSalaries} />
                        </div>
                        <div className=" ">
                            {
                                filteredSalaries.length > 0 ? (
                                    <Table striped bordered hover className="custom-table">
                                        <thead>
                                            <tr>
                                                <th>SNo</th>
                                                <th>Emp ID</th>
                                                <th>Salary</th>
                                                <th>Allowances</th>
                                                <th>Deducations</th>
                                                <th>Total</th>
                                                <th>Pay Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredSalaries.map((salary) => (
                                                <tr key={salary.id}>
                                                    <td>{sno++}</td>
                                                    <td>{salary?.employeeId?.employeeId}</td>
                                                    <td>{salary.basicSalary}</td>
                                                    <td>{salary.allowances}</td>
                                                    <td>{salary.deductions}</td>
                                                    <td>{salary.netSalary}</td>
                                                    <td>{new Date(salary.payDate).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>

                                ) : <div className="d-flex justify-content-center m-auto fs-5 text-danger align-items-center">NO RECORDS</div>
                            }
                        </div>
                    </Wrapper >
                )
            }
        </>
    );
};


const Wrapper = styled.div`

.salary{
    width:100%;
    background:red;
}

input{
    border:0.2px solid gray;
}


`


export default View;