import React, { useState, useEffect } from 'react';
import "../CSS/login.css";
import { TextField, Button, Typography, CircularProgress, Grid } from '@mui/material';
import { constants } from '../constants';
import { useHistory } from 'react-router-dom';
import ForgotPasswordImage from "../assets/pizza-forgot-password.webp";
import Appbar from "./appBar"

function ForgotPassword() {
    const history = useHistory();
    const [load, setLoad] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [successMessage, setSuccessMessage]=useState(false);
    const [data, setData] = useState({
        email: '',
    })
    const [errMessage, setErrorMessage] = useState("");
    useEffect(() => {
        if (data?.email == null || data?.email.length === 0 || data?.email === '') {
            setDisabled(true);
        }
        else {
            setDisabled(false);
        }
    }, [data?.email]);


    const handleChange = (prop) => (event) => {
        setData({ ...data, [prop]: event.target.value });
        setErrorMessage("");
        if (data?.email === '' || data?.email.length === 0) {
            setErrorMessage("Email is required");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true);
        let APIdata = {
            "email": data.email,
        }
        await fetch(`${constants.API_BASE_URL}/user/forgot-password`,
            {
                method: 'POST',
                body: JSON.stringify(APIdata),
                headers: { 'Content-Type': 'application/json', charset: 'utf8' }
            })
            .then(async (response) => {
                if (response.status === 400) {
                    response = await response.json();
                    setErrorMessage(response.message);
                }
                else if(response.status === 200){
                    response = await response.json();
                    setSuccessMessage(response.message);
                }
            })
            .catch(error => {
                setErrorMessage(error.message +'!!');
            })
        setData({
            email: '',
            password: '',
            showPassword: false,
        });
        setLoad(false);
    }

    return (
        <div className="main">
            <Appbar />
            <Grid container direction="row" className="container">
                <Grid item xs={0} sm={6} >
                    <div className="LeftGrid">
                        <img src={ForgotPasswordImage} alt="forgot password" className="image" />
                    </div>

                </Grid>
                <Grid item xs={12} sm={6} className="RightGrid">
                    <div className="login">
                        <div className="errorMessage">
                            {errMessage}
                        </div>
                        <div className="successMessage">
                            {successMessage}
                        </div>
                        <Typography variant="h5" style={{ display: "block" }}>
                            Forgot Password ?
                        </Typography>
                        <Typography variant="caption">Enter the email linked to your account, we will be sending a password reset link to that email.</Typography>
                        <form onSubmit={handleSubmit} className="form">
                            <div>
                                <div>
                                    Email <span className="errorMessage">*</span>
                                </div>
                                <TextField
                                    required
                                    placeholder="enter your email"
                                    size="small"
                                    value={data?.email}
                                    className="textField"
                                    onChange={handleChange("email")}
                                    onBlur={handleChange("email")}
                                />
                            </div>
                            <Button variant="contained" size="small" type="submit" disabled={disabled} className={disabled ? "submitButtonDisabled" : "submitButton"}>
                                Send Mail &nbsp; {load ? <CircularProgress size={16} className="progress" /> : null}
                            </Button>

                            <Typography variant="caption" >
                                Ahhhh, I remember my password, lets try <span onClick={() => { history.push("/login") }} className='forgotpassword'>Login</span> once.
                            </Typography>
                        </form>
                    </div>
                </Grid>

            </Grid>

        </div>
    )
}

export default ForgotPassword;