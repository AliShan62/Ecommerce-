const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Product Name'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        unique: true,
        required: [true, 'Please Enter Product Description'],
    },
    price: {
        type: Number,
        required: [true, 'Please Enter Product Price'],
        maxlength: [8, 'Price Cannot Exceed 8 Characters']
    },
    rating: {
        type: Number,
        default: 0,
    },
    image: [
        {
            public_id: {
                type: String,
                unique: true,
                required: true
            },
            public_url: {
                type: String,
                unique: true,
                required: true
            },
        }
    ],
    category: {
        type: String,
        unique: true,
        required: [true, 'Please Enter The Product Category']
    },
    stock: {
        type: Number, // Change to Number type
        required: [true, 'Please Enter The Product Stock'],
        maxlength: [4, 'Stock Cannot Exceed 4 Characters'],
        default: 1
    },
    numOfReviews: {
        type: Number, // Change to Number type
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                unique: true,
                required: true

            },
            rating: {
                type: Number, // Change to Number type
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    user: {
        type: mongoose.Schema.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
