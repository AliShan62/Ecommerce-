import 'bootstrap/dist/css/bootstrap.min.css';
import { Rating } from "@material-ui/lab";
import { Link } from 'react-router-dom';
import '../components/ProductCart.css'; // Ensure the path is correct

function ProductCard({ product }) { 
    const options = {
        edit: "false",
        activecolor: 'tomato',
        value: product.rating,
        ishalf: "true",
        readOnly: true,
        precision: 0.5,
    };

    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.image[0].public_url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <span className='rating'> <Rating  {...options} /></span>
                <span className="productCardSpan">
                    ({product.numOfReviews} Reviews)
                </span>
            </div>
            <span>{`₹${product.price}`}</span>  
        </Link>
    );
}

export default ProductCard;
