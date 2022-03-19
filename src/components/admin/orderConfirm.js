import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import "../../CSS/admin.css";
import {constants} from "../../constants";
 
var exampleSocket = new WebSocket(constants?.WEB_SOCKET_URL);

var socketOpened = "";

exampleSocket.addEventListener('open',function (event) {
       socketOpened= "opened";
       console.log(typeof(event));
    //    console.log(JSON.parse(event?.data.arrayBuffer().then(buffer=> {
    //        console.log(buffer);
    //     })));
  });

exampleSocket.addEventListener('message',async function (message) {
     console.log(message);
});

const styles = makeStyles(()=>({
    disabled:{
        background:"rgb(163, 161, 161) !important",
        color:"rgb(87, 86, 86) !important",
    }
}));
function A_OrderConfirmation() {
    const style=styles();
    const [nextActiveId, setActiveId] = useState(2);
    const [data, setData] = useState();

    const onClickButton = (status) => {
        if(status === "DEC" ){
            if( nextActiveId === 2){
                setData({ status: "DEC", message:"Restaurant declined your order." });
            }
            else if( nextActiveId === 3 ){
                setData({ status: "DEC", message:"Restaurant declined your order because the base you have selected is unavailable." });
            }
            else if( nextActiveId === 4 ){
                setData({ status: "DEC", message:"Restaurant declined your order due to wallets unavailability" });
            }
            else if( nextActiveId === 5 ){
                setData({ status: "DEC", message:"Something happened to wallet, we'll refunc your money" });
            }
            setButtons([...(buttons.map((button) => {return {...button,isDisabled:true}}))])
            return
        }
        else if(status === "DEL"){
            setData({ status: "DEL", message:"Pizzaaa delivered at your loaction." })
            setButtons([...(buttons.map((button) => {return {...button,isDisabled:true}}))])
            return
        }
        const item = buttons.filter((button) => button?.status === status)
        setData({ status: item[0].status, message: item[0].description });
        setActiveId(item[0].id + 1);
    }

    useEffect(() => {
        // setTimeout(()=>{exampleSocket.send(JSON.stringify(data))},2000);
        if (socketOpened === "opened"){
            exampleSocket.send(JSON.stringify({
                a:100
            }));
        }
        console.log(JSON.stringify(data));
    }, [data])

    useEffect(() => {
        setButtons([...(buttons.map((button) => {
            if (button?.id === 1 ||  button?.id === nextActiveId) {
               return {...button,isDisabled:false}
            }
            else {
               return {...button,isDisabled:true}
            }
        }))])
        // eslint-disable-next-line
    }, [nextActiveId])

    const [buttons, setButtons] = useState([
        {
            id: 1,
            name: "Decline",
            isDisabled: false,
            status: "DEC",
        },
        {
            id: 2,
            name: "Accept",
            isDisabled: false,
            description: "Restaurant accepted your order, Food is being prepared.",
            status: "ACPT",
        },
        {
            id: 3,
            name: "Food prepared",
            isDisabled: true,
            description: "Food has prepared and waiting for wallet confirmation.",
            status: "FDONE"
        },
        {
            id: 4,
            name: "Wallet Assigned",
            isDisabled: true,
            description: "A pizzeria wallet has been assigned to your order, will be arriving to your location in 10 mins",
            status: "WAL"
        },
        {
            id: 5,
            name: "Delivered",
            isDisabled: true,
            status: "DEL"
        }
    ]);

    return (
        <div className='buttons'>
            {
                buttons && buttons.map((current, index) => {
                    return (
                        <div key={index} >
                            <Button
                                variant="contained"
                                size="small"
                                style={{ pointerEvents: current?.isDisabled ? "unset" : "visible", cursor: current?.isDisabled ? "not-allowed" : "pointer"}}
                                disabled={current?.isDisabled}
                                onClick={() => { onClickButton(current?.status) }}
                                className={current?.isDisabled ? style.disabled : (current?.id === 1 ? "red" : "green")}>
                                <strong>{current?.name}</strong>
                            </Button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default A_OrderConfirmation;