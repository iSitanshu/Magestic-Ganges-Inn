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

export { previousDetails };