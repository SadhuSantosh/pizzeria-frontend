import React, { useState, useEffect } from 'react';
import "../CSS/login.css";
import { TextField, Button, Typography, CircularProgress, Grid, InputAdornment, IconButton } from '@mui/material';
import { constants } from '../constants';
import { useHistory } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PizzaImage from "../assets/pizza.webp";
import Appbar from "./appBar"

function Login() {
    const history = useHistory();
    const [load, setLoad] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [data, setData] = useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const [errMessage, setErrorMessage] = useState("");
    useEffect(() => {
        if (data?.email == null || data?.password == null || data?.email.length === 0 || data?.password.length === 0 || data?.email === '' || data?.password === '') {
            setDisabled(true);
        }
        else {
            setDisabled(false);
        }
    }, [data?.email, data?.password]);


    const handleChange = (prop) => (event) => {
        setErrorMessage("");
        setData({ ...data, [prop]: event.target.value });
        if (data?.email === '' && data?.password === '') {
            setErrorMessage("Email & password are required");
        }
        else if (data?.email === '' || data?.email.length === 0) {
            setErrorMessage("Email is required");
        }
        else if (data?.password === '' || data?.password.length === 0) {
            setErrorMessage("Password is required");
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true);
        let APIdata = {
            "email": data.email,
            "password": data.password
        }
        await fetch(`${constants.API_BASE_URL}/user/login`,
            {
                method: 'POST',
                body: JSON.stringify(APIdata),
                headers: { 'Content-Type': 'application/json', charset: 'utf8' }
            })
            .then(async (response) => {
                if (response.status === 401) {
                    response = await response.json();
                    setErrorMessage(response.message);
                }
                else {
                    response = await response.json();
                    localStorage.setItem('auth-token', response.token);
                    history.push('/order');
                }

            })
            .catch(error => {
                setErrorMessage(error.message);
            })
        setData({
            email: '',
            password: '',
            showPassword: false,
        });
        setLoad(false);
    }
    const handleClickShowPassword = () => {
        setData({
            ...data,
            showPassword: !data.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div className="main">
            <Appbar/>
            <Grid container direction="row" className="container">
                <Grid item xs={0} sm={6} >
                    <div className="LeftGrid">
                        <span className="pizzaHeading">
                            Make your own pizza 🍕
                        </span>
                        <img src={PizzaImage} alt="login" className="image" />
                    </div>

                </Grid>
                <Grid item xs={12} sm={6} className="RightGrid">
                    <div className="login">
                        <div className="errorMessage">
                            {errMessage}
                        </div>
                        <Typography variant="h5" style={{ display: "block" }}>
                            Login
                        </Typography>
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
                            <div>
                                <div className="password">
                                    <div>Password <span className="errorMessage">*</span></div>
                                    <div>
                                        <span className="forgotpassword" onClick={() => { history.push('/forgot-password') }} >forgot password?</span>
                                    </div>
                                </div>

                                <TextField
                                    required
                                    placeholder="enter your password"
                                    type={data?.showPassword ? "text" : "password"}
                                    size="small"
                                    value={data?.password}
                                    className="textField"
                                    onChange={handleChange("password")}
                                    onBlur={handleChange("password")}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {data?.showPassword ? <Visibility className="iconPassword" /> : <VisibilityOff className="iconPassword" />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                /></div>

                            <Button variant="contained" size="small" type="submit" disabled={disabled} className={disabled ? "submitButtonDisabled" : "submitButton"}>
                                Login &nbsp; {load ? <CircularProgress size={16} className="progress" /> : null}
                            </Button>
                            <Typography variant="caption" >
                                Don't have an account? <span onClick={() => { history.push("/signup") }} className='forgotpassword'>Sign Up</span>
                            </Typography>
                        </form>
                    </div>
                </Grid>

            </Grid>

        </div>
    )
}

export default Login;