'use client'

import styles from './page.module.scss'

import { useCartContext } from "@/hooks/useCartContext"
import CartItem from './_components/CartItem'

export default function CartPage () {
    
    const {items , dispatch} = useCartContext()

    const calculateSubtotal = () => {
        let subtotal = 0
        items.forEach((item) => {
            subtotal += item.price * item.quantity
        })
        return subtotal
    }
    const calculateDelivery = () => {
        let delivery = 0
        if(calculateSubtotal() < 500) delivery = 50
        return delivery
    }
    const calculateItems = () => {
        let itemsCount = 0
        items.forEach((item) => {
            itemsCount += item.quantity
        })
        return itemsCount
    }
    return (
        <main className={styles.main}>
            <div className={styles.items}>
                <h2>{`${calculateItems()} Article(s) in Cart`}</h2>
                {[...items].reverse().map((item,index) => {
                    return (
                        <CartItem item={item} key={index} dispatch={dispatch}/>
                    )
                })}
            </div>

            <div className={styles.totalInfo}>
                <div><h1>Total</h1><h2>{calculateSubtotal() + calculateDelivery() + " mdl"}</h2></div>
                <div><p>Subtotal</p><h3>{calculateSubtotal() + " mdl"}</h3></div>
                <div><p>Delivery</p><h3>{calculateDelivery() + " mdl"}</h3></div>
                <button>Order</button>
            </div>
            
        </main>
    )
}