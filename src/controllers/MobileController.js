import { AdminModel, MobileModel, RateModel } from "../models/MobileModel.js";
import {  StatusCodes } from 'http-status-codes'


export async function saveMobile(req,res){
    try {
        const mobile = MobileModel(req.body)
        const savedMobile = await mobile.save()
        res.status(StatusCodes.CREATED).json(savedMobile)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in saving data"})
    }
}


export async function saveAdmin(req,res){
    try {
        const admin = AdminModel(req.body)
        const savedAdmin = await admin.save()
        res.status(StatusCodes.CREATED).json(savedAdmin)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in saving admin"})
    }
}


export async function saveRating(req,res){
    try {
        const rate = RateModel(req.body)
        const savedRate = await rate.save()
        res.status(StatusCodes.CREATED).json(savedRate)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in saving admin"})
    }
}