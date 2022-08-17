import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import './Register.css';

function Register() {
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState({ email: "" });
    const [userPassword, setUserPassword] = useState({ password: "" });
    const [phone, setPhone] = useState({ phone: "" });
    const [firstname, setFirstname] = useState({ firstname: "" });
    const [surname, setSurname] = useState({ surname: "" });

    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [phoneDirty, setPhoneDirty] = useState(false);
    const [firstnameDirty, setFirstnameDirty] = useState(false);
    const [surnameDirty, setSurnameDirty] = useState(false);

    const [emailError, setEmailError] = useState('Email cannot be empty');
    const [passwordError, setPasswordError] = useState('Password cannot be empty');
    const [phoneError, setPhoneError] = useState('Phone cannot be empty');
    const [firstnameError, setFirstnameError] = useState('The firstname must contain only letters');
    const [surnameError, setSurnameError] = useState('The surname must contain only letters');

    const [formValid, setFormValid] = useState(false);

    const goToLogin = useCallback(() => {
        navigate('/login');
    }, [navigate])

    const registerUp = useCallback(() => {
        localStorage.setItem('user', true)
        localStorage.setItem("firstname", JSON.stringify(firstname));
        localStorage.setItem("surname", JSON.stringify(surname));
        localStorage.setItem("phone", JSON.stringify(phone));
        localStorage.setItem("userEmail", JSON.stringify(userEmail));
        localStorage.setItem("userPassword", JSON.stringify(userPassword));

        
        navigate('/varification');
    }, [navigate, firstname, surname, phone, userEmail, userPassword])

    const scrapDataEmail = useCallback((e) => {
        setUserEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("The email is not correct")
        } else {
            setEmailError("")
        }
    }, [])
    const scrapDataPassword = useCallback((e) => {
        setUserPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 8) {
            setPasswordError("Password must be less than 3 and longer than 8")
            if (!e.target.value) {
                setPasswordError("Password cannot be empty")
            }
        }
        else {
            setPasswordError("")
        }
    }, [])
    const handlePhone = useCallback((e) => {
        setPhone(e.target.value)
        const reTel = /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
        if (!reTel.test(e.target.value)) {
            setPhoneError("The phone is not correct, format +xx(xxx)xxx-xx-xx")
        } else {
            setPhoneError("")
        }
    }, [])
    const handleFirstname = useCallback((e) => {
        setFirstname(e.target.value)
        const reTel = /^[a-zA-Z]+$/;
        if (!reTel.test(e.target.value)) {
            setFirstnameError("The firstname must contain only letters")
        } else {
            setFirstnameError("")
        }
    }, [])
    const handleSurname = useCallback((e) => {
        setSurname(e.target.value)
        const reTel = /^[a-zA-Z]+$/;
        if (!reTel.test(e.target.value)) {
            setSurnameError("The surname must contain only letters")
        } else {
            setSurnameError("")
        }
    }, [])
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
    }, [])

    useEffect(() => {
        if (emailError || passwordError || phoneError || firstnameError || surnameError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, phoneError, firstnameError, surnameError])

    const blurHandler = useCallback((e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
            case 'phone':
                setPhoneDirty(true)
                break
            case 'firstname':
                setFirstnameDirty(true)
                break
            case 'surname':
                setSurnameDirty(true)
                break
            default: return e;
        }
    }, [])

    return (
        <div className="registerPage">
            <div className="register-forma">
                {
                    <form className="forma" onSubmit={handleSubmit}>
                        <p className="text-form">Go to login or register</p>
                        {(firstnameDirty && firstnameError) && <div className="error">{firstnameError}</div>}
                        <input onBlur={e => blurHandler(e)} onChange={(e) => handleFirstname(e)} placeholder="First name" name="firstname" type="text" required="required" />
                        {(surnameDirty && surnameError) && <div className="error">{surnameError}</div>}
                        <input onBlur={e => blurHandler(e)} onChange={(e) => handleSurname(e)} placeholder="Surname" name="surname" type="text" required="required" />
                        {(phoneDirty && phoneError) && <div className="error">{phoneError}</div>}
                        <input onBlur={e => blurHandler(e)} onChange={(e) => handlePhone(e)} placeholder="Phone +xx(xxx)xxx-xx-xx" type="tel" name="phone" />
                        {(emailDirty && emailError) && <div className="error">{emailError}</div>}
                        <input onBlur={e => blurHandler(e)} onChange={(e) => scrapDataEmail(e)} placeholder="Email" name="email" type="email" />
                        {(passwordDirty && passwordError) && <div className="error">{passwordError}</div>}
                        <input onBlur={e => blurHandler(e)} onChange={(e) => scrapDataPassword(e)} placeholder="Password" name="password" type="password" />
                        <CardActions>
                            <Button disabled={!formValid} onClick={() => registerUp()} size="small" variant="contained">Login</Button>
                            <Button onClick={() => goToLogin()} size="small" variant="contained">Got to login</Button>
                        </CardActions>
                    </form>
                }
            </div>
        </div>
    );
}


export default Register;