'use client'
import { useEffect , useState } from 'react';

import { socket } from '@/utils/socket'
import { getPlacedOrders } from '@/app/actions/OrdersActions'

export default function OrdersPage () {
    
  const [orders , setOrders] = useState([])

  // Handle Socket.io connection
  useEffect(() => {

    async function setInitialOrders () {
      const initialOrders = await getPlacedOrders()
      if(initialOrders.ok) setOrders(initialOrders.data) 
    }
    setInitialOrders()

    socket.connect()
    socket.on("connect", () => {
      console.log('Connected to Socket.io server');
    });
    socket.on("placedOrderServer" , (data)=>{
      console.log("ORDER HAS BEEN PLACED: " ,data)
      setOrders(current=>([...current , data]))
    })
        
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(()=>{
    console.log(orders)
  },[orders])
    
    
    return (
        <main>
            <h2>Orders Page</h2>
        </main>
    )
}