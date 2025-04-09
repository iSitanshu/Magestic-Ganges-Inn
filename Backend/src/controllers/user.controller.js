import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const generateAccesssAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()


        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}

    }catch(error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access Token")
    }
}

const registerUser = asyncHandler( async (req, res) => {

    const {email, username, password} = req.body

    if(
        [email, username, password].some((field)=>
        field?.trim() === "")
    ) throw new ApiError(400, "All fields are required");
    

    const exitedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if(exitedUser) throw new ApiError(409, "User with email or username already exit")

    const adminEmails = ['one@one.com'];
    const managerEmails = ['two@two.com'];

    let role = 'User';
    if (adminEmails.includes(email)) role = 'Admin';
    else if (managerEmails.includes(email)) role = 'Manager';


    const user = await User.create({
        email,
        password,
        username: username.toLowerCase(),
        role
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) throw new ApiError(500, "Something went wrong while registering the user")
    
        return res.status(201).json(
            new ApiResponse(200, 
                createdUser, 
                "User registered successfully"
            )
        );        

})

const loginUser = asyncHandler( async (req, res) => {

    const {email, username, password} = req.body

    if(!username && !email) throw new ApiError(400, "Username or Email is required");

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user) throw new ApiError(404, "User does not exist");
 
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid) throw new ApiError(404, "Invalid user credentials");

    const { accessToken, refreshToken } = await generateAccesssAndRefreshTokens(user._id)

 
    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In successfully"
        )
    )

})

const logoutUser = asyncHandler( async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "User logged out"))
    
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccesssAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword, confPassword} = req.body

    if(!(newPassword === confPassword)) {
        throw new ApiError(400, "Password should be same")
    }

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})


const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {username, email} = req.body

    if (!username || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                username,
                email: email
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});

const checkmember = asyncHandler(async(req, res) => {
    const {email, username, password} = req.body
    
    if(!username && !email) throw new ApiError(400, "Username or Email is required");
    
    const check = await User.findOne({
        $or: [{username}, {email}]
    })
    if(!check) throw new ApiError(404, "User does not exist");
    if(check.isMember == true) throw new ApiError(404, "You are already our Member")
    
    const user = User.findByIdAndUpdate(req.user?._id,
        req.user?._id,
        {
            $set: {
                isMember: true
            }
        },
        {new: true}
    ).select("-password")
    
    return res
    .status(200)
    .json(new ApiResponse(200, check.user , "You are a member"))
});

export { registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, checkmember }