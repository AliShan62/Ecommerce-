import React, { useEffect, useState } from 'react';

function MyComponent() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {

            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (screenWidth < 353) {

            alert("Your screen width is not supported. Please use a wider screen.");
            document.getElementById("root").classList.add("hidden-website");
        } else {

            document.getElementById("root").classList.remove("hidden-website");
        }
    }, [screenWidth]);

    return (
        <div></div>
    );
}

export default MyComponent;
