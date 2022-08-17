import React, { useState, useCallback  } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './Register.css';

function Varification() {
    const navigate = useNavigate();

    const [code, setCode] = useState("");

    const onHandleCodeChange = useCallback((event) => {
        setCode(event.target.value);
      }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
    }, [])

    const sendCode = useCallback(() => {
        if (code === '1234') {
            alert("You have successfully registered. Go to login.")
            navigate('/login');
        } else {
            alert('wrong code, please try again')
        }
    }, [code, navigate])

    return (
        <div className="registerPage">
            <div className="register-forma">
                <form className="forma" onSubmit={handleSubmit}>
                    <p className="text-form">You have successfully registered. Enter confirmation code (1234).</p>
                    <input onChange={(e) => onHandleCodeChange(e)} placeholder="Enter your code" type="text" value={code} />
                    <Button id="code" onClick={() => sendCode()} size="small" variant="contained">Send code</Button>
                </form>
            </div>
        </div>
    )
}

export default Varification;



