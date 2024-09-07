const BookReview = require('../models/BookReviewModel.js');

// Create a new book review
exports.createReview = async (req, res) => {
    try {
        const { title, author, reviewText, rating } = req.body;

        // Create a new review document
        const newReview = new BookReview({
            title,
            author,
            reviewText,
            rating
        });

        // Save the review to the database
        const savedReview = await newReview.save();

        res.status(201).json({
            success: true,
            data: savedReview
        });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all book reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await BookReview.find(); // Fetch all reviews
        res.status(200).json(reviews); // Send reviews as JSON response
    } catch (err) {
        console.error('Error fetching reviews:', err); // Log error for debugging
        res.status(500).json({ error: 'Server error' }); // Send server error response
    }
};


// Get a single book review by ID
exports.getReviewById = async (req, res) => {
    try {
        const review = await BookReview.findById(req.params.id).populate('user', 'username');
        if (!review) return res.status(404).json({ error: 'Review not found' });
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
// Ensure this path is correct

exports.updateReview = async (req, res) => {
    try {
        const { title, author, reviewText, rating } = req.body;
        const { id } = req.params;

        // Find the review by ID
        const review = await BookReview.findById(id);

        // Check if the review exists
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Update the review fields
        review.title = title || review.title;
        review.author = author || review.author;
        review.reviewText = reviewText || review.reviewText;
        review.rating = rating || review.rating;

        // Save the updated review
        await review.save();

        // Respond with the updated review
        res.status(200).json({ message: 'Review updated successfully', review });
    } catch (err) {
        // Handle errors
        res.status(400).json({ error: err.message });
    }
};


// Ensure the correct path to your model

exports.deleteReview = async (req, res) => {
    try {
        const review = await BookReview.findById(req.params.id);

        if (!review) {
            console.error('Review not found:', req.params.id);
            return res.status(404).json({ error: 'Review not found' });
        }

        await BookReview.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};


