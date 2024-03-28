'use client'

import { format } from "date-fns"
import PlaceOrderDetails from './PlacedOrderDetails'

import { useState } from "react"

export default function PlacedOrder ( {data} ) {

    const [open , setOpen] = useState(false) 
    const handleViewDetails = () => {
        setOpen(current=>!current)
    }
    return (
        <>
        <div className={`border-green-500 border-2 border-solid px-2 py-2 box-border w-fit w-[250px] ${data.status === 'pending' && 'border-yellow-600' || data.status === 'denied' && 'border-red-600' }`}>
            <h3>{data.name}</h3>
            <a href={`tel:${data.phone}`}>{data.phone}</a>
            <p>{data.street}</p>
            <p>{data.totalPrice} lei</p>
            <p>{format(new Date(data.createdAt),"dd/MM/yyyy")}{" , "}{format(new Date(data.createdAt),"H")}{":"}{format(new Date(data.createdAt),"mm")}</p>
            <button onClick={handleViewDetails}>View Details</button>
        </div>
        {open && <PlaceOrderDetails data={data} open={open} setOpen={setOpen} /> }
        </>
    )
}