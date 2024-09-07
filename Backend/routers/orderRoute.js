const express = require('express')
const router = express.Router();

const {
    newOrder,
    SingleOrderDetail,
    getLoginControll,
    GetAllOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/orderController')
const { authMiddleware } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/authMiddleware');

//here i am going to define routers of Order
router.post('/neworder', authMiddleware, newOrder,)

//here i am going to define routers of Order
router.get('/singleorderdetail/:id', authMiddleware, SingleOrderDetail)

//here route for loginUser order
router.get('/loginuserorder', authMiddleware, getLoginControll)

//here route for AllOrder Amount 
router.get('/getallorder', authMiddleware, isAdmin, GetAllOrder)

//here route for update order Status
router.put('/updateorderstatus/:id', authMiddleware, isAdmin, updateOrder)

// here is delete route
router.delete('/deleteorder/:id', authMiddleware, isAdmin, deleteOrder);
module.exports = router