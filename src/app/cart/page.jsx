'use client'

import styles from './page.module.scss'

import { useCartContext } from "@/hooks/useCartContext"
import CartItem from './_components/CartItem'
import { calculatePrice , calculateItems} from '@/utils/cartUtils'

import Link from 'next/link'

export default function CartPage () {
    
    const {items , dispatch} = useCartContext()

    return (
        <main className="flex flex-col px-[7.5vw] box-border sm:flex-row pb-20 sm:gap-8">

            {/* Items and Header */}
            <div className="flex flex-col w-full sm:w-[60%]">

                {/* Header */}
                <h2 className='text-3xl pb-4  border-0 border-b-yellow-300 border-b-2 border-solid'>
                {`${calculateItems(items) !== 0 ? calculateItems(items) : "" }
                ${calculateItems(items) === 0 ? "Nici un articol în coș" : calculateItems(items) === 1 ? "Articol în coș" : "Articole în coș" }`}
                </h2>


                {[...items].reverse().map((item,index) => {
                    //Check if the items is the last one to remove a tailwind class
                    let isLastOne = false
                    if(index + 1 === [...items].reverse().length) isLastOne=true
                    return (
                        <CartItem item={item} key={index} dispatch={dispatch} isLastOne={isLastOne}/>
                    )
                })}
            </div>

            {calculateItems(items) !== 0 ? <>
            
            {/* Delivery */}
                <div className="flex flex-col py-4 box-border border-0 border-t-2 border-t-yellow-300 border-solid
                sm:flex-1 sm:border-0 sm:pt-0
                ">
                    <h2 className='text-center text-3xl sm:pb-4 sm:border-0 sm:border-b-yellow-300 sm:border-b sm:border-solid'>Livrare</h2>
                    <div className='py-2 flex justify-between border-0 border-b-2 border-b-primary-lighter border-solid'><h3 className='font-normal'>Subtotal</h3><h3 className='font-normal'>{calculatePrice(items).subtotal + " mdl"}</h3></div>
                    <div className='py-2 flex justify-between border-0 border-b-2 border-b-primary-lighter border-solid'><h3 className='font-normal'>Livrare</h3><h3 className='font-normal'>{calculatePrice(items).delivery + " mdl"}</h3></div>
                    <div className='pt-4 flex justify-between'><h2>Total</h2><h2>{calculatePrice(items).total + " mdl"}</h2></div>

                    {/* Checkout button */}
                    <Link
                    className='bg-yellow-300 text-black font-bold text-2xl
                    flex justify-center items-center rounded-lg py-2 mt-4 hover:text-black
                    hover:bg-yellow-400 transition-all
                    '
                    href="/cart/checkout">Comandă</Link>
                </div>
            </> : <>

            {/* Back to home button if no articles are in cart */}
                <Link
                    className='bg-yellow-300 text-black font-bold text-2xl
                    flex justify-center items-center rounded-lg py-2 mt-4 hover:text-black
                    hover:bg-yellow-400 transition-all
                    '
                    href="/">Vezi articole</Link>
            </>}
            
        </main>
    )
}