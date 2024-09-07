const express = require('express');
const router = express.Router();

const {
    productCreateController,
    productGetController,
    productUpdateController,
    productDeleteController,
    GetSingleProductDetailController } = require('../controllers/productController');

const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')

//Route for Create New Product ----JUST FOR ADMIN 
router.post("/Newproduct", authMiddleware, isAdmin, productCreateController);
  // hallo
// Route for Get All The Product  
router.get('/GetAllproduct', productGetController)

// Route For Update The Product Detail ----JUST FOR ADMIN 
router.put("/UpdateProduct/:id", authMiddleware, isAdmin, productUpdateController)

// Route For delete The Product  ----JUST FOR ADMIN 
router.delete("/DeleteProduct/:id", authMiddleware, isAdmin, productDeleteController)

// Route For Get Detail Of Single Product  
router.get('/GetSingleproduct/:id',authMiddleware, GetSingleProductDetailController)
module.exports = router;

