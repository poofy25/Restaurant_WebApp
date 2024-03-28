'use client'

import { format } from "date-fns"
import PlaceOrderDetails from './PlacedOrderDetails'

import { useState } from "react"
import { completeOrder } from "@/app/actions/OrdersActions"

export default function PlacedOrder ( {data , getOrdersFromDb:updateData} ) {

    const [open , setOpen] = useState(false) 
    const handleViewDetails = () => {
        setOpen(current=>!current)
    }

    const handleComplete = async () => {
        const response = await completeOrder(data)
        console.log(response)
        updateData()
    }
    const handleSingleClick = (e) => {
        e.target.classList.add("!bg-gray-900")
        setTimeout(()=>{
            e.target.classList.remove("!bg-gray-900")
        },500)
    }

    return (
        <>
        <div className={`border-green-500 border-2 border-solid px-2 py-2 box-border  w-[250px] ${data.status === 'pending' && 'border-yellow-600' || data.status === 'denied' && 'border-red-600' || data.status === 'completed' && 'border-gray-600' }`}>
            <h3>{data.name}</h3>
            <a href={`tel:${data.phone}`}>{data.phone}</a>
            <p>{data.street}</p>
            <p>{data.totalPrice} lei</p>
            <p>{format(new Date(data.createdAt),"dd/MM/yyyy")}{" , "}{format(new Date(data.createdAt),"H")}{":"}{format(new Date(data.createdAt),"mm")}</p>
            <button onClick={handleViewDetails}>View Details</button>
            {data.status === 'pending' && 
            <button onDoubleClick={handleComplete} onClick={handleSingleClick} className="bg-green-600 hover:bg-green-900">Complete</button>
            }

        </div>
        {open && <PlaceOrderDetails data={data} open={open} setOpen={setOpen} updateData={updateData} /> }
        </>
    )
}