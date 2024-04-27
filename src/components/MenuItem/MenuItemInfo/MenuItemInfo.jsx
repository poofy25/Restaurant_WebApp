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
        <div onClick={(e)=>{if(e.target === e.currentTarget){setIsOpenInfo(false)}}} 
        className='flex justify-center items-center w-full h-full fixed z-[41] left-0 top-0 bg-[rgba(0,0,0,0.95)]'>
            <div className='w-full h-full rounded-lg z-10 bg-primary textureBackground no-doc-scroll p-8 box-border flex flex-col items-center gap-8
            lg:w-fit lg:h-fit overflow-y-auto
            '>

                {/* Close button */}
                <button onClick={handleCloseInfo}
                className='w-full rounded-lg bg-complimentary'
                >Închide</button>


                <div className='flex flex-col flex-1 w-full gap-4 h-full
                lg:flex-row lg:gap-8 lg:justify-start items-start
                '>

                    <div className='w-full lg:w-[25vw] max-w-[450px] lg:max-w-none self-center lg:self-start shadow-xl '>
                        {/* Item Image */}
                        <div className='w-full flex flex-col relative z-[1] rounded-lg overflow-hidden aspect-square

                        '>
                            <Image src={data.imageUrl} fill={true} alt='Item Image' loading='lazy'
                            className='flex-1 w-full object-cover  z-[-1] '
                            />
                        </div>
                    </div>


                    <div className='flex flex-col gap-2 w-full h-full flex-1  lg:w-[30vw] lg:min-h-[25vw] '>

                        {/* Item name */}
                        <div className='flex w-full justify-between items-center px-2 box-border'>
                            <h3 className='m-0 text-2xl lg:text-4xl'>{data.name}</h3>
                        </div>

                        {/* Item description */}
                        <div className='flex w-full justify-between items-center px-2 box-border mt-2'>
                            <p>{data.description}</p>
                        </div>

                        {/* Item price */}
                        <div className='flex w-full justify-between items-center px-2 box-border self-end m-0 mt-auto mb-2'>
                            <h2>{data.price} lei</h2>
                            <h4>{data.weight} g</h4>
                        </div>
                        
                        {/* To cart button */}
                        <button className={`
                            w-full flex justify-between items-center p-3 cursor-pointer transition-all box-border
                            border border-complimentary border-solid rounded-lg
                          text-white bg-complimentary self-end shadow-xl
                            ${styles.toCartBtn}
                            `} 
                            onClick={handleCartBtn}
                            disabled={addedToCart}
                        >

                            {!addedToCart ? 
                                // Display message on add the cart
                                <>
                                    <div className='w-[24px]'></div>
                                    <h3 className='flex'>Adaugă în coș</h3>
                                    <Image src={toCartSVG} width="32" height="32" alt='Cart Icon'/>
                                </> : 
                                <>
                                    <div className='w-[24px]'></div>
                                    <h3 className='flex'>Adăugat în coș !</h3>
                                    <Image src={toCartSVG} width="32" height="32" alt='Cart Icon'/>
                                </>
                            } 

                        </button>

                    </div>
                </div>

                
            </div>
        </div>
    )
}