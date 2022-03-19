import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import '../../CSS/order.css';
import Logo from '../../assets/Pizzeria.png';
import { constants } from '../../constants';
import { useLocation } from 'react-router-dom';


export default function Payment() {
    const [subtotal, setTotal] = useState(0);
    const location = useLocation();
    useEffect(() => {
        let data = location?.data;
        let totalPrice = 0;
        if (data?.base?.price !== undefined) {
            totalPrice += data?.base?.price
        }
        if (data?.sauce?.price !== undefined) {
            totalPrice += data?.sauce?.price
        }
        if (data?.cheese?.price !== undefined) {
            totalPrice += data?.cheese?.price
        }
        if (data?.veg_toppings.length > 2) {
            totalPrice += (data?.veg_toppings.length - 2) * 10;
        }
        if (data?.nVeg_toppings.length > 1) {
            totalPrice += (data?.nVeg_toppings.length - 1) * 25;
        }
        setTotal(totalPrice+50);
    }, [location?.data])
    const LoadRazorpay = () => {
        return new Promise(resolve => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            document.body.appendChild(script);
            script.onload = () => {
                resolve(true);
            }
            script.onerror = () => {
                resolve(false);
            }
        })
    }

    const displayRazorpay = async () => {

        const APIdata = {
            "amount": subtotal
        }

        const res = await LoadRazorpay();
        if (!res) {
            alert('Razorpay failed to load! Are you online ?');
            return
        }
        const data = await fetch(`${constants.API_BASE_URL}/payment/order`,
            {
                method: "POST",
                body: JSON.stringify(APIdata),
                headers: { 'pizzeria-auth-token': localStorage.getItem('auth-token'), 'Content-Type': 'application/json', charset: 'utf8' }
            })
            .then(async (res) => {
                return await res.json();
            })
        var options = {
            "key": 'rzp_test_ofJulQLWmYSsJC',
            "amount": data?.amount,
            "currency": data?.currency,
            "name": "Pizzeria",
            "image": Logo,
            "order_id": data?.id,
            "handler": function (response) {
                if (response) {
                    console.log("success");
                }
                else {
                    console.log("failure");
                }
            },
            "prefill": {
                "name": "Pizzeria",
                "email": "pizzeria@ohoo.com",
                "contact": "9191919191"
            },
            "theme": {
                "color": "#f44336"
            }
        };

        console.log(data);

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div style={{ height: "100vh", width: "100%", background: "#f4433614" }}>
            <Typography variant="body1" align="center">
                Order Summery
            </Typography>
            <table style={{ width: "50%", marginTop: "40px" }}>
                <tbody>
                <tr>
                    <td>{location?.data?.base?.name}</td>
                    <td>{location?.data?.base?.price}/-</td>
                </tr>
                <tr>
                    <td>{location?.data?.sauce?.name}</td>
                    <td>{location?.data?.sauce?.price}/-</td>
                </tr>
                <tr>
                    <td>{location?.data?.cheese?.name}</td>
                    <td>{location?.data?.cheese?.price}/-</td>
                </tr>
                <tr>
                    <td>Veg Toppings ({location?.data?.veg_toppings.length})</td>
                    <td>{(location?.data?.veg_toppings.length > 2) ? (location?.data?.veg_toppings.length - 2) * 10: "0"}/-</td>
                </tr>
                <tr>
                    <td>Non Veg Toppings ({location?.data?.nVeg_toppings.length})</td>
                    <td>{(location?.data?.nVeg_toppings.length > 1) ? (location?.data?.nVeg_toppings.length - 1) * 25 : "0"}/-</td>
                </tr>
                <tr>
                    <td>GST</td>
                    <td>20/-</td>
                </tr>
                <tr>
                    <td>Delivery Charges</td>
                    <td>30/-</td>
                </tr>
                <tr>
                    <td><strong>Total</strong></td>
                    <td><strong><span style={{ color: "#f44336" }}>{subtotal} /-</span></strong></td>
                </tr>
                </tbody>
            </table>
            <Button variant="contained" onClick={displayRazorpay} className="PayButton" size="small">
                <strong>Pay {subtotal}</strong>
            </Button>
        </div>
    );
}