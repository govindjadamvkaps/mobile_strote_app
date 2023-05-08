import jwt from 'jsonwebtoken'
import { StatusCodes  } from 'http-status-codes'

export async function tokenVerification(req,res,next){
    try {
        let token = req.cookies.jwtoken;
        // const authHeader = req.get('Authorization')
        //  token = authHeader.replace('Bearer ',"")
        console.log(token)
        const verifyUser = await jwt.verify(token, process.env.SECRET_KEY)
        console.log(!verifyUser)
        if(!verifyUser){
            res.status(StatusCodes.UNAUTHORIZED).json({message:"token is not verify"})
        }else{
            next()
        }

    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({message:"catch error"})
    }
}