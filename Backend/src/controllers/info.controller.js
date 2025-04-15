import { HallBooking } from "../models/hallbooking.model.js";
import { RestaurantBooking } from "../models/restaurantbooking.model.js";
import { RoomBooking } from "../models/roombooking.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const previousDetails = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) throw new ApiError(400, "User Id required");

    const previousBookings = await RoomBooking.find({ userId });
    if (!previousBookings || previousBookings.length === 0) {
        throw new ApiError(404, "No previous bookings found");
    }

    return res.status(200).json(
        new ApiResponse(200, previousBookings, "All your previous bookings")
    );
});

const RestaurantBookings = asyncHandler( async(req, res) => {
    const { userId, guests, seats, bookingDate, timeSlot } = req.body;

    if(!userId && !guests && !seats && !bookingDate && !timeSlot) throw new ApiError(400, "All fields are required");

    const booking = await RestaurantBooking.create({
        userId, 
        guests, 
        seats, 
        bookingDate, 
        timeSlot,
        status: 'booked'
    })

    return res.status(201).json(
        new ApiResponse(200, 
            booking, 
            "Restaurant Booking registered successfully"
        )
    ); 
})

const PreviousRestaurantBookings = asyncHandler( async (req, res) => {
    const { userId } = req.body;

    if (!userId) throw new ApiError(400, "User Id required");

    const previousRestaurantBookings = await RestaurantBooking.find({ userId });
    if (!previousRestaurantBookings || previousRestaurantBookings.length === 0) {
        throw new ApiError(404, "No previous bookings found");
    }

    return res.status(200).json(
        new ApiResponse(200, previousRestaurantBookings, "All your previous bookings")
    );
})

const HallBookings = asyncHandler( async (req, res) => {
    const { userId, eventName, Method, bookingDate, timeSlot } = req.body

    if(!userId && !eventName && !Method && !bookingDate && !timeSlot) throw new ApiError(400, "All fields are required");

    const hallbooking = await HallBooking.create({
        userId,
        eventName,
        Method,
        bookingDate,
        timeSlot,
        status: 'booked'
    })
    return res.status(201).json(
        new ApiResponse(200, 
            hallbooking, 
            "Hall Booking registered successfully"
        )
    ); 
})

const PreviousHallBookings = asyncHandler( async (req, res) => {
    const { userId } = req.body;

    if (!userId) throw new ApiError(400, "User Id required");

    const previousHallBookings = await HallBooking.find({ userId });
    if (!previousHallBookings || previousHallBookings.length === 0) {
        throw new ApiError(404, "No previous Hall bookings found");
    }

    return res.status(200).json(
        new ApiResponse(200, previousHallBookings, "All your previous Hall bookings")
    );
})

const FromToBooking = asyncHandler(async (req, res) => {
    const { fromDate, toDate } = req.body;



    if (!fromDate || !toDate) throw new ApiError(400, "Both fromDate and toDate are required");

    const specificBookings = await RoomBooking.find({
        fromDate: {
            $gte: new Date(fromDate).setHours(0, 0, 0, 0),
            $lte: new Date(toDate).setHours(23, 59, 59, 999)
        }
    });

    if (!specificBookings || specificBookings.length === 0) {
        throw new ApiError(404, "No bookings found in this date range");
    }

    return res.status(200).json(
        new ApiResponse(200, specificBookings, "All bookings in the specified date range")
    );
});

const FromToRestaurantBooking = asyncHandler(async (req, res) => {
    const { specificDate } = req.body;

    if (!specificDate) throw new ApiError(400, "specificDate is required");

    const specificBookings = await RestaurantBooking.find({
        bookingDate: {
            $gte: new Date(specificDate).setHours(0, 0, 0, 0),
            $lte: new Date(specificDate).setHours(23, 59, 59, 999)
        }
    });

    if (!specificBookings || specificBookings.length === 0) {
        throw new ApiError(404, "No bookings found on the specified date");
    }
    return res.status(200).json(
        new ApiResponse(200, specificBookings, "All bookings on the specified date")
    );
});
const FromToHallBooking = asyncHandler(async (req, res) => {
    const { specificDate } = req.body;

    if (!specificDate) throw new ApiError(400, "specificDate is required");

    const specificBookings = await HallBooking.find({
        bookingDate: {
            $gte: new Date(specificDate).setHours(0, 0, 0, 0),
            $lte: new Date(specificDate).setHours(23, 59, 59, 999)
        }
    });

    if (!specificBookings || specificBookings.length === 0) {
        throw new ApiError(404, "No bookings found on the specified date");
    }
    return res.status(200).json(
        new ApiResponse(200, specificBookings, "All bookings on the specified date")
    );
});

export { previousDetails, RestaurantBookings, PreviousRestaurantBookings, 
    HallBookings, PreviousHallBookings, FromToBooking, FromToHallBooking, FromToRestaurantBooking };
