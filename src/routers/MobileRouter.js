import express from 'express'
import { fetchAdmin, fetchAdminById, fetchByObjId, fetchMobile, fetchMobileByRateId, fetchRating, loginAdmin, saveAdmin, saveMobile, saveRating } from '../controllers/MobileController.js'
import { tokenVerification } from '../middleware/VerifyToken.js'


const MobileRouter = express.Router()


MobileRouter.post("/mobiles",saveMobile)
MobileRouter.get("/mobiles",fetchMobile)
MobileRouter.get("/mobiles/:id", fetchByObjId)
MobileRouter.get("/mobiles/rate/:id",fetchMobileByRateId)

MobileRouter.post('/registrations',saveAdmin)
MobileRouter.get("/admins", fetchAdmin)
MobileRouter.get("/admins/:id",fetchAdminById)
MobileRouter.post("/login", loginAdmin)


MobileRouter.post('/ratings',saveRating)
MobileRouter.get('/ratings', fetchRating)
export default MobileRouter