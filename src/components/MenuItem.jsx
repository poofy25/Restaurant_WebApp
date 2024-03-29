'use client'
import styles from './menuItem.module.scss'

import Image from "next/image"

import toCartSVG from '/public/svgs/toCart.svg'
import infoSVG from '/public/svgs/info.svg'

import { useCartContext }from '@/hooks/useCartContext'

export default function MenuItem ( {data} ) {

    const { dispatch } = useCartContext()


    const handleCartBtn = () => {
        console.log("Dispatch")
        dispatch({type: 'ADD_ITEM', payload: data})
    }
    

    return (
        <div className={styles.item}>
            <Image src={data.imageUrl} width="350" height="500" alt='Item Image' loading='lazy'/>
            <div className={styles.info}>
                <h3 className={styles.name}>{data.name}</h3>
                <button><Image src={infoSVG} width="24" height="24" alt='Info Icon'/></button>
            </div>
            
            <button className={styles.toCartBtn} onClick={handleCartBtn}>
                <h4 className={styles.price}>{data.price} mdl</h4>
                <p>To Cart</p>
                <Image src={toCartSVG} width="24" height="24" alt='Cart Icon'/>
            </button>
        </div>
    )
}