'use client'

import styles from './page.module.scss'

import { useCartContext } from "@/hooks/useCartContext"
import CartItem from './_components/CartItem'
import { calculatePrice , calculateItems} from '@/utils/cartUtils'

import Link from 'next/link'

export default function CartPage () {
    
    const {items , dispatch} = useCartContext()

    return (
        <main className={styles.main}>
            <div className={styles.items}>
                <h2>{`${calculateItems(items)} Article(s) in Cart`}</h2>
                {[...items].reverse().map((item,index) => {
                    return (
                        <CartItem item={item} key={index} dispatch={dispatch}/>
                    )
                })}
            </div>

            <div className={styles.totalInfo}>
                <div><h1>Total</h1><h2>{calculatePrice(items).total + " mdl"}</h2></div>
                <div><p>Subtotal</p><h3>{calculatePrice(items).subtotal + " mdl"}</h3></div>
                <div><p>Delivery</p><h3>{calculatePrice(items).delivery + " mdl"}</h3></div>
                <Link href="/cart/checkout">Order</Link>
            </div>
            
        </main>
    )
}