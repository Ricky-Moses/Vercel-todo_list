import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb is connected....`);
    }
    catch(err){
        console.log(`Error in Mongodb connection....${err.message}`);
        process.exit(1)
    }
}

export default connectDB;