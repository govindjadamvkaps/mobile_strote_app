import express from 'express'
import { saveAdmin, saveMobile, saveRating } from '../controllers/MobileController.js'


const MobileRouter = express.Router()


MobileRouter.post("/mobiles",saveMobile)
MobileRouter.post('/admins',saveAdmin)
MobileRouter.post('/ratings',saveRating)
export default MobileRouter