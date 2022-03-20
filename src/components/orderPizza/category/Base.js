import React, { useEffect, useState } from 'react';
import { Typography, Card, Button } from '@mui/material';
import '../../../CSS/order.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export default function Base({ data, selectedData, setSelectedData, category, setCategory, selCategory }) {
    const [selectedBase, setSelectedBase] = useState(selectedData?.base);
    const [cat, setCat] = useState();
    useEffect(() => {
        setCat(category?.name);
    }, [category])

    useEffect(() => {
        setSelectedData({ ...selectedData, [cat]: {}, [cat]: selectedBase });
        // eslint-disable-next-line
    }, [selectedBase, cat]);

    const onHandleChange = (item) => {
        setSelectedBase(item);
    }
    const onHandleNext = () => {
        setCategory(selCategory + 1);
    }
    return (
        <>
            {
                data && category && cat &&
                <div style={{ width: "100%",background: "#f4433614",height:"100%"}} key={category?.id}>
                    <Typography variant="h6" align="center" className='heading'>
                        <strong>Select your {category?.name} </strong>
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "flex-end", margin: "0px 30px" }}>
                        <Button onClick={() => { onHandleNext() }} variant="contained" className="NextButton" size="small">
                            <strong>select sauce</strong>
                            <ArrowForwardIosIcon className="forwardIcon" />
                        </Button>
                    </div>
                    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "space-evenly", margin: "20px 0px" }}>
                        {category?.data ?
                            category?.data.map((item) => {
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
                                        {(selectedBase?.id === item?.id || selectedData?.[cat]?.id === item?.id) &&
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
                </div>
            }
        </>
    )
}