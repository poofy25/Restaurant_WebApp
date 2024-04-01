'use client'

import styles from './cartItem.module.scss'
import Image from 'next/image'

export default function CartItem ({item , dispatch}) {

    const handleRemove = () => {
        dispatch({type: 'REMOVE_ITEM', payload: item})
    }
    const handleAdd = () => {
        dispatch({type: 'ADD_ITEM', payload: item})
    }

    return(
            <div className="flex w-full box-border items-stretch gap-4 py-2
            border-0 border-b-primary-lighter border-b-2 border-solid h-auto relative
            ">
                <div className='w-[40%] h-full rounded-lg overflow-hidden'>
                    <div className='relative w-full aspect-square'>
                        <Image
                        src={item.imageUrl} fill={true} alt='Item Image'/>
                        
                    </div>
                </div>
                <div className="flex-1 flex flex-col items-start gap-1">
                    <h2 className="text-2xl">{item.name}</h2>
                    <button className='p-0 bg-transparent underline font-normal text-yellow-300 hover:bg-transparent'>Vezi detalii</button>                    
                    <div className={styles.price}>
                    
                    {item.quantity > 1 
                    ?
                    <><h3>{item.price * item.quantity + " mdl"}</h3>&nbsp; | &nbsp;<h4 style={{opacity:"0.75" , fontWeight:"500"}}>{item.price + " mdl"}</h4></>
                    : 
                    <h3>{item.price + " mdl"}</h3>
                    }
                    </div>
                    <div className={styles.incrementBtns}>
                        <button onClick={handleRemove}>-</button>
                        <h3>{item.quantity}</h3>
                        <button onClick={handleAdd} >+</button>
                    </div>
                </div>
            </div>
    )
}