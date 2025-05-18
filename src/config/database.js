import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

async function mongo_connect(){

    try {
        await mongoose.connect("mongodb+srv://Faxriddin:11201111@cluster0.lrftgr1.mongodb.net/Talabalar?retryWrites=true&w=majority&appName=Cluster0")
        console.log("MongoDB ga ulandi...");
        
    } catch (error) {
        console.log(error,"Ulanmadi...");
        
    }
}

export default mongo_connect