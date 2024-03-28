'use client'


import { useState , useEffect} from "react"
import { getDeniedOrders } from '@/app/actions/OrdersActions'
import PlacedOrder from './_components/PlacedOrder';


export default function DeniedOrdersPage () {

    const [orders , setOrders] = useState([])

    // Get denied orders from database
    const getOrdersFromDb = async () => {
        const response = await getDeniedOrders()
        if(response.ok) setOrders(response.data) 
    }

    useEffect(() => {

        // Get denied orders from database
        getOrdersFromDb()

    }, []);

    return (
        <>
            <div className='flex gap-2 flex-wrap'>
                {orders.length === 0 ? <h2>No denied orders!</h2> : 
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