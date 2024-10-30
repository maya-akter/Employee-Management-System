import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from "react-icons/fa";
import SummeryCard from "./SummeryCard";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";


const AdminSummery = () => {

   const [summary, setSummary] = useState(null);

   useEffect(() => {
      const fetchSummary = async () => {
         try {
            const summary = await axios.get('http://localhost:8000/api/dashboard/summary', {
               headers: {
                  "Authorization": `Bearer ${localStorage.getItem('token')}`
               }
            });
            setSummary(summary.data);
            console.log('summary', summary.data.totalDepartments);

         } catch (error) {
            if (error.response) {
               alert(error.response.data.error);
            }
            console.log(error.message);


         }
      }
      fetchSummary();
   }, []);

   if (!summary) {
      return <div>Loading...</div>
   }






   return (
      <Wrapper className="container mt-4">
         <h4 className="heading"> Dashboard Overview</h4>
         <div className="row  total_div ">
            <div className="col-lg-4 ">
               <SummeryCard icon={FaUsers} text="Total Employees" number={summary.totalEmployees} color="#ffbf00"/>
            </div>
            <div className="col-lg-4" >
               <SummeryCard icon={FaBuilding} text="Total Departments" number={summary.totalDepartments} color="#00bfff" />
            </div>
            <div className="col-lg-4">
               <SummeryCard icon={FaMoneyBillWave} text="Monthly Salary" number={summary.totalSalary} color="#b35900"/>
            </div>
         </div>
         <div className=" mt-5">
            <h4 className="leave_heading">Leave Details</h4>
            <div className="row leave_details">
               <div className="col-lg-6">
                  <SummeryCard icon={FaFileAlt} text="Leave applied" number={summary.leaveSummary.appliedFor} color="#00ffff"/>
               </div>
               <div className="col-lg-6" >
                  <SummeryCard icon={FaCheckCircle} text="Leave approve" number={summary.leaveSummary.approved} color='#bedd00'/>
               </div>
               <div className="col-lg-6">
                  <SummeryCard icon={FaHourglassHalf} text="Leave pending" number={summary.leaveSummary.pending} color="#b35900"/>
               </div>
               <div className="col-lg-6">
                  <SummeryCard icon={FaTimesCircle} text="Leave rejected" number={summary.leaveSummary.rejected} color="red"/>
               </div>
            </div>
         </div>
      </Wrapper>
   );
};

const Wrapper=styled.div`
h4{
   color:${({theme})=>theme.colors.login_btn_background};
   margin-top:20px;
   margin-bottom:20px;
}

.total_div{
   background:white;
   height:200px;
   display:flex;
   margin:auto;
   align-items:center;
   padding:30px;
   border-radius:10px;
}
.leave_details{
  
   background:white;
   height:500px;
   display:flex;
   margin:auto;
   align-items:center;
   padding:30px;
   border-radius:10px;
}
.heading{
   background:${({theme})=>theme.colors.login_btnHover_background};
   width:16%;
   color:white;
   font-size:20px;
   padding:7px;
}
.leave_heading{
   background:${({theme})=>theme.colors.login_btnHover_background};
   width:11%;
   color:white;
   font-size:20px;
   padding: 5px 8px ;
}

`





export default AdminSummery;