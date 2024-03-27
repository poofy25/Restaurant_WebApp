'use client'
import { useEffect , useState } from 'react';

import { socket } from '@/utils/socket'
import { getPlacedOrders } from '@/app/actions/OrdersActions'

import { useWithSound } from '@/hooks/useWithSound'

import orderSound from '/public/sounds/orderSound.mp3'

import PlacedOrder from './_components/PlacedOrder';

export default function OrdersPage () {
    
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
  }, []);
  useEffect(()=>{
    console.log(orders)
  },[orders])
    
    
    return (
        <main className='flex flex-col gap-2'>
            <h2>Orders Page</h2>
            <h2>{connection ? "Connected to the server !" : "Connecting to the server ..."}</h2>
            <div className='flex gap-2 flex-wrap'>
              {orders.reverse().map((order , index) => {
                return (
                  <PlacedOrder data={order} key={index}/>
                )
              })}
            </div>
        </main>
    )
}