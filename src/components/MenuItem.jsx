'use client'
import styles from './menuItem.module.scss'

import Image from "next/image"

import toCartSVG from '/public/svgs/toCart.svg'
import infoSVG from '/public/svgs/info.svg'

export default function MenuItem ( {data} ) {
    console.log(data)
    return (
        <div className={styles.item}>
            <Image src={data.imageUrl} width="500" height="300"/>
            <div className={styles.info}>
                <h3 className={styles.name}>{data.name}</h3>
                <button><Image src={infoSVG} width="24" height="24"/></button>
            </div>
            
            <button className={styles.toCartBtn}>
                <h4 className={styles.price}>{data.price} mdl</h4>
                <p>To Cart</p>
                <Image src={toCartSVG} width="24" height="24"/>
            </button>
        </div>
    )
}