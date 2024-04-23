'use client'

import styles from './cartItem.module.scss'
import Image from 'next/image'

import { useState } from 'react'

import MenuItemInfo from '@/components/MenuItem/MenuItemInfo/MenuItemInfo'

export default function CartItem ({item , dispatch , isLastOne}) {

    const [isOpenInfo , setIsOpenInfo] = useState(false)

    const handleRemove = () => {
        dispatch({type: 'REMOVE_ITEM', payload: item})
    }
    const handleAdd = () => {
        dispatch({type: 'ADD_ITEM', payload: item})
    }

    return(
        <>
            <div className={`flex w-full box-border items-stretch gap-4 py-4
            ${isLastOne ? "!border-0" : "border-0"} border-b-primary-lighter border-b-2 border-solid h-full relative
            `}>
                    <div onClick={()=>setIsOpenInfo(true)}
                    className='relative w-[40%] flex-1 rounded-lg overflow-hidden shadow-xl cursor-pointer
                    sm:max-w-[150px] 
                    '>
                        <Image className='object-cover'
                        src={item.imageUrl} fill={true} alt='Item Image'/>
                    </div>

                <div className="w-[60%] flex flex-col items-start gap-1">
                    <h2 className="text-2xl">{item.name}</h2>
                    <button onClick={()=>setIsOpenInfo(true)}  className='p-0 bg-transparent underline font-normal text-complimentary hover:bg-transparent'>Vezi detalii</button>                    
                    <div className={styles.price}>
                    
                    {item.quantity > 1 
                    ?
                    <><h3>{item.price * item.quantity + " mdl"}</h3>&nbsp; | &nbsp;<h4 style={{opacity:"0.75" , fontWeight:"500"}}>{item.price + " mdl"}</h4></>
                    : 
                    <h3>{item.price + " mdl"}</h3>
                    }
                    </div>
                    <div className={`${styles.incrementContainer} 
                    shadow
                    border border-primary-lighter border-solid overflow-hidden
                    flex justify-center items-center w-fit rounded`}>
                        <button className='hover:bg-primary-lighter'
                        onClick={handleRemove}>-</button>
                        <h3 className='border-0 border-r border-r-primary-lighter border-l border-l-primary-lighter border-solid'>{item.quantity}</h3>
                        <button className='hover:bg-primary-lighter' 
                        onClick={handleAdd} >+</button>
                    </div>
                </div>
            </div>
            {isOpenInfo && <MenuItemInfo data={item} setIsOpenInfo={setIsOpenInfo} /> }
        </>
    )
}