import React, { useEffect, useState } from 'react';
import { Typography, Card, Button } from '@mui/material';
import '../../../CSS/order.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ReplayIcon from '@mui/icons-material/Replay';
import CancelIcon from '@mui/icons-material/Cancel';
import { useHistory } from 'react-router-dom';


export default function VToppings({ data, selectedData, setSelectedData, category, categories, setCategory, selCategory }) {
    const history = useHistory();
    const [selectedBase, setSelectedBase] = useState(selectedData?.nVeg_toppings);
    const [cat, setCat] = useState();
    useEffect(() => {
        setCat(category?.name);
    }, [category])

    useEffect(() => {
        setSelectedData({ ...selectedData, [cat]: selectedBase });
        // eslint-disable-next-line
    }, [selectedBase, cat]);
    

    const onHandleChange = (item) => {
        setSelectedBase([...selectedBase, { ...item, id: selectedBase.length }]);
    }
    const removeTopping = (ID) => {
        setSelectedBase([...selectedBase.filter((item) => (item.id) !== ID)])
    }
    const onHandleNext = () => {
        history.push(({
            pathname: '/payment',
            data: selectedData
          }))

    }
    const onHandlePrevious = () => {
        setCategory(selCategory - 1);
    }
    return (
        <>
            {
                data && category && cat &&
                <div style={{ width: "100%",background: "#f4433614",minHeight:'100vh'}} className='mainDiv' key={category?.id}>
                    <Typography variant="h6" align="center" className='heading'>
                        <strong>Select your non-veg toppings </strong>
                    </Typography>
                    <Typography variant="body1" align="center">
                        You can add one topping for free, will be charged  <strong style={{ color: "#f44336" }}>25/-</strong> per each extra topping.
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "0px 30px" }}>
                        <Button onClick={() => { onHandlePrevious() }} variant="contained" className={selCategory === 0 ? '' : "NextButton"} size="small" disabled={selCategory === 0 ? true : false}>
                            <ArrowBackIosIcon className="forwardIcon" />
                            <strong>change veg toppings</strong>
                        </Button>
                        <Button onClick={() => { onHandleNext() }} variant="contained" className="NextButton" size="small">
                            <strong>proceed to checkout</strong>
                            <ArrowForwardIosIcon className="forwardIcon" />
                        </Button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-evenly", flexDirection: "row" }}>
                        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "space-evenly", margin: "20px 0px" }}>
                            {category?.data ?
                                category?.data.map((item, index) => {
                                    return (
                                        <div key={item?.id} style={{ position: "relative", marginBottom: "20px" }}>
                                            <Card className={selectedBase?.id === item?.id || selectedData?.[cat]?.id === item?.id ? "selectedCard" : "Basecard"} style={{ width: "250px", display: "flex", flexDirection: "column", padding: "10px", cursor: "pointer", background: "smokewhite", height: "90%" }}
                                                onClick={() => onHandleChange(item)}>
                                                <Typography variant="body1" align="center" style={{ marginBottom: "3px" }}>
                                                    <strong>{item?.name}</strong>
                                                </Typography>
                                                <img src={item?.image} alt="pizza base" style={{ objectFit: "contain", height: "200px" }} />
                                                <br />
                                                <Typography variant="caption">
                                                    {item?.description}
                                                </Typography>
                                                {item?.price && <Typography variant="body2">
                                                    <strong> Price  - <span style={{ color: "#f44336" }}>{item?.price} /-</span></strong>
                                                </Typography>
                                                }
                                            </Card>
                                            {(selectedBase?.id === item?.id) &&
                                                <CheckCircleIcon className='selectedIcon' />
                                            }
                                        </div>
                                    )
                                }
                                )
                                :
                                "No Data Available"
                            }
                        </div>
                        {selectedBase.length > 0  ?                            <div className="VegToppings">
                                <Button onClick={() => { setSelectedBase([]) }} variant="contained" className="resetToppings" size="small">
                                    <strong>Reset toppings</strong>
                                    <ReplayIcon className="resetIcon" />
                                </Button>
                                <Typography variant="body1" style={{marginTop:"10px"}}>
                                    <strong>
                                        Selected toppings
                                    </strong>
                                </Typography>
                                {
                                    selectedBase &&
                                    selectedBase.map((selectedTopping, index) => {
                                        return (
                                            <Typography variant="body1" align="left" key={index}>
                                                {index + 1}) {selectedTopping?.name} <CancelIcon onClick={() => { removeTopping(selectedTopping?.id) }} className="removeTopping" />
                                            </Typography>
                                        )
                                    })
                                }
                                <strong> Price: <span style={{ color: "#f44336" }}>
                                    {selectedBase.length > 1
                                        ?
                                        ((selectedBase.length - 1) * 25)
                                        :
                                        "0"
                                    } /-</span></strong>
                            </div> : ""
                        }
                    </div>
                </div>
            }
        </>
    )
}