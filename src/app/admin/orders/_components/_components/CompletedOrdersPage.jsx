'use client'


import { useState , useEffect} from "react"
import { getCompletedOrders } from '@/app/actions/OrdersActions'
import PlacedOrder from './PlacedOrder';


export default function CompletedOrdersPage () {

    const [orders , setOrders] = useState([])

    useEffect(() => {

        // Get pending orders from database
        async function setInitialOrders () {
        const initialOrders = await getCompletedOrders()
        console.log(initialOrders)
        if(initialOrders.ok) setOrders(initialOrders.data) 
        }
        setInitialOrders()

    }, []);

    return (
        <>
            <div className='flex gap-2 flex-wrap'>
                {orders.length === 0 ? <h2>No completed orders!</h2> : 
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