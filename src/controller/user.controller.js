import { UserService } from "../service/user.service.js";

class UserController{
    constructor(){}

    async Register(req,res){

        try {
            let data = await UserService.createUser(req.body)

            res.status(201).json({message:"Succase",data})
        
        } catch (error) {
            console.log(error);
            res.status(400).json({status:400,message:error.message})
            
        }


    }

    
    async Confirem(req,res){

        try {
            let data = await UserService.userConfirem(req.params.token)

            res.status(201).json({message:"Succase",data})
        
        } catch (error) {
            console.log(error);
            res.status(400).json({status:400,message:error.message})
            
        }


    }


      
    async UserAll(req,res){

        try {
            let data = await UserService.AllUser()

            res.status(201).json({message:"Succase",data})
        
        } catch (error) {
            console.log(error);
            res.status(400).json({status:400,message:error.message})
            
        }


    }

    async belgi(req,res){
        try {          
            res.send("Hello World")
            
        } catch (error) {
            res.send(error)
        }
    }

    async email(req,res){
        try {          
            
            let data = await UserService.EmailUser(req.params.email)
            res.send(data)
            
        } catch (error) {
            res.send(error)
        }
    }


    async delete(req,res){
        try {          
            
            let data = await UserService.DeleteUser(req.params.email)
            res.send(data)
            
        } catch (error) {
            res.send(error)
        }
    }



}





let newUserController = new UserController()

export default newUserController