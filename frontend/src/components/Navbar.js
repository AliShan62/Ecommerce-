import React from 'react';
import { ReactNavbar } from "overlay-navbar";
import logo from "../images/logo.png";
import { FaUserAlt } from "react-icons/fa";
import './Navbar.css';

function Navbar() {
    return (
        <ReactNavbar
            burgerColorHover="#eb4034"
            burgerColor="#fff"
            burgerIconSize="2vmax"
            logo={logo}
            logoHoverColor="yellow"
            logoWidth="12vmax"
            link1Text="Home"
            link1Margin="12px"
            link2Text="About"
            link3Text="Login/Register"
            link4Text="Contact"
            link1Url="/"
            link2Url="/About"
            link3Url="/SignUpAndLogin"
            link4Url="/Contact"
            nav1justifyContent="flex-end"
            nav2justifyContent="flex-end"
            nav3justifyContent="flex-start"
            nav4justifyContent="flex-start"
            link1Size="1.1em"
            link1ColorHover="#eb4034"
            navColor1="white"
            navColor2="white"
            navColor3="white"
            navColor4="white"
            profileIcon={true}
            ProfileIconElement={FaUserAlt}
            profileIconMargin="10px"
            profileIconUrl="/me"
            profileIconSize="2vmax"
            profileIconColor="black"
            profileIconColorHover="red"
        />
    );
}

export default Navbar;
