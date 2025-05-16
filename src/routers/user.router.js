import { Router } from "express";
import newUserController from "../controller/user.controller.js";


let router = Router()



router.post("/api/register",newUserController.Register)
router.get("/api/confirem/:token",newUserController.Confirem)
router.get("/api/users",newUserController.UserAll)
router.get("/",newUserController.belgi)



export default router