
const { now } = require('mongoose');
const Order = require('../models/orderModel')
const Product = require('../models/productModel');
const UserModel = require('../models/userModel')

// FOR GIVE NEW ORDER
// const NewOrderController = async (req, res, next) => {
//     try {
//         req.body.user = req.user.id;

//         // Assuming req.body.items is an array containing product information
//         const orderItems = req.body.items.map(item => ({
//             name: item.name,
//             price: item.price,
//             quantity: item.quantity,
//             product: item.productId, // Assuming productId is provided in the request
//         }));

//         const newOrder = await Order.create({
//             user: req.user.id,
//             orderItems: orderItems,
//             // ... other fields in your orderSchema
//         });

//         res.status(200).send({
//             success: true,
//             message: 'New Order Created Successfully!',
//             orderInfo: newOrder,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             success: false,
//             message: 'Error In Creating New Order!',
//         });
//     }
// };


// Create new Order
const newOrder = async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });
}

//FOR GET ORDER DETAIL

const SingleOrderDetail = async (req, res, next) => {
    try {

        // req.params.id this get parameter value from API such as id
        // and then access its values to find detail 
        const OrderDetail = await Order.findById(req.params.id)

        res.status(200).send({
            success: true,
            message: 'Get Order Detail Successfully !',
            OrderDetail: OrderDetail,
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: 'Error In Getting Order Detail !'
        })
    }

}

// getlogin user order deatil 
const getLoginControll = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id });

        if (orders.length === 0) {
            res.status(404).send({
                success: false,
                message: `No orders created by the logged-in user:${req.user.name}`,
                orders,
            });
        } else {
            res.status(200).send({
                success: true,
                message: 'Getting Order Detail!',
                orders,
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting order detail!',
        });
    }
};

//All Order Amount For Admin
const GetAllOrder = async (req, res, next) => {
    try {
        const orders = await Order.find(req.body.id);

        let TotalAmount = 0;
        // Process the orders and send a response
        orders.forEach((orders) => {
            TotalAmount = TotalAmount + orders.totalPrice;
        })
        res.status(200).send({
            success: true,
            message: 'Getting all orders!',
            TotalAmount,
            orders,

        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in finding total amount of orders!',
        });
    }
};



// for Status of order 
const updateOrder = async (req, res) => {
    const orderId = req.params.id; // Assuming the order ID is passed in the URL parameters

    try {
        // Find the order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).send({
                success: false,
                message: 'Order not found!',
            });
        }

        if (order.orderStatus === 'Delivered') {
            return res.status(200).send({
                success: true,
                message: 'You Have  already delivered Your Order!',
            });
        }

        // Update stock for each product in the order
        order.orderItems.forEach(async (item) => {
            await updateStock(item.product, item.quantity);
            //console.log(item.product, item.quantity)
        });

        // Update the order status
        order.orderStatus = req.body.status;

        // If the new status is 'Delivered', update the deliveredAt timestamp
        if (req.body.status === 'Delivered') {
            order.deliveredAt = Date.now();
        }

        // Save the order with validation skipped
        await order.save({ validateBeforeSave: false });

        res.status(200).send({
            success: true,

        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error updating order status!',
        });
    }
};


//for update status of Stock 
const updateStock = async (productId, quantity) => {
    try {
        const product = await Product.findById(productId);

        if (!product) {
            console.error(`Product with ID ${productId} not found.`);
            return;
        }

        // Update the stock
        product.stock -= quantity;

        // Save the updated product
        await product.save();

        // console.log(`Stock updated for product ${productId}. New stock: ${product.stock}`);
    } catch (error) {
        console.error('Error updating stock:', error);
    }
};

// delete order
const deleteOrder = async (req, res) => {
    try {
        const orderToDelete = await Order.findById(req.params.id);

        if (!orderToDelete) {
            return res.status(404).send({
                success: false,
                message: 'Order not found',
            });
        }

        await orderToDelete.deleteOne();

        res.status(200).send({
            success: true,
            message: 'Order deleted successfully!',
        });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        });
    }
};





module.exports = {
    newOrder,
    SingleOrderDetail,
    getLoginControll,
    GetAllOrder,
    updateOrder,
    deleteOrder

}