import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Room } from '../models/room.model.js'

const getAvailableRooms = asyncHandler( async(req, res) => {
    const { seat, balcony } = req.query

    if(!seat || balcony === undefined) throw new ApiError(400, 'Seats and balcony status requred');

    const filter = {
        seat: Number(seat),
        balcony: balcony === "true",
        isAvailable: true
    }

    const avaiableRooms = await Room.find(filter)

    if(!avaiableRooms) throw ApiError(400, 'Rooms have been booked for particular date');

    // if(avaiableRooms.length === 0) throw new ApiError(400, 'Room not available');
  
    return res.status(201).json(
        new ApiResponse(200,
            {
                count: avaiableRooms.length,
                rooms: avaiableRooms
            },
            "Here is the Info about the selected room"
        )
    )
})

export { getAvailableRooms }