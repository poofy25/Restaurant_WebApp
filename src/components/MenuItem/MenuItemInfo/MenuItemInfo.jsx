'use client'

import styles from './menuItemInfo.module.scss'

import Image from "next/image"

import toCartSVG from '/public/svgs/cart.svg'
import infoSVG from '/public/svgs/info.svg'

import { useCartContext }from '@/hooks/useCartContext'

import { useState } from 'react'

export default function MenuItemInfo ({data , isOpenInfo , setIsOpenInfo}) {
    const { dispatch } = useCartContext()

    const [addedToCart , setAddedToCart] = useState(false)

    // Add item to cart context
    const handleCartBtn = () => {
        dispatch({type: 'ADD_ITEM', payload: data})

        // Btn animation
        setAddedToCart(true)
        setTimeout(()=>{setAddedToCart(false)},2500)
    }

    const handleCloseInfo = () => {
        setIsOpenInfo(false)
    }
    

    return (
        <div className='fixed top-0 left-0 w-full h-full z-20 bg-primary no-doc-scroll px-[7.5vw] py-[1rem] box-border flex flex-col items-center gap-4'>
            {/* Item Image */}
            <button onClick={handleCloseInfo}
            className='w-full rounded-lg bg-red-600'
            >Închide</button>

            <div className='w-full flex flex-col relative z-[1] rounded-lg overflow-hidden'>
                <Image src={data.imageUrl} width="500" height="500" alt='Item Image' loading='lazy'
                className='aspect-square sm:aspect-[10/14] flex-1 w-full object-cover  z-[-1] '
                />
            </div>

            {/* Item name */}
            <div className='flex w-full justify-between items-center px-2 box-border'>
                <h3 className='m-0'>{data.name}</h3>
            </div>

            {/* Item description */}
            <div className='flex w-full justify-between items-center px-2 box-border'>
                <p>{data.description}</p>
            </div>

            {/* Item price */}
            <div className='flex w-full justify-between items-center px-2 box-border'>
                <h2>{data.price} lei</h2>
                <h4>{data.weight} g</h4>
            </div>
            
            {/* To cart button */}
            <button className={`
                w-full flex justify-between items-center bg-transparent p-4 cursor-pointer transition-all box-border
                border border-yellow-300 border-solid rounded-lg
                bg-yellow-300 text-black
                hover:bg-yellow-300
                ${styles.toCartBtn}
                ${addedToCart && '!bg-transparent !text-white'} 
                `} 
                onClick={handleCartBtn}
                disabled={addedToCart}
            >

                {!addedToCart ? 
                    // Display message on add the cart
                    <>
                        <div className='w-[24px]'></div>
                        <h3 className='flex'>Adaugă în coș</h3>
                        <Image src={toCartSVG} width="24" height="24" alt='Cart Icon'/>
                    </> : 
                    <>
                        <div className='w-[24px]'></div>
                        <h3 className='flex'>Adăugat în coș !</h3>
                        <Image src={toCartSVG} width="24" height="24" alt='Cart Icon'/>
                    </>
                } 

            </button>
            
        </div>
    )
}