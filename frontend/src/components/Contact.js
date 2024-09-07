import React from 'react';
 // Ensure you have an appropriate CSS file for styling
import'../components/Contact.css'
export default function Contact() {
  return (
    <div>
            <div className='CartPageBanner'>
        <h1>CONTACT US</h1>
        <h2>WE'RE HERE TO HELP YOU</h2>
        <div className='para'>
        
        <p>
        Have questions, feedback, or need assistance? Reach out to us! Our team is dedicated to providing you with the best support and ensuring your experience with our Book Review Platform is seamless and enjoyable. We value your input and are here to help you instantly  with any inquiries you may have.   
            
        </p>
          <button className="btn bg-white mt-4  hover px-4 ">Get in Touch</button>
          
        </div>
      </div>

      <div className='ContactDetails mt-5'>
        <h2>Contact Information</h2>
        <p>
          <strong>Email:</strong> support@bookhaven.com
        </p>
        <p>
          <strong>Phone:</strong> (123) 456-7890
        </p>
        <p>
          <strong>Address:</strong> 123 Book Haven Street, Literature City, 12345
        </p>
        <h3>Our Support Team</h3>
        <p>
          Our dedicated support team is available Monday to Friday, from 9 AM to 6 PM. We strive to respond to all inquiries within 24 hours. Whether you need help navigating the platform, have questions about your account, or want to share your feedback, we're here to assist you.
        </p>
        <h3>Follow Us</h3>
        <p>
          Stay connected with us through our social media channels for the latest updates, book recommendations, and community events.
        </p>
        <ul>
          <li><strong>Facebook:</strong> facebook.com/bookhaven</li>
          <li><strong>Twitter:</strong> twitter.com/bookhaven</li>
          <li><strong>Instagram:</strong> instagram.com/bookhaven</li>
        </ul>
      </div>
    </div>
  );
}
