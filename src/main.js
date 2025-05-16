import express from "express"
import mongo_connect from "./config/database.js"
import "dotenv/config"
import router from "./routers/user.router.js"

let PORT = process.env.PORT || 4000

let server = express()
server.use(express.json())
await mongo_connect()
server.use(router)




server.listen(PORT,()=> console.log("Server is running..."))