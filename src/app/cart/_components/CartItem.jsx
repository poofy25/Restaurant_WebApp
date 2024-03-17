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
                <Image src={item.imageUrl} width="300" height='200' alt='Item Image'/>
                <div className={styles.info}>
                    <h1 className={styles.name}>{item.name}</h1>
                    <h3 className={styles.name}>{item.description}</h3>
                    
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