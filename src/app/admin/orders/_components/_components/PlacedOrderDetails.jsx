'use client'

import styles from "./placeOrderDetails.module.scss"

import Image from "next/image"
import { confirmOrder , denyOrder } from "@/app/actions/OrdersActions"
import { useState } from "react"


export default function PlacedOrderDetails ( {data , open , setOpen , updateData} ) {

    const [loading , setLoading] = useState(null)
    const [loadingMessage , setLoadingMessage] = useState(null)

    // Changing order status to "pending"
    const handleConfirm = async () => {
        setLoading(true)
        const response = await confirmOrder(data)
        setLoading(false)
        setLoadingMessage('Confimed order succesfully')

    } 
    // Changing order status to "denied"
    const handleDeny = async () => {
        setLoading(true)
        const response = await denyOrder(data)
        setLoading(false)
        setLoadingMessage('Denied order succesfully')

    }



    return (
        <div className={`${styles.container} ${open ? styles.open : ''}`} onClick={(e)=>{if(e.target == e.currentTarget)setOpen(false)}}>
            <div className={styles.dataContainer}>
                {loading === null ? 
                <div className="flex flex-col items-start justify-start">
                    <button onClick={()=>setOpen(false)}>X</button> 
                    <div><p>Status:</p> <h3>{data.status}</h3></div>                                         
                    
                    <h2>Personal Info</h2>
                    <div><p>Name:</p> <h3>{data.name}</h3></div>                                         
                    <div><p>Phone:</p> <a>{data.phone}</a></div>                                         
                    <div><p>Email:</p> <a>{data.email}</a></div>   

                    <h2>Adress Info</h2>
                    <div><p>Adress:</p> <h3>{data.street}, {data.sector}, {data.city}</h3></div>                                         
                    <div><p>Scara:</p> <h3>{data.scara}</h3></div>                                         
                    <div><p>Floor:</p> <h3>{data.floor}</h3></div>                                         
                    <div><p>Interfon:</p> <h3>{data.interfon}</h3></div>    

                    <h2>Delivery Info</h2>
                    <div><p>Total items:</p> <h3>{data.totalItems}</h3></div> 
                    <div><p>Delivery price:</p> <h3>{data.deliveryPrice} lei</h3></div>    
                    <div><p>Total price:</p> <h3>{data.totalPrice} lei</h3></div>    
                    <div><p>Payment:</p> <h3>{data.payment}</h3></div>
                    <div><p>Additional info : </p> <h3>{data.info}</h3></div>


                    <h2>Items</h2>
                    <div className="flex flex-col justify-start gap-2 !items-start">
                        {data.items.map((item,index) => {
                            return (
                                <div key={index} className="flex gap-2">
                                    <Image src={item.imageUrl} width='75' height='75'/>
                                    <div>
                                        <h3>{item.name}</h3>
                                        <div className="flex align-middle justify-start items-center">
                                            <p className="font-bold">{item.price * item.quantity} lei </p>
                                            <span>&nbsp; | &nbsp;</span>
                                            <p className="opacity-75 text-base">{item.price} lei </p>
                                        </div>
                                        <p className="font-bold">x {item.quantity}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>    


                    {data.status !== 'completed' && data.status !== 'denied'  && 
                        <div className="flex flex-col !items-start w-fit gap-2">
                            <a href={`tel:${data.phone}`} className="flex items-center justify-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 text-s cursor-pointer w-full box-border">Call number</a>
                            <div className="gap-2">
                                <button onClick={handleConfirm} className="bg-green-600 hover:bg-green-900 mr-2 px-10">Confirm</button>
                                <button onClick={handleDeny} className="bg-red-600 hover:bg-red-900">Deny</button>
                            </div>
                        </div>
                    }

                </div>
                :
                <div className="flex flex-col items-center justify-center self-center h-full">
                    {loadingMessage ? 
                    <>
                    <h2>{loadingMessage}</h2>
                    <button onClick={()=>{
                        setLoading(null)
                        setLoadingMessage(null)
                        setOpen(false)
                        updateData()
                    }}>Ok</button>
                    </>
                    
                    : "Loading ..."}
                    
                </div>
                }
            </div>
        </div>
    )
}