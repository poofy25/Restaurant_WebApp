'use client'


import { useState , useEffect} from "react"
import { getCompletedOrders } from '@/app/actions/OrdersActions'
import PlacedOrder from './_components/PlacedOrder';


export default function CompletedOrdersPage () {

    const [loading , setLoading] = useState(false)
    const [orders , setOrders] = useState([])

    // Get completed orders from database
    const getOrdersFromDb = async () => {
        setLoading(true)
        const response = await getCompletedOrders()
        if(response.ok) setOrders(response.data) 
        setLoading(false)
    }

    useEffect(() => {

        // Get completed orders from database
        getOrdersFromDb()

    }, []);

    return (
        <>
            <div className='flex gap-2 flex-wrap'>
                {orders.length === 0 && !loading ? <h2>No completed orders!</h2> : 
                    loading ? <h2>Loading ... </h2> :
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