import { useNavigate } from "react-router-dom";

export const column=[
    {
        name:'S NO',
        selector:(row)=>row.sno,
        width:"70px"
    },
    {
        name:'Emp Id',
        selector:(row)=>row.employeeId,
        width:"120px"
    },
    {
        name:'Name',
        selector:(row)=>row.name,
        width:"120px"
    },
    {
        name:'Leave Type',
        selector:(row)=>row.leaveType,
        width:"140px"
    },
    {
        name:'Department',
        selector:(row)=>row.department,
        width:"170px"
    },
    {
        name:'Days',
        selector:(row)=>row.days,
        width:"80px"
    },
    {
        name:'Status',
        selector:(row)=>row.status,
        width:"70px"
    },
    {
        name:'Action',
        selector:(row)=>row.action,
        center:true,
    },
]





export const LeaveButtons=(Id)=>{
 const navigate = useNavigate();
 const handleview=(id)=>{
    navigate(`/admin-dashboard/leaves/${id}`);
 }

return(
    <button className="btn btn-success" onClick={()=>handleview(Id)}>View</button>
)



}