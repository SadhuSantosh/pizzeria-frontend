import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import '../../CSS/order.css';
import Logo from '../../assets/Pizzeria.png';
import PizzaDelivery from '../../assets/rider-pizza-delivery.gif';
import PaymentGIF from '../../assets/payment.gif';
import { constants } from '../../constants';
import { useLocation, useHistory } from 'react-router-dom';

export default function Payment() {
    const [subtotal, setTotal] = useState(0);
    const [open, setOpen] = useState(true);
    const location = useLocation();
    const history = useHistory();
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
        setTotal(totalPrice + 50);
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
                    setOpen(false);
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

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div style={{ height: "100vh", width: "100%", background: "#f4433614", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {open ?
                <>
                    <Typography variant="h6" align="center" style={{ marginTop: "20px" }} className='heading'>
                        <strong> Payment 💸</strong>
                    </Typography>
                    {/* <Button variant='contained' size='small' className='NextButton' style={{ marginLeft:"20px"}}>
            <ArrowBackIosIcon className="forwardIcon" onClick={()=>{setCategory(4)}}/>
                <strong>BACK</strong>
            </Button> */}
                    <div style={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-around", marginTop: "30px" }}>
                        <table style={{ width: "40%", marginTop: "40px" }}>
                            <Typography variant="body1" align="center" className='heading'>
                                Order Summary
                            </Typography>
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
                                    <td>{(location?.data?.veg_toppings.length > 2) ? (location?.data?.veg_toppings.length - 2) * 10 : "0"}/-</td>
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
                        <img src={PaymentGIF} alt="Payment GIF" width="500px" />
                    </div>
                    <Button align="center" variant="contained" onClick={displayRazorpay} className="PayButton" >
                        <strong>Pay {subtotal}</strong>
                    </Button>
                </>
                :
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                    <Typography variant="h6" align="center" className='successful'>
                        Payment Successful !!
                    </Typography>
                    <br />
                    <Typography variant="body1" align="center">
                        Sit back and enjoyyy 😎, your pizzaa will arrive in  <strong style={{ color: "#f44336" }}>15 minutes</strong>
                    </Typography>
                    <img src={PizzaDelivery} alt="Pizza Delivery GIF" height="400px" />
                    <br />
                    <Typography variant="body2" >
                        Want to order another pizzaaa? <span onClick={() => { history.push("/order") }} className='orderHere'>Order Here</span>
                    </Typography>
                </div>}
        </div>
    );
}