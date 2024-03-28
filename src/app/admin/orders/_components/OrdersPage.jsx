'use client'
import { useEffect , useState } from 'react';

import NewOrdersPage from './NewOrdersPage'
import PendingOrdersPage from './PendingOrdersPage'
import CompletedOrdersPage from './CompletedOrdersPage'
import DeniedOrdersPage from './DeniedOrdersPage'

export default function OrdersPage () {
  
  const [page , setPage] = useState(null)
  
  // Changes current page based on button click
  const handleChangePage = (pageName) => {
    if(page !== pageName)setPage(pageName)
  }
    
    return (
        <main className='flex flex-col gap-2'>
            <h2>Orders Page</h2>
            <div>
              <button onClick={()=>handleChangePage("New Orders")} className='disabled:bg-blue-900' disabled={page === "New Orders" ? true : false}>New Orders</button>
              <button onClick={()=>handleChangePage("Pending Orders")} className='disabled:bg-blue-900' disabled={page === "Pending Orders" ? true : false}>Pending Orders</button>
              <button onClick={()=>handleChangePage("Completed Orders")} className='disabled:bg-blue-900' disabled={page === "Completed Orders" ? true : false}>Completed Orders</button>
              <button onClick={()=>handleChangePage("Denied Orders")} className='disabled:bg-blue-900' disabled={page === "Denied Orders" ? true : false}>Denied Orders</button>
            </div>
            {
            page === 'New Orders' && <NewOrdersPage/> || 
            page === 'Pending Orders' && <PendingOrdersPage/> || 
            page === 'Completed Orders' && <CompletedOrdersPage/> || 
            page === 'Denied Orders' && <DeniedOrdersPage/> 
            }
        </main>
    )
}