import mongoose from 'mongoose';
import Employee from './employee_model.js';
import Leave from './Leave_model.js';
import Salary from './salary_model.js';

const departmentSchema = new mongoose.Schema({
    dep_name: { type: String, required: true },
    description: { type: String},
    createAt:{type:Date,default: Date.now},
     updatedAt:{type:Date,default: Date.now},
});


departmentSchema.pre("deleteOne",{document:true,query:false},async function(next) {
    try{
        const employees = await Employee.find({department:this._id});
        const empIds = employees.map(emp=> emp._id)
        await Employee.deleteMany({department:this._id})
        await Leave.deleteMany({employeeId:{$in:empIds}})
        await Salary.deleteMany({employeeId:{$in:empIds}})
        next()
    }catch(error){
        next(error);
    }
})



const Department = mongoose.model('Department', departmentSchema);
export default Department;