import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Pagination, Modal, Alert, Form } from 'react-bootstrap';
import image from '../images/Screenshot 2024-07-27 161150.png';

function ReviewList() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedReview, setSelectedReview] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({});
    const reviewsPerPage = 3;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/api/v1/review/getAllReviews`);
                setReviews(response.data);
            } catch (err) {
                setError('Failed to fetch reviews');
                console.error('Error fetching reviews:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    const handleDelete = async (reviewId) => {
        console.log('Deleting review with ID:', reviewId); // Debugging log
        try {
            await axios.delete(`${window.location.origin}/api/v1/review/deleteReview/${reviewId}`);
            setReviews(reviews.filter(review => review._id !== reviewId));
            setShowModal(false);
        } catch (err) {
            console.error('Error deleting review:', err);
            setError('Failed to delete review');
        }
    };

    const handleEdit = async () => {
        try {
            await axios.put(`${window.location.origin}/api/v1/review/updateReview/${selectedReview._id}`, editFormData);
            setReviews(reviews.map(review => 
                review._id === selectedReview._id ? { ...review, ...editFormData } : review
            ));
            setShowEditModal(false);
        } catch (err) {
            console.error('Error updating review:', err);
            setError('Failed to update review');
        }
    };

    const handleShowModal = (review) => {
        setSelectedReview(review);
        setShowModal(true);
    };

    const handleShowEditModal = (review) => {
        setSelectedReview(review);
        setEditFormData({
            title: review.title,
            author: review.author,
            rating: review.rating,
            reviewText: review.reviewText,
        });
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setShowEditModal(false);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    if (loading) return <p>Loading...</p>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <>
            <div className='CartPageBanner'>
                <h1>READING IS ALWAYS</h1> 
                <h1>A GOOD IDEA</h1>
                <div className='para'>
                    <p>Reading is a timeless activity that enriches our minds and broadens our perspectives.
                    Whether it's diving into the pages of a classic novel, exploring the latest scientific research, or getting lost in a gripping mystery, books offer a gateway to new worlds and ideas.</p>
                    <button className="btn bg-white mt-3 hover px-4">READ MORE</button>
                </div>
            </div>
            <div className="container mt-5 p-5">
                {currentReviews.length > 0 ? (
                    currentReviews.map(review => (
                        <div key={review._id} className="row mb-3">
                            <div className="col-12 rounded-pill">
                                <Card className="border-primary">
                                    <div className="row g-0">
                                        <div className="col-md-3 d-flex justify-content-center align-items-center p-2">
                                            <Card.Img
                                                variant="top"
                                                src={image}
                                                className="rounded-circle"
                                                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                                alt="Review"
                                            />
                                        </div>
                                        <div className="col-md-9 p-2">
                                            <Card.Body>
                                                <Card.Title style={{ fontSize: '1.1rem' }}>{review.title}</Card.Title>
                                                <Card.Text>
                                                    <strong>Author:</strong> {review.author}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Rating:</strong> {review.rating}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Review:</strong> {review.reviewText.length > 150 ? `${review.reviewText.slice(0, 150)}...` : review.reviewText}
                                                </Card.Text>
                                                <Card.Text>
                                                    <small><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</small>
                                                </Card.Text>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="mt-2"
                                                >
                                                    Read More
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    className="mt-2 mx-3"
                                                    onClick={() => handleShowModal(review)}
                                                >
                                                    Delete Review
                                                </Button>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="mt-2 "
                                                    onClick={() => handleShowEditModal(review)}
                                                >
                                                    Edit Review 
                                                </Button>
                                            </Card.Body>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="row">
                        <div className="col-12 text-center">
                            <p>No reviews found.</p>
                        </div>
                    </div>
                )}
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    </Pagination>
                </div>
            </div>

            {/* Modal for confirmation */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the review titled "{selectedReview?.title}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(selectedReview?._id)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for editing */}
            <Modal show={showEditModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Review Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={editFormData.title}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAuthor">
                            <Form.Label>Author Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="author"
                                value={editFormData.author}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formRating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                name="rating"
                                value={editFormData.rating}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formReviewText">
                            <Form.Label>Add Review</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="reviewText"
                                value={editFormData.reviewText}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ReviewList;
