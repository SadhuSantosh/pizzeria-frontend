import React from 'react';
import { Button, Typography } from '@mui/material';
import logo from '../assets/Pizzeria.png';
import "../CSS/login.css";
import { useHistory } from 'react-router-dom';

export default function Home() {
    const history = useHistory();
    return (
        <div style={{ width: "100%", background: "#f4433614", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyConetnt: "space-around" }}>
            <br />
            <span className='pizzaHeading'>
                Welcome to pizzeria !!
            </span>
            <Typography variant='body1' align='center' >
                We bake delicous pizza's 🤤
            </Typography>
            <br />
            <br />
            <div style={{ width: "50%", margin: "auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}>
                <img src={logo} alt="login" className="logoImage" />
                <Typography variant='body1' align='center' >
                    Can't stop drooling? let's order pizzaaa 🍕
                </Typography>
                <Button size='small' className='loginButton' onClick={() => { history.push('/login') }}>
                    login
                </Button>
            </div>

        </div>

    )
}