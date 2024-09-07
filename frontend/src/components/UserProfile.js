import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Spinner, Alert, Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import image from '../images/Screenshot 2024-07-27 161150.png'; // Placeholder image

function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({
        name: '',
        email: '',
        description: '',
    });
    const [successMessage, setSuccessMessage] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found. Please login.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${window.location.origin}/api/v1/user/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data.user);
                setEditFormData({
                    name: response.data.user.name,
                    email: response.data.user.email,
                    description: response.data.user.description,
                });
            } catch (err) {
                setError('Failed to fetch user profile');
                console.error('Error fetching user profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const handleEditProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found. Please login.');
            return;
        }

        try {
            await axios.put(`${window.location.origin}/api/v1/user/update/${user._id}`, editFormData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser({ ...user, ...editFormData });
            setSuccessMessage('Profile updated successfully!');
            setError(null);
            setShowEditModal(false);

            // Hide the success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile');
            setSuccessMessage(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (loading) return <Spinner animation="border" variant="primary" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <>
            <div className='CartPageBanner'>
                <h1>USER DASHBOARD</h1>
                <h2>WELCOME TO PROFILE</h2>
                <div className='para'>
                    <p>Manage your account, track your reviews, and stay updated with the latest book discussions. Personalize your experience, connect with other readers, and discover new favorites. Your dashboard is your gateway to a richer literary journey.Stay informed with the latest book releases and literary events, and participate.</p>
                    <button className="btn bg-white mt-3 hover px-4">Explore Now</button>
                </div>
            </div>

            <Container className="mt-5 d-flex justify-content-center">
                <Row style={{ width: '80%' }} className='p-5'>
                    <Col>
                        <Card className="border-primary">
                            <Row className="g-0">
                                <Col md={4} className="d-flex justify-content-center align-items-center p-3">
                                    <Card.Img  
                                        variant="top"
                                        src={user.avatar.url || image}
                                        className="rounded-circle"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                        alt="Profile"
                                    />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title>{user.name}</Card.Title>
                                        <Card.Text>
                                            <strong>Email:</strong> {user.email}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Description:</strong> {user.description.length > 150 ? `${user.description.slice(0, 150)}...` : user.description}
                                        </Card.Text>
                                        <Button 
                                            variant="primary" 
                                            size="sm" 
                                            className="mt-2" 
                                            onClick={() => setShowEditModal(true)}
                                        >
                                            Edit Profile
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            className="mt-2 ms-2" 
                                            onClick={() => setShowLogoutModal(true)}
                                        >
                                            Logout
                                        </Button>
                                        {successMessage && <Alert variant="success" className="mt-2">{successMessage}</Alert>}
                                        {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* Edit Profile Modal */}
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={editFormData.email}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    value={editFormData.description}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleEditProfile}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Logout Confirmation Modal */}
                <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Logout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to logout?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default UserProfile;
