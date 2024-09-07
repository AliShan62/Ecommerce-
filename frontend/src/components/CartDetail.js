import React from 'react';
import ReviewForm from './ReviewForm';
import './CartDetail.css';

function CartDetail() {
  return (
    <>
      <div className='CartPageBanner'>
        <div className='banner-text'>
          <h1>READING IS ALWAYS</h1> 
          <h1>A GOOD IDEA</h1>
          <div className='para'>
            <p>Reading is a timeless activity that enriches our minds and broadens our perspectives.
            Whether it's diving into the pages of a classic novel, exploring the latest scientific research, or getting lost in a gripping mystery, books offer a gateway to new worlds and ideas.</p>
            <button className="btn bg-white mt-3 hover px-4">READ MORE</button>
          </div>
        </div>
      </div>

      <div className='ProductCart'>
        <h2 className="Heading">BEST BOOK REVIEWS</h2>
        <ReviewForm/>
      </div>
    </>
  );
}

export default CartDetail;
