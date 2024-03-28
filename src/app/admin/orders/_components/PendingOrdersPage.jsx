'use client'


import { useState , useEffect} from "react"
import { getPendingOrders } from '@/app/actions/OrdersActions'
import PlacedOrder from './_components/PlacedOrder';


export default function PendingOrdersPage () {

    const [orders , setOrders] = useState([])

    // Get pending orders from database
    const getOrdersFromDb = async () => {
        const initialOrders = await getPendingOrders()
        if(initialOrders.ok) setOrders(initialOrders.data) 
    }

    useEffect(() => {

        // Get pending orders from database
        getOrdersFromDb()

    }, []);

    return (
        <>
            <div className='flex gap-2 flex-wrap'>
                {orders.length === 0 ? <h2>No pending orders!</h2> : 
                    orders.reverse().map((order , index) => {
                        return (
                        <PlacedOrder data={order} key={index} getOrdersFromDb={getOrdersFromDb}/>
                        )
                    })
                }   
            </div>
        </>
    )
}