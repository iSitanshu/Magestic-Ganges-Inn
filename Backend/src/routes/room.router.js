import { Router } from "express";
import { getAvailableRooms } from "../controllers/room.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router1 = Router()

router1.route('/available').get(
    upload.fields([]),
    getAvailableRooms
)

export default router1;