import { useState } from "react";
import { useAuth } from "../../Context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Add = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [leave, setLeave] = useState({
        userId: user._id,
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prev) => ({ ...prev, [name]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/api/leave/add`,leave, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log("employee data ");

            if (response.data.success) {
                navigate('/employee-dashboard/leaves')
            }
        } catch (error) {
            if (error.response && !error.response.data.error) {
                alert(error.response.data.error);
            }
        }
    }

    return (
        <div>
            <div>
                <h2>Request For Leave</h2>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label>Leave Type</label>
                        <select name="leaveType" onChange={handleChange} required >
                            <option value='Sick leave' >Sick leave</option>
                            <option value='Casual leave' >Casual leave</option>
                            <option value='Annual leave' >Annual leave</option>
                        </select>
                    </div>
                    <div>

                        <label>From Date</label>
                        <input type="date" name="startDate" onChange={handleChange} required />

                    </div>
                    <div>
                        <label>To Date</label>
                        <input type="date" name="endDate" onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea name="reason" placeholder="Reason" onChange={handleChange} required />
                    </div>
                </div>
                <div>
                    <button className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Add;