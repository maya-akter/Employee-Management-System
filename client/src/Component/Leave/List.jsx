import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import { Table } from "react-bootstrap";
import styled from "styled-components";


const List = () => {
    let sno = 1;
    const { user } = useAuth();
    const [leaves, setLeaves] = useState([]);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/leave/${user._id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                setLeaves(response.data.leaves);

            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    }


    useEffect(() => {
        fetchLeaves();
    }, []);




    return (
        <Wrapper className="container mt-5">
            <div>
                {/* <h3 className="text-center">Manage Leave</h3> */}
            </div>
            <div className="d-flex justify-content-between mt-5 mb-5">
                <input type="text" className="px-3" placeholder="Search by dep name" />
                <NavLink  to='/employee-dashboard/add-leave' className='d-flex justify-content-center submit_btn fs-5'>Add New Leave</NavLink>
            </div>
            <div>
                {/* <table>
                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Leave Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Description</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave) => (
                            <tr key={leave._id}>
                                <td>{sno++}</td>
                                <td>{leave?.leaveType}</td>
                                <td>{leave.basicleave}</td>
                                <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                                <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                                <td>{leave.reason}</td>
                                <td>{leave.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Leave Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Description</th>
                            
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {leaves.map((leave) => (
                            <tr key={leave._id}>
                                <td>{sno++}</td>
                                <td>{leave?.leaveType}</td>
                                
                                <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                                <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                                
                                
                                
                                <td>{leave.reason}</td>
                                <td>{leave.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
input{
    border:0.2px solid gray;
    padding:
}
.submit_btn{
        width: 20%;
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
`


export default List;
