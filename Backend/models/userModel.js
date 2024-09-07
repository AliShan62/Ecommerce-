const { Descriptions } = require('antd');
const mongoose = require('mongoose');
const validator = require('validator');
 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter Your Correct Name'],
        unique: true,
        minLength: [3, 'Name Should Have More Than 3 Characters'],
        maxLength: [30, 'Name Cannot Exceed 30 Characters'],
    },
    email: {
        type: String,
        required: [true, 'Enter Your Email Address'],
        validate: [validator.isEmail, 'Please Enter a valid Email Address'],
    },
    password: { 
        type: String,
        required: [true, 'Enter Your Password'],
        minLength: [8, 'Password Should Be at Least 8 Characters'],
    },
    description:{
        type: String,
        required: [true, 'Enter User Password'],
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        default: "user"
    },

    token: {
        type: String,
        default: ''
    }

});



const users = mongoose.model('users', userSchema);

module.exports = users;
