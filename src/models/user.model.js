import mongoose, { Schema ,model} from "mongoose";

let UserScheme = new Schema({
    name:String,
    email:String,
    password:String,
    isValid:{type:Boolean,default:false}
},{strict:true})

let UserModel = model("Students",UserScheme)

export default UserModel