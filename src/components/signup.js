import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, CircularProgress, Grid, InputAdornment, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import { constants } from '../constants';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import "../CSS/login.css";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import RegisterImage from '../assets/pizza-register.webp';
import moment from 'moment';
import Appbar from './appBar';


export default function Signup() {
    const [errMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage]=useState('');
    const [dob, setDob] = useState(null);
    const [load, setLoad] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();
    const signUpValidationSchema = yup.object({
        firstname: yup
            .string()
            .required("First name is required"),
        lastname: yup
            .string()
            .required("Last name is required"),
        email: yup
            .string()
            .required("Email is required")
            .email("Incorrect email format eg: user@pizzeria.com")
            .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, "Incorrect email format eg: user@pizzeria.com"),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password should be minimun of 8 characters")
            .matches(/^(?=.*[A-Z]+)(?=.*[a-z]+)(?=.*[0-9]+)(?=.*[!@#$*]).{8,}$/, "Incorrect password format eg:Pizzeria@123"),
    })
    const { resetForm, handleBlur, handleChange, values, touched, errors } = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            DOB: undefined,
            email: "",
            password: "",
        },
        validationSchema: signUpValidationSchema,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoad(true);
        let data = { ...values, DOB: dob };
        console.log(data);
        signUp(data);
    }
    useEffect(() => {
        if (errors.firstname || errors.lastname || errors.email || errors.password ||
            values.firstname === '' || values.lastname === '' || dob === null || dob === '' || values.email === '' || !values.password === '') {
            setDisabled(true);
        }
        else {
            setDisabled(false);
        }
    }, [errors, values, dob]);

    const signUp = async (APIdata) => {
        await fetch(`${constants.API_BASE_URL}/user/signup`,
            {
                method: 'POST',
                body: JSON.stringify(APIdata),
                headers: { 'Content-Type': 'application/json', charset: 'utf8' }
            })
            .then(async (response) => {
                if (response.status === 400) {
                    response = await response.json();
                    setLoad(false);
                    setErrorMessage(response.message);
                }
                else {
                    response = await response.json();
                    localStorage.setItem('auth-token', response.token);
                    setSuccessMessage(response.message);
                }
            })
            .catch(error => {
                setErrorMessage(error.message);
            })
        if (errMessage !== "") {
            resetForm();
            setDob(null);
        }
    };
    useEffect(() => {
        setTimeout(() => {setErrorMessage('')},5000);
    }, [errMessage])
    
    return (
        <div className="main">
            <Appbar/>
            <Grid container direction="row" className="container">
                <Grid item xs={0} sm={6}>
                    <div className="LeftGrid">
                        <img src={RegisterImage} alt="Registration" className="image" />
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
                            Sign Up
                        </Typography>

                        <form onSubmit={handleSubmit} className="form">
                            <div>
                                <div>
                                    First Name <span className="errorMessage">*</span>
                                </div>
                                <TextField
                                    id="firstname"
                                    name="firstname"
                                    size="small"
                                    variant="outlined"
                                    placeholder="enter first name"
                                    value={values.firstname}
                                    onChange={handleChange}
                                    className="textField"
                                    onBlur={handleBlur}
                                    error={errors.firstname && touched.firstname}
                                    helperText={errors.firstname && touched.firstname && errors.firstname}
                                />
                            </div>
                            <div>
                                <div>
                                    Last Name <span className="errorMessage">*</span>
                                </div>
                                <TextField
                                    id="lastname"
                                    name="lastname"
                                    size="small"
                                    variant="outlined"
                                    placeholder="enter last name"
                                    className="textField"
                                    value={values.lastname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.lastname && touched.lastname}
                                    helperText={errors.lastname && touched.lastname && errors.lastname}
                                />
                            </div>
                            <div>
                                <div>
                                    Date of Birth <span className="errorMessage">*</span>
                                </div>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    className="textField"
                                    value={values.DOB}
                                    onChange={(e) => { console.log(typeof (e.target.value)); setDob(moment(e.target.value, "YYYY-MM-DD").format("DD-MM-YYYY")); }}
                                    type="date"
                                    inputProps={{
                                        max: moment().format("YYYY-MM-DD"),
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div>
                                <div>
                                    Email <span className="errorMessage">*</span>
                                </div>
                                <TextField
                                    id="email"
                                    name="email"
                                    size="small"
                                    variant="outlined"
                                    placeholder="enter email"
                                    className="textField"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.email && touched.email}
                                    helperText={errors.email && touched.email && errors.email}
                                />
                            </div>
                            <div>
                                <div>
                                    Password <span className="errorMessage">*</span>
                                </div>
                                <TextField
                                    id="password"
                                    name="password"
                                    size="small"
                                    variant="outlined"
                                    type={showPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => { setShowPassword(!showPassword) }}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility className="iconPassword" /> : <VisibilityOff className="iconPassword" />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder="enter password"
                                    className="textField"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.password && touched.password}
                                    helperText={errors.password && touched.password && errors.password}
                                />
                            </div>
                            <Button variant="contained" size="small" type="submit" disabled={disabled} className={disabled ? "submitButtonDisabled" : "submitButton"}>
                                Sign Up &nbsp; {load ? <CircularProgress size={16} className="progress" /> : null}
                            </Button>
                        </form>
                        <Typography variant="caption" >
                                Already have an account? <span onClick={() => { history.push("/login") }} className='forgotpassword'>login</span>
                            </Typography>
                    </div>
                </Grid>
            </Grid>

        </div>
    );

}


