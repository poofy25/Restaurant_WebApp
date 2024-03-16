"use client"
import styles from './component.module.scss'
import Image from "next/image"

export default function MenuItemAdmin ( { data } ) {
    
    const handleDelete = () => {
        const deleteData = async () => {
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
            console.log(responseData)
            };

        deleteData();
    }


    return (
        <article className={styles.item}>
            <Image src={data.imageUrl} width="500" height="300"/>
            <h3 className={styles.name}>{data.name}</h3>
            <h4 className={styles.category} >{data.category}</h4>
            <p className={styles.description}>{data.description}</p>
            <h4 className={styles.price}>{data.price} lei</h4>
            <h5 className={styles.weight}>{data.weight} g</h5>
            <button className={styles.editBtn}>Edit</button>
            <button onClick={handleDelete} className={styles.deleteBtn}>Delete</button>
        </article>
    )
}