'use client'
import styles from './menuItem.module.scss'

import Image from "next/image"

import toCartSVG from '/public/svgs/cart.svg'
import infoSVG from '/public/svgs/info.svg'

import { useCartContext }from '@/hooks/useCartContext'
import { useState } from 'react'

import MenuItemInfo from './MenuItemInfo/MenuItemInfo'

export default function MenuItem ( {data , isSlider} ) {

    const { dispatch } = useCartContext()

    const [addedToCart , setAddedToCart] = useState(false)
    const [isOpenInfo , setIsOpenInfo] = useState(false)

    // Add item to cart context
    const handleCartBtn = () => {
        dispatch({type: 'ADD_ITEM', payload: data})

        // Btn animation
        setAddedToCart(true)
        setTimeout(()=>{setAddedToCart(false)},2500)
    }

    const handleOpenInfo = () => {
        setIsOpenInfo(true)
    }
    
    // w-[clamp(100px,41vw,200px)] 

    return (
        <>
            <div className={`
                w-[50%] p-2
                relative flex flex-col overflow-hidden items-center
                box-border border rounded-lg gap-2 transition-all border-solid border-transparent
                sm:w-[calc(33.33%)]
                md:w-[calc(25%)]
                lg:w-[calc(20%)] sm:p-4
            hover:border-yellow-300
            ${isSlider ? 'keen-slider__slide' : ''}
            `}>
                {/* Item Image */}
                <div onClick={handleOpenInfo}
                className='w-full flex flex-col relative cursor-pointer z-[1] rounded-lg overflow-hidden aspect-square sm:aspect-[10/14]'>
                    <Image src={data.imageUrl} fill={true} alt='Item Image' loading='lazy'
                    sizes="(max-width: 640px) 35vw, (max-width: 764px) 27.5vw, , (max-width: 1024px) 20vw , 17.5vw"
                    className='aspect-square sm:aspect-[10/14] flex-1 w-full object-cover  z-[-1] '
                    />
                    <h3 className='sm:hidden absolute left-2 bottom-2 z-1 pr-2 box-border'>{data.name}</h3>
                    <div className='sm:hidden z-[-1]  absolute w-full h-full bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.5)]'></div>
                </div>

                {/* Item name */}
                <div className='hidden sm:flex w-full justify-between items-center p-2 box-border'>
                    <h3 className='truncate'>{data.name}</h3>
                    <button onClick={handleOpenInfo}
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

            {isOpenInfo && <MenuItemInfo data={data} isOpenInfo={isOpenInfo} setIsOpenInfo={setIsOpenInfo}/>}
        </>
    )
}