// 'use client'


import Image from "next/image"
// import { useState, useEffect } from 'react';

async function GetMenuItems () {
    const response = await fetch(`${process.env.WEBSITE_URL}/api/menuitems` , { next: { revalidate: 300 } } )
    return await response.json()
  }


export default async function AdminMenuItemsPage () {
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch(`/api/menuitems` , { next: { revalidate: 300 } } );
    //         const fetchedData = await response.json();
    //         setData(fetchedData);
    //         };

    //     fetchData();
    // }, []);
    const data = await GetMenuItems()
   
    return (
        <menu>
            Menu Items
            {data.map((item , index) => {
                return (
                    <div key={index}>
                    <Image src={item.imageUrl} width="500" height="300"/>
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