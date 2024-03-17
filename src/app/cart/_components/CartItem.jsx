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
            <div className={styles.item}>
                <Image src={item.imageUrl} width="500" height="300" alt='Item Image'/>
                <h3 className={styles.name}>{item.name}</h3>
                
                <h4 className={styles.price}>{item.price} mdl</h4>
                <div>
                    <button onClick={handleRemove}>-</button>
                    <h3>{item.quantity}</h3>
                    <button onClick={handleAdd} >+</button>
                </div>
            </div>
    )
}