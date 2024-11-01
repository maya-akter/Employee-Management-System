import User from "../Models/User_model.js";
import bcrypt from 'bcrypt';
import multer from 'multer';
import Employee from "../Models/employee_model.js";
import path from 'path';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});


const upload = multer({ storage: storage })

const addEmployees = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role
        } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already registerd in emp" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : ""

        });
        const savedUse = await newUser.save();
        const newEmployee = new Employee({
            userId: savedUse._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        });
        await newEmployee.save();
        return res.status(200).json({ success: true, message: "employee created" });
    } catch (error) {
        
        res.status(500).json({ success: false, error: "Server error from adding employee" });
    }
}



const getEmployees = async (req, res) => {
    try {


        const employees = await Employee.find().populate('userId', { password: 0 }).populate('department');



        return res.status(200).json({ success: true, employees });

    } catch (error) {
        return res.status(500).json({ success: false, error: "get employees server error" });
    }
}

const getEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        let employee;
         employee = await Employee.findById({ _id: id })
        .populate('userId', { password: 0 })
        .populate('department');
        if(!employee){
          employee =  await Employee.findOne({ userId: id })
            .populate('userId', { password: 0 })
            .populate('department');
        }
        return res.status(200).json({ success: true, employee });

    } catch (error) {
        return res.status(500).json({ success: false, error: "get employee server error" });
    }
}


const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            maritalStatus,
            designation,
            department,
            salary,
            employeeId,
            dob,
            gender
           } = req.body;

        const employee = await Employee.findById({ _id: id });
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }
        const user = await User.findById({ _id: employee.userId });
        if (!user) {
            return res.status(404).json({ success: false, error: "user not found" });
        }

        const updateUser = await User.findByIdAndUpdate({ _id: employee.userId },{name});
        const updateEmployee = await Employee.findByIdAndUpdate({ _id: id }, {
           
            maritalStatus,
            designation,
            salary,
            department,
            employeeId,
            dob,
            gender
        });



        if (!updateEmployee || !updateUser) {
            return res.status(404).json({ success: false, error: "document not found" });
        }

        return res.status(200).json({ success: true, message: "employee update" });

    } catch (error) {
        return res.status(500).json({ success: false, error: "update employee server error" });
    }
}


 const fetchEmployessByDepId=async(req,res)=>{
    const { id } = req.params;
    try {

        const employees = await Employee.find({ department: id });
        return res.status(200).json({ success: true, employees });

    } catch (error) {
        return res.status(500).json({ success: false, error: "get employees ByDepId server error" });
    }
}


export {
    addEmployees,
    getEmployees,
    getEmployee,
    updateEmployee,
    fetchEmployessByDepId,
    upload,

}

