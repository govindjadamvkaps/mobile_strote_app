import express from 'express'
import { fetchAdmin, fetchByObjId, fetchMobile, fetchRating, loginAdmin, saveAdmin, saveMobile, saveRating } from '../controllers/MobileController.js'
import { tokenVerification } from '../middleware/VerifyToken.js'


const MobileRouter = express.Router()


MobileRouter.post("/mobiles",saveMobile)
MobileRouter.get("/mobiles",fetchMobile)
MobileRouter.get("/mobiles/:id", fetchByObjId)

MobileRouter.post('/registrations',saveAdmin)
MobileRouter.get("/admins", fetchAdmin)
MobileRouter.post("/login", loginAdmin)


MobileRouter.post('/ratings',saveRating)
MobileRouter.get('/ratings', fetchRating)
export default MobileRouter