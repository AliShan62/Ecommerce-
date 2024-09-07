// routes/bookReviews.js
const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();
const {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
} = require('../controllers/bookReviewController');

router.post('/createReview', createReview);
router.get('/getAllReviews', getAllReviews);
router.get('/getReviewById/:id',getReviewById);
router.put('/updateReview/:id', updateReview );
router.delete('/deleteReview/:id', deleteReview );

module.exports = router;
