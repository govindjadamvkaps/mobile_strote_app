import { AdminModel, MobileModel, RateModel } from "../models/MobileModel.js";
import {  StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

export async function fetchByObjId(req,res){
    try {
        const mobile = await MobileModel.findById(req.params.id).populate({path: 'ratingId', populate: {
            path: 'adminId'
        }})

        // const mobile = await MobileModel.findById(req.params.id).populate('ratingId')
        // console.log(mobile)
        res.status(StatusCodes.OK).json(mobile)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching product by obj Id"})
    }
}


export async function fetchMobileByRateId(req,res){
    try {
        const mobile = await MobileModel.findOne({ratingId:req.params.id})
        res.status(StatusCodes.OK).json(mobile)

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fatching mobile by rating Id"})
    }
}

// Admin Api

export async function saveAdmin(req,res){
    try {
        const encryptedPassword = bcrypt.hashSync(req.body.password, 10)
        
        req.body['password']= encryptedPassword
        
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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching admin"})
    }
}

export async function fetchAdminById(req,res){
    try {
        const admin = await AdminModel.findById(req.params.id).populate('ratingId')
        res.status(StatusCodes.OK).json(admin)
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching admin by obj Id"})
    }
}




// Login api

    export async function loginAdmin(req,res){
        try {
            const email = req.body.email
            const pass = req.body.password

          
            const admin = await AdminModel.findOne({ email: email })
           
            const isPassword =  bcrypt.compareSync(pass,admin.password)
            if(isPassword){
                const token = jwt.sign({_id:admin._id}, process.env.SECRET_KEY)

                res.cookie('jwtoken',token,{
                    expires: new Date(Date.now()+5000),
                    httpOnly: true
                })
                res.status(StatusCodes.OK).json({"token":token,admin})

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

        // alredy rate the product

        let rating = await RateModel.find({adminId:req.body.adminId ,mobileId: req.body.mobileId})
        // console.log(rating)
        if(rating.length){
            return res.status(StatusCodes.OK).json({
                message: "You have already rated this product",
                success: false
                })
        }

         rating =await RateModel(req.body)
        // console.log(req.body)
        // console.log(rating)
        // console.log(rating._id)
        rating.save()
        let  mobile=  await MobileModel.findById(req.body.mobileId).populate('ratingId')
        // console.log(mobile)

        mobile.ratingId.push(rating._id)
        // mobile.save()
        //change the product avg rating as well

        const rating1 = await RateModel.find({mobileId:req.body.mobileId})

        let sumRatings = 0

        rating1.map((val)=>{
            sumRatings+=val.rating
            // console.log(val.rating)
        })
        console.log(sumRatings)
        let avgRating = Math.round(sumRatings/rating1.length)
        // console.log("average",avgRating)
        mobile.star = avgRating
       
         const savedMobile = await mobile.save()
        // const savedRate = await rate.save()

        res.status(StatusCodes.CREATED).json({data:saveMobile,message:"rating successful", success: true})
        
        // res.status(StatusCodes.CREATED).json({savedMobile,savedRate})
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in saving rating data"})
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