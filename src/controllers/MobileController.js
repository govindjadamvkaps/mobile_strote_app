import { AdminModel, MobileModel, RateModel } from "../models/MobileModel.js";
import {  StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'

// Mobile Api
export async function saveMobile(req,res){
    try {
        const mobile = MobileModel(req.body)
        const savedMobile = await mobile.save()
        res.status(StatusCodes.CREATED).json(savedMobile)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in saving data"})
    }
}

export async function fetchMobile(req,res){
    try {
        const mobile = await MobileModel.find()
        res.status(StatusCodes.OK).json(mobile)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching product"})
    }
}


// Admin Api

export async function saveAdmin(req,res){
    try {
        const encryptedPassword = bcrypt.hashSync(req.body.password, 10)
        //const encryptedConfirmPassword = bcrypt.hashSync(req.body.cpassword,10)
        req.body['password']= encryptedPassword
        // req.body['cpassword'] = encryptedConfirmPassword
        const admin = AdminModel(req.body)
        const savedAdmin = await admin.save()
        res.status(StatusCodes.CREATED).json(savedAdmin)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in saving admin"})
    }
}
export async function fetchAdmin(req,res){
    try {
        const admin  = await AdminModel.find()
        res.status(StatusCodes.OK).json(admin)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching product"})
    }
}





    export async function loginAdmin(req,res){
        try {
            const email = req.body.email
            const pass = req.body.password

          
            const admin = await AdminModel.findOne({ email: email })
           
            const isPassword =  bcrypt.compareSync(pass,admin.password)
            if(isPassword){
                res.status(StatusCodes.OK).json(admin)

            }else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"password is not match"})
            }

        } catch (error) {
            console.log(error)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in login"})
        }
    }







// Rating Api

export async function saveRating(req,res){
    try {
        const rate = RateModel(req.body)
        const savedRate = await rate.save()
        res.status(StatusCodes.CREATED).json(savedRate)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in saving admin"})
    }
}

export async function fetchRating(req,res){
    try {
        const rate  = await RateModel.find()
        res.status(StatusCodes.OK).json(rate)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching product"})
    }
}