import React, { useState, useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCard from './ProductCard';
import './Home.css';
import { Link } from 'react-router-dom';
import MetaData from './MetaData'

function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // Fetch product data for the current page
        const fetchData = async () => {
            try {
                const response = await fetch(`${window.location.origin}/api/v1/products/GetAllproduct?page=${currentPage}`);
                const data = await response.json();

                if (response.ok) {
                    setFeaturedProducts(data.AllProducts);
                    setTotalPages(data.totalPages);
                } else {
                    console.error('API request failed:', data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        // Update the current page when the user clicks on "Next" or "Previous" button
        setCurrentPage(newPage);
    };

    return (
        <div>
            <MetaData title="BOOKREVIEWS"/>
            <div className="banner">
                <p>Welcome to BookReviews</p>
                <h1>FIND AMAZING BOOKS BELOW</h1>
                
                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className="homeHeading">Explore Our Featured Books</h2>

            <div className="container" id="container">
                <div className="row">
                    {featuredProducts.map((product) => (
                        <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="pagination d-flex justify-content-center my-4">
                {/* "Previous" button */}
                <Link 
                    className='pagination1 btn btn-primary me-2' 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;&lt; Back
                </Link>

                {/* "Next" button */}
                <Link 
                    className='pagination1 btn btn-primary' 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Forth &gt;&gt;
                </Link>
            </div>
        </div>
    );
}

export default Home;
