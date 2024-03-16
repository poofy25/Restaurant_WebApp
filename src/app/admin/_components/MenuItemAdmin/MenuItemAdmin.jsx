"use client"
import styles from './component.module.scss'
import Image from "next/image"

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'

export default function MenuItemAdmin ( { data } ) {

    const router = useRouter()
    const [isPending , startTransition] = useTransition()
    
    
    const handleDelete = async () => {
            console.log("Deleting..." , data)
            const response = await fetch(`/api/menuitems/${data._id}` , {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: data._id , imageId:data.imageId}),
            });
            console.log("Response : " , response)
            const responseData = await response.json();
            router.refresh()
            console.log(responseData)
    };
    const handleEdit = () => {
        console.log("working")
        router.push(`/admin/edit/${data._id}`)
    }
    


    return (
        <article className={styles.item}>
            <Image src={data.imageUrl} width="500" height="300"/>
            <h3 className={styles.name}>{data.name}</h3>
            <h4 className={styles.category} >{data.category}</h4>
            <p className={styles.description}>{data.description}</p>
            <h4 className={styles.price}>{data.price} lei</h4>
            <h5 className={styles.weight}>{data.weight} g</h5>
            <button onClick={handleEdit} className={styles.editBtn}>Edit</button>
            <button onClick={()=>startTransition(handleDelete)} disabled={isPending} className={styles.deleteBtn}>
                {isPending ? "Deleting..." : "Delete"}
            </button>
        </article>
    )
}