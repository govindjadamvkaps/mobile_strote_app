import express from 'express'
import { fetchAdmin, fetchMobile, fetchRating, loginAdmin, saveAdmin, saveMobile, saveRating } from '../controllers/MobileController.js'


const MobileRouter = express.Router()


MobileRouter.post("/mobiles",saveMobile)
MobileRouter.get("/mobiles", fetchMobile)

MobileRouter.post('/registrations',saveAdmin)
MobileRouter.get("/admins", fetchAdmin)
MobileRouter.post("/login", loginAdmin)


MobileRouter.post('/ratings',saveRating)
MobileRouter.get('/ratings', fetchRating)
export default MobileRouter