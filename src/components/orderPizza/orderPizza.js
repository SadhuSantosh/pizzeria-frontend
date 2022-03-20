import React, { useEffect, useState } from 'react';
import { constants } from '../../constants';
import { useHistory } from 'react-router-dom';
import '../../CSS/order.css';
import Base from './category/Base';
import Sauce from './category/Sauce';
import Cheese from './category/Cheese';
import NVToppings from './category/NVToppings';
import VToppings from './category/VToppings';


export default function OrderPizza({selCategory, setCategory}) {
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState({
        base:{},
        sauce:{},
        cheese:{},
        veg_toppings:[],
        nVeg_toppings:[]
    });
    console.log(selectedData);
    const history = useHistory();
    useEffect(() => {
        fetch(`${constants.API_BASE_URL}/pizza-data`,
            {
                method: 'GET',
                headers: { 'pizzeria-auth-token': localStorage.getItem('auth-token') }
            })
            .then(async (response) => {
                if (response.status === 400) {
                    response = await response.json();
                    console.log(response.message);
                    history.push('/login')
                }
                else {
                    response = await response.json();
                    setData(response[0]?.pizzaData);
                }

            })
            .catch(error => {
                console.log(error.message);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const categories = [
        {
            id: 0,
            name: "base",
            data: data?.base
        },
        {
            id: 1,
            name: "sauce",
            data: data?.sauce
        },
        {
            id: 2,
            name: "cheese",
            data: data?.cheese
        },
        {
            id: 3,
            name: "veg_toppings",
            data: data?.vegToppings
        },
        {
            id: 4,
            name: "nVeg_toppings",
            data: data?.nonVegToppings
        }
    ];
    const renderSelection = () => {
        switch (selCategory) {
            case 0: return <Base data={data} selectedData={selectedData} setSelectedData={setSelectedData} category={categories[0]} setCategory={setCategory} selCategory={selCategory} />;
            case 1: return <Sauce data={data} selectedData={selectedData} setSelectedData={setSelectedData} category={categories[1]}
                setCategory={setCategory} selCategory={selCategory} />;
            case 2: return <Cheese data={data} selectedData={selectedData} setSelectedData={setSelectedData} category={categories[2]}
                setCategory={setCategory} selCategory={selCategory} />;
            case 3: return <VToppings data={data} selectedData={selectedData} setSelectedData={setSelectedData} category={categories[3]}
                setCategory={setCategory} selCategory={selCategory} />;
            case 4: return <NVToppings data={data} selectedData={selectedData} setSelectedData={setSelectedData} category={categories[4]}
                setCategory={setCategory} selCategory={selCategory} />;
            default: return ""
        }
    }
    return (
        <div>
            {renderSelection()}
        </div>
    )
}