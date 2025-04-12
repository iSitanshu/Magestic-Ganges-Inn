import { Router } from "express";
import { getAvailableRooms, getparticularAvailableRooms, verifyUser,     getinRoomBooking
} from "../controllers/room.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router1 = Router()

router1.route('/available').get(
    upload.fields([]),
    getAvailableRooms
)

router1.route('/availableparticularroom').post(
    getparticularAvailableRooms
)

router1.route('/verifyuser').post(
    verifyUser
)

router1.route('/newBooking').post(
    getinRoomBooking
)

export default router1;