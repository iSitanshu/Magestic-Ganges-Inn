import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Room } from '../models/room.model.js'
import { User } from "../models/user.model.js";
import { RoomBooking } from "../models/roombooking.model.js";
import mongoose from "mongoose";

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

const getparticularAvailableRooms = asyncHandler(async (req, res) => {
    const { roomId, fromDate, toDate } = req.body;
    console.log(roomId, fromDate,toDate)

    if (!fromDate || !roomId || !toDate) {
        throw new ApiError(400, 'Room ID, Arrival, and Departure dates are required');
    }

    // Check if the room is booked for the given date range
    const isRoomBooked = await RoomBooking.findOne({
        roomId: new mongoose.Types.ObjectId(roomId),
        $or: [
            { fromDate: { $lte: new Date(toDate) }, toDate: { $gte: new Date(fromDate) } }
        ]
    });

    if (isRoomBooked) {
        throw new ApiError(400, 'Room is already booked for the selected date range');
    }

    // Fetch room details
    const roomDetails = await Room.findById(roomId);

    if (!roomDetails) {
        throw new ApiError(404, 'Room not found');
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                room: roomDetails,
                message: 'Room is available for the selected date range'
            },
            "Here is the Info about the selected room"
        )
    );
});

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

const getinRoomBooking = asyncHandler(async (req, res) => {
    const { userId, roomId, fromDate, toDate, guests, totalPrice} = req.body;

    // Validate required fields
    if (!userId || !roomId || !fromDate || !toDate || !guests || !totalPrice) {
        throw new ApiError(400, "All fields are required: userId, roomId, fromDate, toDate, guests, totalPrice, status");
    }

    // Check if the room exists and is available
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
        throw new ApiError(400, "Invalid roomId format");
    }
    const room = await Room.findById(roomId);
    if (!room) throw new ApiError(404, "Room not found");
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid userId format");
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    // Create booking details
    const bookingDetails = {
        userId: new mongoose.Types.ObjectId(userId),
        roomId: new mongoose.Types.ObjectId(roomId),
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        guests: Number(guests),
        totalPrice: Number(totalPrice),
        status: 'booked' // Default status as per the model
    };

    // Save booking details (assuming a Booking model exists)
    const newBooking = await RoomBooking.create(bookingDetails);

    // Update room availability
    await Room.findByIdAndUpdate(roomId, { isAvailable: false });

    return res.status(201).json(
        new ApiResponse(201, newBooking, "Room booking successful")
    );
});

export { getAvailableRooms, getparticularAvailableRooms, verifyUser, getinRoomBooking }