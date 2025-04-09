import { Router } from 'express'
import { loginUser, logoutUser, registerUser, refreshAccessToken, checkmember } from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = Router()

router.route('/register').post(
    upload.fields([]),
    registerUser
)

router.route("/login").post(
    loginUser
)

//secured routes
router.route('/logout').post(verifyJWT, logoutUser)
router.route('/refresh-token').post(refreshAccessToken)
router.route("/ismember").post(checkmember)

export default router;