import Leave from '../Models/Leave_model.js';
import Employee from '../Models/employee_model.js';

const addLeave = async(req,res)=>{
    try {
        const {userId,leaveType,startDate,endDate,reason} = req.body;
        const employee = await Employee.findOne({userId});
        const newLeave = new Leave ({
           employeeId:employee._id,
           leaveType,
           startDate,
           endDate,
            reason
        });
        await newLeave.save();
        return res.status(200).json({success:true});
    } catch (error) {
        return res.status(500).json({success:false,error:'Leave add server error'});
    }
}






const getLeaves=async(req,res)=>{
    try {
        // const {id} = req.params;
        // let leaves  = await Leave.find({employeeId:id});
        // if(!leaves || leaves.length === 0){
        //     const employee = await Employee.findOne({userId:id});
        //     leaves = await Leave.find({employeeId:employee._id});
        // }
        const leaves = await Leave.find().populate({
            path:"employeeId",
            populate:[
                {path:'department',select:'dep_name'},
                {path:'userId',select:'name'}
            ]
        })
        return res.status(200).json({success:true,leaves});
    } catch (error) {
        return res.status(500).json({success:false,error:'get leave server error'});
    }
}






const getLeave=async(req,res)=>{
try {
    const {id} = req.params;
    const employee = await Employee.findOne({userId:id});
    const leaves = await Leave.find({employeeId:employee._id});
    return res.status(200).json({success:true,leaves})
} catch (error) {
    return res.status(500).json({success:false,error:'get leaves server error'});
}
}


const getLeaveDetail=async(req,res)=>{
    try {
       const {id} = req.params;
       console.log(id);
       
        const leave = await Leave.findById({_id:id}).populate({
            path:"employeeId",
            populate:[
                {path:'department',select:'dep_name'},
                {path:'userId',select:'name ,profileImage'}
            ]
        })
        return res.status(200).json({success:true,leave});
    } catch (error) {
        return res.status(500).json({success:false,error:'get leave server error'});
    }
}


export {
    addLeave,
    getLeave,
    getLeaves,
    getLeaveDetail,
   
}