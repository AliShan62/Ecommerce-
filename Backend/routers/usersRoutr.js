const express = require('express')
const router = express.Router()
const { registerController,
    loginController,
    logoutController,
    GetSingleUserDetail,
    PasswordUpdateController,
    forgotPassword,
    resetPassword,
    updateUserInfo
} = require('../controllers/usersController')
const { authMiddleware } = require('../middleware/authMiddleware')




// here i am defining the route for registeration 
router.post('/registration', registerController)

// here i am defining the route for Login 
router.post('/login', loginController)

// here i am defining the route for Login 
router.get('/logout', logoutController) 

//here is route to get detail of Single User
router.get('/me', authMiddleware, GetSingleUserDetail)



//here is route for Update User Password
router.put('/updatepassword/:id', PasswordUpdateController)

router.post('/forgetpassword', forgotPassword)


// Express route for resetting the password using PUT method
router.put('/reset-password', resetPassword);

// Update user information
router.put('/update/:userId', updateUserInfo);     

module.exports = router;   