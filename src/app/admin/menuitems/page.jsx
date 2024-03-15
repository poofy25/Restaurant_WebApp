'use client'


import Image from "next/image"
import { useState, useEffect } from 'react';


export default function AdminMenuItemsPage () {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/menuitems`);
            const fetchedData = await response.json();
            setData(fetchedData);
            };

        fetchData();
    }, []);
   
    return (
        <menu>
            Menu Items
            {data.map((item , index) => {
                return (
                    <div key={index}>
                    <Image src={item.imageUrl} width="100" height="100"/>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <h4>{item.price}</h4>
                    <h5>{item.weight}</h5>
                    </div>
                )
            })}
        </menu>
    )
}