import UserModel from "../models/user.model.js";
import JWT from "jsonwebtoken"
import nodemailer from "nodemailer"

export class UserService{
    constructor(){}

    static async createUser(body){
        let newUser = await UserModel.create(body)
        
        let token = JWT.sign({email:newUser.email},"malina",{expiresIn:"10m"})
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
    
    }


    static async userConfirem(token){
        let {email} =JWT.verify(token,"malina")

        let user = await UserModel.findOne({email})

        if(!user) throw new Error("User mavjud emas.")

            user.isValid = true

            user.save()

            return "Emailni tasdiqladingiz.😀😀"
    }



    static async AllUser(token){
       

        let user = await UserModel.find()


        return user
    }
} 