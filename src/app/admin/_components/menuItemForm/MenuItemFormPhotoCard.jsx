"use client"
import Image from "next/image"

const MenuItemFormPhotoCard = ({ url , onClick }) => {
    return (
        <div>
            <Image src={ url } alt="image" width="200" height="100"/>
            <button type="button" onClick={onClick}>Delete</button>
        </div>
    )
}

export default MenuItemFormPhotoCard