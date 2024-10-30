import User from '../Models/User_model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ success: false, error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(404).json({ success: false, error: "Wrong password" });
        }
        const token = jwt.sign({_id:user._id,role:user.role},
            process.env.JWT_TOKEN,{expiresIn:'30d'}
        )
       res.status(200).json({
        success:true,
        token,
        user:{_id:user._id,name:user.name,role:user.role},
    });


    } catch (error) {
        res.status(500).json({success:false,error:error.message});

    }
}


const verify=(req,res)=>{
   res.status(200).json({success:true,user:req.user});
}


export {login,verify};