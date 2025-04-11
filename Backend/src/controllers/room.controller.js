import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Room } from '../models/room.model.js'
import { User } from "../models/user.model.js";

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
const getparticularAvailableRooms = asyncHandler( async(req, res) => {
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

const verifyUser = asyncHandler(async (req, res) => {
  const { email, password, phoneno } = req.body;
  
  // Require all details
  if (!email || !password || !phoneno) {
    throw new ApiError(400, "Email, password and phone number are required");
  }

  const exitedUser = await User.findOne({ email });
  if (!exitedUser) throw new ApiError(404, "User does not exist");

  const isPasswordValid = await exitedUser.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(404, "Invalid user credentials");

  // Update phone number if necessary
  const updatedUser = await User.findByIdAndUpdate(
    exitedUser._id,
    { $set: { phoneno } },
    { new: true }
  ).select("-password");

  return res.status(200).json(
    new ApiResponse(200, updatedUser, "User verified")
  );
});

export { getAvailableRooms, getparticularAvailableRooms, verifyUser }