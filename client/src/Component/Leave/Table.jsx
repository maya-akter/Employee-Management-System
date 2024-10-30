import { useEffect, useState } from "react";
import { LeaveButtons } from "../../utils/LeaveHelpers";
import axios from "axios";
import DataTable from "react-data-table-component";
import { column } from "../../utils/LeaveHelpers";



const Table = () => {
    const [leaves, setLeaves] = useState(null);


    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/leave', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

           
            if (response.data.success) {
                let sno = 1;
                const data = await response.data.leaves.map((leave) => (
                    {

                        _id: leave._id,
                        sno: sno++,
                        employeeId: leave.employeeId ? leave.employeeId.employeeId : 'N/A',
                        name: leave.employeeId ? leave.employeeId.userId.name : 'N/A',
                        leaveType: leave?.leaveType,
                        department: leave.employeeId?.department?.dep_name || 'N/A',
                        days: leave.endDate && leave.startDate
                            ? new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate()
                            : 0,
                        status: leave?.status,
                        action: <LeaveButtons Id={leave._id} />

                    }
                ));
                setLeaves(data);

            }
        } catch (error) {
            if (error.response && !error.response.data.error) {
                alert(error.response.data.error);
            }
        }
    }

    useEffect(() => {
        fetchLeaves();
    }, [])



    return (
        <>
            {
                leaves ? (
                    <div className="container mt-5" >
                        <div className="d-flex justify-content-between">

                            <div className="">
                                <input type="text" className="px-3" placeholder="Search by dep name" />

                            </div>
                            <div>
                                <button>Pending</button>
                                <button>Approved</button>
                                <button>Rejected</button>
                            </div>
                        </div>
                        <div>
                            <DataTable columns={column} data={leaves} pagination />
                        </div>
                    </div >
                ) : (<div>Loading...</div>)}
        </>
    );
};

export default Table;