import connectTodb from "./db/db.js";
import User from "./Models/User_model.js";
import bcrypt from 'bcrypt';


const userRegister=async(req,res)=>{
    connectTodb();
    try {
        const hashpassword = await bcrypt.hash('admin',10);
        const newUser = new User({
            name:"Admin",
            email:"admin@gmail.com",
            password:hashpassword,
            role:"admin"
        })
        await newUser.save();
    } catch (error) {
        console.log(error);
        
    }    
}


userRegister();