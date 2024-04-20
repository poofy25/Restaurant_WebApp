'use client'
import { useRouter } from "next/navigation"

import CategoryItems from './categorySubmenuItems.jsx/CategoryItems'

import { useEffect } from "react"
import Link from "next/link"


export default function CategoryItemsContainer ({categoriesData , setCategoriesData ,selectedCategory , setSelectedCategory}) {

    const router = useRouter()
    return (
        <div>
            <div>
                <Link href={`/admin/menu/addproduct/${selectedCategory._id}`}
                className="bg-red-500 p-2 px-4 hover:text-white font-semibold cursor-pointer"
                >+ Adauga un articol</Link>
            </div>
            <div>
                <CategoryItems selectedCategory={selectedCategory}/>
            </div>
        </div>
    )
}