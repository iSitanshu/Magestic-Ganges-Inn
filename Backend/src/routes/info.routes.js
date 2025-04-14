import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { previousDetails, RestaurantBookings, PreviousRestaurantBookings, HallBookings, PreviousHallBookings } from '../controllers/info.controller.js'

const router3 = Router()

router3.route("/previousbookingdetails").post(
    previousDetails
)
router3.route("/currentrestaurantbooking").post(
    RestaurantBookings
)
router3.route("/previousrestaurantbooking").post(
    PreviousRestaurantBookings
)
router3.route("/currenthallbooking").post(
    HallBookings
)
router3.route("/previoushallbooking").post(
    PreviousHallBookings
)


export default router3;