'use client'


import { useState , useEffect} from "react"

import { socket } from '@/utils/socket'
import { getPlacedOrders } from '@/app/actions/OrdersActions'
import { useWithSound } from '@/hooks/useWithSound'

import orderSound from '/public/sounds/orderSound.mp3'

import PlacedOrder from './PlacedOrder';


export default function NewOrdersPage () {

    const [orders , setOrders] = useState([])
    const [connection , setConnection] = useState(false)
    const { playSound } = useWithSound(orderSound)

    // Handle Socket.io connection
    useEffect(() => {

        // Connect to socket.io server to recive orders in real-time
        socket.connect()

        // Get initial orders from database
        async function setInitialOrders () {
        const initialOrders = await getPlacedOrders()
        console.log(initialOrders)
        if(initialOrders.ok) setOrders(initialOrders.data) 
        }
        setInitialOrders()

        function handlePlacedOrder(data) {
        console.log("ORDER HAS BEEN PLACED: " ,data)
        setOrders(current=>([data , ...current]))
        playSound()
        }

        socket.on("connect", () => {
        console.log('Connected to Socket.io server');
        if(!connection) setConnection(true)
        });
        socket.on("placedOrderServer" , handlePlacedOrder)
            
        return () => {
        socket.disconnect();
        socket.off("placedOrderServer", handlePlacedOrder)
        };
    }, []);``

    return (
        <>
            <h2>{connection ? "Connected to the server !" : "Connecting to the server ..."}</h2>
            <div className='flex gap-2 flex-wrap'>
                {orders.length === 0 ? <h2>No new orders!</h2> : 
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