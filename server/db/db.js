import mongoose from "mongoose";

const connectTodb=async()=>{
    try {
        await mongoose.connect(process.env.MONGOURL)
    } catch (error) {
        console.log(error);
        
    }
}

export default connectTodb;