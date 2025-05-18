import UserModel from "../models/user.model.js";
import JWT from "jsonwebtoken"
import nodemailer from "nodemailer"

export class UserService{
    constructor(){}

    static async createUser(body){

        try {

            let{password} = body
            if(!password) throw new Error("Password kiritilmadi")
            

            let tek = await UserModel.find({email:body.email})
            console.log(tek);
            
            if(!tek) throw new Error("Bu Email kiritilib ro'yxatdan otgan.")
            let newUser = await UserModel.create(body)
        
            let token = JWT.sign({email:newUser.email},"malina",{expiresIn:"1d"})
            let url = "https://telegram-users.onrender.com/api/confirem/" + token
    
    
            let transport = nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:"dilnozmamanova@gmail.com",
                    pass:"yhxfefczbhsmhrjr"
                }
            })
                             
            let optionGmail = {
                from :"'Najot ta\'lim'<dilnozmamanova@gmail.com>",
                to:body.email,
                subject:"Tasdiqlash kodi",
                html:`
                
                    <a href="${url}">Active qiling.</a>
                `
            }
                  
             
            await transport.sendMail(optionGmail)
    
            return "Emailga tasdiqlash code yuborildi."
        
        } catch (err) {
            


            return err.message
        }
    }


    static async userConfirem(token){
       
        try {
            
            let {email} =JWT.verify(token,"malina")

            let user = await UserModel.findOne({email})
    
            if(!user) throw new Error("User mavjud emas.")
    
                user.isValid = true
    
                user.save()
    
                return "Emailni tasdiqladingiz.😀😀"
        } catch (error) {

            return error.message
            
        }
    }



    static async AllUser(){
       
        try {
            let user = await UserModel.find()


            return user
            
        } catch (error) {
            
            return error.message
        }
  
    }

    
    static async EmailUser(email){
       
        try {
            console.log(email);
            
            let user = await UserModel.findOne({email})

            console.log(user);
            
            return user
            
        } catch (error) {
            
            return error.message
        }
  
    }

    static async DeleteUser(email){
       
        try {
            
            let user = await UserModel.deleteOne({email:email})


        
            
            if (user.deletedCount ==0) {
                throw new Error("Foydalanuvchi topilmadi");
            }

            return "Foydalanuvchi o'chirildi.😀😀😀"
            
        } catch (error) {
            
            return error.message
        }
  
    }
} 