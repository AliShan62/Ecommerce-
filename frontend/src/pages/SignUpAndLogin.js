import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
import './SignUpAndLogin.css';
import axios from 'axios';
import { message } from 'antd';

function SignUpAndLogin() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        avatar: "/Profile.png",
        avatarPreview: '/Profile.png',
        role: 'user',
        description: ""
    });

    const navigate = useNavigate();

    const [loginformData, setLoginformData] = useState({
        email: "",
        password: ""
    });

    const switcherTab = useRef(null);
    const registerTab = useRef(null);
    const loginTab = useRef(null);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add('shiftToNeutral');
            switcherTab.current.classList.remove('shiftToRight');

            registerTab.current.classList.remove('shiftToNeutralForm');
            loginTab.current.classList.remove('shiftToleft');
        }

        if (tab === "register") {
            switcherTab.current.classList.add('shiftToRight');
            switcherTab.current.classList.remove('shiftToNeutralForm'); 

            registerTab.current.classList.add('shiftToNeutralForm');
            loginTab.current.classList.add('shiftToleft');
        }
    };

    const loginSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginResponse = await axios.post(
                `${window.location.origin}/api/v1/user/login`,
                loginformData,
                { withCredentials: true }
            );

            if (loginResponse.data.success) {
                message.success('User Login Successfully!');
                localStorage.setItem('token', loginResponse.data.token);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            message.error('Something Went Wrong');
        }
    };

    const ImageData = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setFormData((prevData) => ({
                        ...prevData,
                        avatar: reader.result,
                        avatarPreview: reader.result,
                    }));
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Form Data:", formData);
            const res = await axios.post(
                `${window.location.origin}/api/v1/user/registration`,
                formData,
                { withCredentials: true, mode: 'cors' }
            );

            if (res.data.success) {
                message.success('User Registered Successfully!');
            } else {
                console.log('Something Went Wrong:', res.data.message);
            }
        } catch (error) {
            console.log('Error:', error);
            message.error("Something Went Wrong");
        }
    };

    return (
        <div className='SignUpAndLoginContainer'>
            <div className='LoginAndSignUpBox'>
                <div>
                    <div className='login_signUp_toggle'>
                        <p onClick={(e) => switchTabs(e, 'login')}>LOGIN</p>
                        <p onClick={(e) => switchTabs(e, 'register')}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>

                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className='loginEmail'>
                        <MailOutlineIcon />
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter Your Email Address'
                            required
                            value={loginformData.email}
                            onChange={(e) => setLoginformData((prevData) => ({ ...prevData, email: e.target.value }))}
                        />
                    </div>

                    <div className='loginPassword'>
                        <LockOpenIcon />
                        <input
                            type='password'
                            id='password'
                            placeholder='Enter Your Correct Password'
                            required
                            value={loginformData.password}
                            onChange={(e) => setLoginformData((prevData) => ({ ...prevData, password: e.target.value }))}
                        />
                    </div>

                    <Link to='/password/forgot'>Forget Password?</Link>
                    <input type='submit' value='Login' className='submitBtn' />
                </form>

                <form ref={registerTab} className='SignUpForm' encType="multipart/form-data" onSubmit={registerSubmit}>
                    <div className='SignUpName'>
                        <FaceIcon />
                        <input
                            type='text'
                            id='name'
                            placeholder='Enter Your Full Name'
                            required
                            value={formData.name}
                            onChange={(e) => setFormData((prevData) => ({ ...prevData, name: e.target.value }))}
                        />
                    </div>

                    <div className='SignUpEmail'>
                        <MailOutlineIcon />
                        <input
                            type='email'
                            id='email'
                            className='choose'
                            placeholder='Enter Your Email Address'
                            required
                            value={formData.email}
                            onChange={(e) => setFormData((prevData) => ({ ...prevData, email: e.target.value }))}
                        />
                    </div>

                    <div className='SignUpPassword'>
                        <LockOpenIcon />
                        <input
                            type='password'
                            id='password'
                            placeholder='Enter Your Correct Password'
                            required
                            value={formData.password}
                            onChange={(e) => setFormData((prevData) => ({ ...prevData, password: e.target.value }))}
                        />
                    </div>

                    <div className='SignUpDescription'>
                        <textarea style={{width:'100%' }}
                            id='description'
                            placeholder='Enter your brief description'
                            required
                            value={formData.description}
                            onChange={(e) => setFormData((prevData) => ({ ...prevData, description: e.target.value }))}
                        />
                    </div>

                    <div className='SignUpImage'>
                        <img src={formData.avatarPreview} alt='pick' />
                        <input type='file'
                            name='avatar'
                            id='avatar'
                            accept='image/*'
                            onChange={ImageData}
                        />
                    </div>

                    <input type='submit' value='Register' className='registerBtn' />
                </form>
            </div>
        </div>
    );
}

export default SignUpAndLogin;
