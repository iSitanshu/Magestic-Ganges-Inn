import { Router } from "express";
import { getAvailableRooms, getparticularAvailableRooms, verifyUser } from "../controllers/room.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router1 = Router()

router1.route('/available').get(
    upload.fields([]),
    getAvailableRooms
)

router1.route('/availableparticularroom').get(
    upload.fields([]),
    getparticularAvailableRooms
)

router1.route('/verifyuser').post(
    verifyUser
)

export default router1;