import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { previousDetails, RestaurantBookings, PreviousRestaurantBookings, HallBookings, PreviousHallBookings,
    FromToBooking, FromToRestaurantBooking, FromToHallBooking
 } from '../controllers/info.controller.js'

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
router3.route("/fromtobooking").post(
    FromToBooking
)
router3.route("/fromtorestaurantbooking").post(
    FromToRestaurantBooking
)
router3.route("/fromtohallbooking").post(
    FromToHallBooking
)

export default router3;