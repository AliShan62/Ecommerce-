const express = require('express');
const app = express();
const productRoute = require('./routers/productRoute');
const usersRoutr = require('./routers/usersRoutr');
const orderRoute = require('./routers/orderRoute');
const ReviewRoute=require('./routers/ReviewRoute')
const MiddlewareForIfElse = require('./middleware/error');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require("path");

app.use(bodyParser.json({ limit: '1000mb' }));
app.use(cookieParser());

// Corrected cors middleware configuration
const cors = require('cors');

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "../frontend", "build")));
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
    });
  
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // enable set cookie
}));
// Middleware for parsing JSON data in requests due to which we can access JSON data from req.body
// Set limit because I am sending images from frontend 
app.use(express.json({ limit: '1000mb' }));



// This is the parent route for products
app.use('/api/v1/products', productRoute);

// This is the parent route for users 
app.use('/api/v1/user', usersRoutr);
 
// This is the parent route for orders
app.use('/api/v1/order', orderRoute);

app.use('/api/v1/review', ReviewRoute);

// Middleware to reduce if-else code in our application 
app.use(MiddlewareForIfElse);

// Middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

module.exports = app;
