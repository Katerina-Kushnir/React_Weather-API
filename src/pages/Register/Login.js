import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import './Register.css';
import { useDispatch } from "react-redux";
import { setIsRegistered } from '../../Store/Register/action';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [signInUserEmail, setSignInUserEmail] = useState("");
    const [signInUserPassword, setSignInUserPassword] = useState("");

    const goToRegister = useCallback(() => {
        navigate('/');
    }, [navigate])

    const gotToApp = useCallback(() => {
        const getStorageEmail = localStorage.getItem("userEmail");
        const getStoragePassword = localStorage.getItem("userPassword");

        if (getStorageEmail) {
            if (getStoragePassword) {
                if (JSON.parse(getStorageEmail) === signInUserEmail && JSON.parse(getStoragePassword) === signInUserPassword) {
                    alert("User successeful sign in");
                    localStorage.setItem('isRegistered', true)
                    dispatch(setIsRegistered(true))
                    navigate('/');
                } else if (JSON.parse(getStorageEmail) !== signInUserEmail || JSON.parse(getStoragePassword) !== signInUserPassword) {
                    alert("You entered incorrect data")
                }
            } else {
                alert("You are not registred")
            }
        } else {
            alert("You are not registred")
        }
    }, [navigate, signInUserEmail, signInUserPassword, dispatch])

    const scrapSignInDataEmail = useCallback((e) => {
        setSignInUserEmail(e.target.value)
    }, [])
    const scrapSignInDataPassword = useCallback((e) => {
        setSignInUserPassword(e.target.value)
    }, [])
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
    }, [])
    
    return (
        <div className="registerPage">
            <div className="register-forma">
                <form className="forma" onSubmit={handleSubmit}>
                    <p className="text-form">Login</p>
                    <input onChange={(e) => scrapSignInDataEmail(e)} placeholder="Email" name="email" type="email" />
                    <input onChange={(e) => scrapSignInDataPassword(e)} placeholder="Password" name="password" type="password" />
                    <CardActions>
                        <Button onClick={() => gotToApp()} size="small" variant="contained">Sign In</Button>
                        <Button onClick={() => goToRegister()} size="small" variant="contained">Register</Button>
                    </CardActions>
                </form>
            </div>
        </div>

    );
}

export default Login;