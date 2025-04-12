import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { previousDetails } from '../controllers/info.controller.js'

const router3 = Router()

router3.route("/previousbookingdetails").post(
    previousDetails
)

export default router3;