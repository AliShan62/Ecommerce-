import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import{Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


function ReviewForm() {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        reviewText: "",
        rating: 1
    });

    const [errors, setErrors] = useState({});
    const [hoverRating, setHoverRating] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRating = (rating) => {
        setFormData({ ...formData, rating });
    };

    const handleMouseOver = (rating) => {
        setHoverRating(rating);
    };

    const handleMouseOut = () => {
        setHoverRating(0);
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.title) formErrors.title = 'Book title is required';
        if (!formData.author) formErrors.author = 'Author name is required';
        if (!formData.reviewText) formErrors.reviewText = 'Review text is required';
        if (formData.rating < 1 || formData.rating > 5) formErrors.rating = 'Rating must be between 1 and 5';
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/api/v1/review/createReview", formData);
            if (response.data.success) {
                message.success('Review Submitted Successfully!');
                setFormData({
                    title: "",
                    author: "",
                    reviewText: "",
                    rating: 0
                });
                setErrors({}); // Clear errors on successful submission
            } else {
                message.error('Failed to submit review.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            message.error('Something went wrong. Please try again.');
        }
    };

    return (
        <div className=" mt-4" style={{ width: '80%', margin: 'auto' }}>
            <div className="row justify-content-center">
                <div className="col-lg-10"> {/* Adjust column size for wider form */}
                    <div className="card border-primary shadow-sm">
                        <div className="card-body">

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Book Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    />
                                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Author Name</label>
                                    <input
                                        type="text"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleChange}
                                        className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                                    />
                                    {errors.author && <div className="invalid-feedback">{errors.author}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Rating</label>
                                    <div
                                        className="d-flex align-items-center mb-3"
                                        onMouseOut={handleMouseOut}
                                    >
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <span
                                                key={num}
                                                onClick={() => handleRating(num)}
                                                onMouseOver={() => handleMouseOver(num)}
                                                style={{
                                                    fontSize: '1.5rem',
                                                    cursor: 'pointer',
                                                    color: num <= formData.rating || num <= hoverRating ? '#ffc107' : '#e4e5e9',
                                                    marginRight: '5px'
                                                }}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    {errors.rating && <div className="text-danger">{errors.rating}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Add Review</label>
                                    <textarea style={{maxHeight:'150px'}}
                                        name="reviewText"
                                        value={formData.reviewText}
                                        onChange={handleChange}
                                        className={`form-control ${errors.reviewText ? 'is-invalid' : ''}`}
                                        rows="5"

                                    />
                                    {errors.reviewText && <div className="invalid-feedback">{errors.reviewText}</div>}
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Submit Review
                                </button>

                                <Link to='/ReviewList' className='btn btn-secondary ms-3'> Get Reviews</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewForm;
