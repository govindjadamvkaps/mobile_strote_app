import 'dotenv/config'
import express from 'express'
import { dbConnection } from './db/DbConfig.js'
import MobileRouter from './src/routers/MobileRouter.js'

const app = express()
app.use(express.json())
app.use(MobileRouter)
app.get("/", (req,res)=>{
    res.send("hello ")
})


app.listen(7000,()=>{
    dbConnection()
    console.log(`server is listning on port ${process.env.PORT}`)
})