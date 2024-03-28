'use client'


import { useState , useEffect} from "react"

import { socket } from '@/utils/socket'
import { getPlacedOrders } from '@/app/actions/OrdersActions'
import { useWithSound } from '@/hooks/useWithSound'

import orderSound from '/public/sounds/orderSound.mp3'

import PlacedOrder from './_components/PlacedOrder';


export default function NewOrdersPage () {

    const [loading , setLoading] = useState(false)
    const [orders , setOrders] = useState([])
    const [connection , setConnection] = useState(false)
    const { playSound } = useWithSound(orderSound)

    // Get placed orders from database
    const getOrdersFromDb = async () => {
        setLoading(true)
        const response = await getPlacedOrders()
        if(response.ok) setOrders(response.data) 
        setLoading(false)
    }

    // Handle Socket.io connection
    useEffect(() => {

        // Connect to socket.io server to recive orders in real-time
        socket.connect()

        // Get placed orders from database
        getOrdersFromDb()

        // Sets the new order that arrived to the current orders and plays a sound
        function handlePlacedOrder(data) {
            setOrders(current=>([data , ...current]))
            playSound()
        }

        // Runs on connect to the server
        socket.on("connect", () => {
            console.log('Connected to Socket.io server');
            if(!connection) setConnection(true)
        });
        socket.on("placedOrderServer" , handlePlacedOrder)
            
        return () => {
            socket.disconnect();
            socket.off("placedOrderServer", handlePlacedOrder)
        };
    }, [])

    return (
        <>
            <h2>{connection ? "Connected to the server !" : "Connecting to the server ..."}</h2>
            <div className='flex gap-2 flex-wrap'>
                {orders.length === 0 && !loading ? <h2>No new orders!</h2> : 
                    loading ? <h2>Loading ...</h2>   :
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