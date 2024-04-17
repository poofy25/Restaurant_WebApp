'use client'
import { useFormStatus } from "react-dom"

import { useState } from "react"

import CategoryMenu from './_components/categoryMenu/CategoryMenu'

export default function AdminMenuPage () {

    const [name, setName] = useState('')


    const handleSubmit = () => {

    }
    
   
    return (
        <main className="flex justify-center w-full">
            <CategoryMenu/>
            {/* <form action={handleSubmit}>
                <label>Category Name</label>
                <input onChange={(e)=>setName(e.target.value)} value={name} type="text" name="name" required/>
                <MenuItemFormSubmitBtn/>
            </form> */}
        </main>
    )
}

const MenuItemFormSubmitBtn = ({ value , ...props}) => {
    const { pending } = useFormStatus()
    return (
        <button type="submit" disabled={pending} {...props}>
        {pending ? "Submiting..." : "Create"}
        </button>
    )
}