'use client'
import { useFormStatus } from "react-dom"

const MenuItemFormSubmitBtn = ({ value , ...props}) => {
    const { pending } = useFormStatus()
    return (
        <button type="submit" disabled={pending} {...props}>
        {pending ? "Submiting..." : "Submit"}
        </button>
    )
}

export default MenuItemFormSubmitBtn