import mongoose from "mongoose";


export async function dbConnection(){
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("database connect sucessfully......")
    } catch (error) {
        console.log("error in database connecting...")
        console.log(error)
    }
}