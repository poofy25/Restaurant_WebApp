'use client'
import styles from './menuItem.module.scss'

import Image from "next/image"

import toCartSVG from '/public/svgs/cart.svg'
import infoSVG from '/public/svgs/info.svg'

import { useCartContext }from '@/hooks/useCartContext'
import { useState } from 'react'

export default function MenuItem ( {data} ) {

    const { dispatch } = useCartContext()

    const [addedToCart , setAddedToCart] = useState(false)

    // Add item to cart context
    const handleCartBtn = () => {
        dispatch({type: 'ADD_ITEM', payload: data})

        setAddedToCart(true)
        setTimeout(()=>{setAddedToCart(false)},2500)
    }
    

    return (
        <div className='
            w-[clamp(100px,32vw,200px)] 
            relative flex flex-col overflow-hidden items-center
            p-2 box-border border rounded-lg gap-2 transition-all border-solid border-transparent
            sm:w-[clamp(175px,20vw,250px)] sm:p-4
          sm:hover:border-yellow-300
        '>
            {/* Item Image */}
            <div className='w-full flex flex-col relative cursor-pointer'>
                <Image src={data.imageUrl} width="350" height="500" alt='Item Image' loading='lazy'
                className='aspect-square sm:aspect-[10/14] flex-1 w-full object-cover rounded-lg '
                />
                <p className='sm:hidden absolute left-2 bottom-2 z-10'>{data.name}</p>
                <div className='sm:hidden absolute w-full h-full bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.5)]'></div>
            </div>

            {/* Item name */}
            <div className='hidden sm:flex w-full justify-between items-center p-2 box-border'>
                <h3 className='truncate'>{data.name}</h3>
                <button
                className='bg-transparent invert border-0 cursor-pointer p-0 flex justify-center items-center'
                ><Image src={infoSVG} width="24" height="24" alt='Info Icon'/></button>
            </div>
            
            {/* To cart button */}
            <button className={`
                w-full flex justify-between bg-transparent p-2 cursor-pointer transition-all box-border text-white
                border border-yellow-300 border-solid rounded-lg
                hover:bg-yellow-300 hover:text-black
                ${styles.toCartBtn}
                ${addedToCart && 'bg-yellow-300 !text-black'} 
                `} 
                onClick={handleCartBtn}
                disabled={addedToCart}
            >

                {!addedToCart ? 
                    // Display message on add the cart
                    <>
                        <h4 className=''>{data.price} mdl</h4>
                        <p className='hidden sm:flex ml-auto mr-2'>În coș</p>
                        <Image src={toCartSVG} width="24" height="24" alt='Cart Icon'/>
                    </> : 
                    <>
                        <p className='hidden sm:flex self-center'>Adaugat în coș!</p>
                        <p className='flex sm:hidden self-center'>În coș!</p>
                        <Image src={toCartSVG} width="24" height="24" alt='Cart Icon' className='!invert-0'/>
                    </>
                } 

            </button>
            
        </div>
    )
}