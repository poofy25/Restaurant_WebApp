'use client'


import { useState , useEffect} from "react"
import { getDeniedOrders } from '@/app/actions/OrdersActions'
import PlacedOrder from './PlacedOrder';


export default function DeniedOrdersPage () {

    const [orders , setOrders] = useState([])

    useEffect(() => {

        // Get pending orders from database
        async function setInitialOrders () {
        const initialOrders = await getDeniedOrders()
        console.log(initialOrders)
        if(initialOrders.ok) setOrders(initialOrders.data) 
        }
        setInitialOrders()

    }, []);

    return (
        <>
            <div className='flex gap-2 flex-wrap'>
                {orders.length === 0 ? <h2>No denied orders!</h2> : 
                    orders.reverse().map((order , index) => {
                        return (
                        <PlacedOrder data={order} key={index}/>
                        )
                    })
                }   
            </div>
        </>
    )
}