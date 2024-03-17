'use client'
import { useCartContext } from "@/hooks/useCartContext"
import CartItem from './_components/CartItem'

export default function CartPage () {
    
    const {items , dispatch} = useCartContext()
    return (
        <main style={{display:"flex" , flexDirection:"column" , padding:"1rem" , alignContent:"center"}}>
            <h2>Cart</h2>
            <div>
                {[...items].reverse().map((item,index) => {
                    return (
                        <CartItem item={item} key={index} dispatch={dispatch}/>
                    )
                })}
            </div>
        </main>
    )
}