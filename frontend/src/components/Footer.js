import React from 'react';
import Appstore from "../images/Appstore.png";
import playstore from "../images/playstore.png";
import './Footer.css'; 

function Footer() {  
    return (
        <div id="footer" className="footer">
            <div className='leftFooter'>
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile</p>
                <img src={playstore} alt='Play Store' />
                <img src={Appstore} alt='App Store' />
            </div>
            <div className='midFooter'>
                <h2>READER'S HAVEN</h2>
                <p style={{ marginTop: '45px' }}>High Quality is our first priority</p>
                <p>Copyrights 2023 &copy; Ali Shan</p>
            </div>
            <div className='lastFooter'>
                <h3>FOLLOW US</h3> 
                <a href='/Instagram'>Instagram</a><br />
                <a href='/Youtube'>Youtube</a><br />
                <a href='/Twitter'>Twitter</a><br />
                <a href='/Facebook'>Facebook</a>
            </div>
        </div>
    );
}

export default Footer;
