import 'dotenv/config'
import express from 'express'
import { dbConnection } from './db/DbConfig.js'
import MobileRouter from './src/routers/MobileRouter.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(MobileRouter)
app.get("/", (req,res)=>{
    res.send("hello ")
})


app.listen(7000,()=>{
    dbConnection()
    console.log(`server is listning on port ${process.env.PORT}`)
})