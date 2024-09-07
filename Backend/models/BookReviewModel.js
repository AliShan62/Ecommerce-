const mongoose = require('mongoose');

const bookReviewSchema = new mongoose.Schema({
  
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Book author is required'],
        trim: true
    },
    reviewText: {
        type: String,
        required: [true, 'Review text is required'],
        trim: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Custom error handling for validation errors
bookReviewSchema.post('validate', function (error, doc, next) {
    if (error.name === 'ValidationError') {
        const errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
        next(new Error(errorMessage));
    } else {
        next(error);
    }
});

// Custom error handling for unique constraints
bookReviewSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Duplicate field value entered.'));
    } else {
        next(error);
    }
});

const BookReview = mongoose.model('BookReview', bookReviewSchema);

module.exports = BookReview;
