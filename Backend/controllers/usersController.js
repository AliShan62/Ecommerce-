const UserModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const tryCatchErrorHandler = require('../middleware/catchAsyncError');
const JWT = require('jsonwebtoken')
const express = require('express');
const session = require('express-session');
const cloudinary = require('cloudinary');
const { message } = require('antd');
const { text } = require('body-parser');

const nodeMailer = require('nodemailer')
const randomstring = require('randomstring');


const registerController = async (req, res) => {
    try {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        const existingUser = await UserModel.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({
                message: "User with this email is already registered.",
                success: false,
            });
        }

        if (req.body.password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password should be at least 8 characters',
            });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        req.body.password = hashPassword;

        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            description:req.body.description,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.url,
            }
        });

        const user = await newUser.save(req.body);

        res.status(200).json({
            message: "User registered successfully!",
            success: true,
            user
        });


    } catch (error) {
        // Log detailed error for development
        console.error("Registration Error:", error);

        res.status(500).json({
            message: "An error occurred during registration.",
            success: false
        });
    }
};





//Controller for Login user 

const loginController = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({
                message: "User Not Found",
                success: false,
            });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({
                message: "Invalid Email or Password",
                success: false,
            });
        }

        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            secure: false, // Set to true in production
            sameSite: 'strict', // Adjust based on your needs
        });
        res.status(200).send({
            message: "User Login Successfully!",
            success: true,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(200).send({
            success: false,
            message: `Error in Login Controller ${error.message}`,
        });
    }
};

//here Controller for logout
const logoutController = async (req, res, next) => {
    try {

        //   res.clearCookie('tokenForUser', { httpOnly: true });

        res.clearCookie('token', ' ', {
            httpOnly: true,
            sameSite: 'None', // or 'Strict' or 'Lax' based on your requirements
            secure: true,
        }); 

        res.status(200).send({
            success: true,
            message: 'User Logout Successfully!'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something Went Wrong  !'
        })
    }


}



//here is Controller for to get Login User Detail
const GetSingleUserDetail = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.userId);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found!"
            });
        }

        res.status(200).send({
            success: true,
            message: "Get Detail Of Single User Successfully",
            user,
        });
    } catch (error) {
        console.error(error);  
        res.status(500).send({
            success: false,
            message: "Something Went Wrong!", 
        }); 
    }
};
   





//here is PasswordUpdateController

const PasswordUpdateController = async (req, res, next) => {
    try {

        const user = await UserModel.findById(req.user.id)

        const isMatchedPaswword = await user.comparePassword(res.body.oldPassword)


        if (!isMatchedPaswword) {
            return res.status(400).send({
                success: false,
                message: "Old Password Is InCorrect !"
            })
        }
        if (req.body.newPassword !== req.body.comfirmPassword) {
            return res.status(400).send({
                success: false,
                message: " Password does not Matched !"
            })
        }


        user.password = req.body.newPassword;
        await user.save();

        const payload = {
            id: user._id,
            email: user.email,
            // Add more user-related data if needed
        };

        const token = JWT.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        console.log("UpdatedTokenValue:", token);
        // Save the JWT token in an HTTP-only cookie
        res.cookie("", token, {
            httpOnly: true, // Make the cookie inaccessible via client-side JavaScript
            secure: true
        });

        res.status(201).json({
            message: "User Password Updated Successfully !",
            success: true,
            user: user, // Include user information in the response
            token, 
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Update User Password !"
        })


    }
}



//forget password Controller
// const forgetPassword = async (req, res) => {
//     try {

//         const { email } = req.body;
//         const user = await UserModel.findOne({ email });

//         if (!user) {
//             return res.status(404).send({
//                 success: false,
//                 message: 'User Not Found!',
//             });
//         }

//         // Generate a reset token using the user's method
//         const resetToken = user.getResetPasswordToken();

//         // Save the user instance with validation disabled
//         await user.save({ validateBeforeSave: false });

//         // Construct the reset password URL
//         const resetPasswordUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

//         // Compose the email message
//         const message = `Your password reset token is:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, please ignore it.`;


//         // Send the email (make sure to define the sendEmail function)
//         await sendEmail({
//             email: user.email,
//             subject: 'Ecommerce Password Recovery',
//             message,
//         });

//         res.status(200).send({
//             success: true,
//             message: `Email sent to ${user.email} successfully`,
//         });
//     } catch (err) {
//         // Handle email sending errors
//         user.resetPasswordToken = undefined;
//         user.resetTokenExpire = undefined;
//         await user.save({ validateBeforeSave: false });
//         console.error("line no 312 into forgetpassword", err);
//         res.status(500).send('Internal Server Error');
//     }
// };


const sendEmail = require('../utils/sendEmail'); // Import the sendEmail function


const forgotPassword = async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email }); // Use 'users' to find the user

    try {

        if (user) {

            const randomToken = randomstring.generate(10);
            const updateUser = await user.updateOne({ email: req.body.email }, { $set: { token: randomToken } });
            sendEmail({ name: user.name, email: user.email, token: randomToken });
            // console.log(user.name, user.email, randomToken)

            res.status(200).send({
                success: true,
                message: 'Please Check Your Mail Inbox  And Resest Your Password!',
                updateUser
            })

        } else {
            res.status(500).send({
                success: false,
                message: 'This Email Does Not Exist !'
            })
        }



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'This Email Does Not Exist !'
        })
    }
};

// Function to handle resetting the password
const saltRounds = 10;

const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Find the user with the provided email and token
        const user = await UserModel.findOne({ email });

        if (user) {
            // Hash the new password before updating
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

            // Update the user's password and clear the token in the database
            await user.updateOne({ password: hashedPassword, token: null });

            res.status(200).send({
                success: true,
                message: 'Password reset successful!',
            });
        } else {
            res.status(400).send({
                success: false,
                message: 'Invalid email. Password reset failed.',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error. Password reset failed.',
        });    
    }
}; 


const updateUserInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updates = req.body;

        const user = await UserModel.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating user information', error });
    }
};


module.exports = {
    registerController,
    loginController,
    logoutController,
    GetSingleUserDetail,
    PasswordUpdateController,
    forgotPassword,
    resetPassword,
    updateUserInfo
}