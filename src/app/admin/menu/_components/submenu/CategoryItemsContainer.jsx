'use client'
import { useRouter } from "next/navigation"

import CategoryItems from './categorySubmenuItems.jsx/CategoryItems'


export default function CategoryItemsContainer ({categoriesData , setCategoriesData ,selectedCategory , setSelectedCategory}) {

    const router = useRouter()
    return (
        <div>
            <div>
                <button onClick={()=>router.push(`/admin/menu/addproduct/${selectedCategory._id}`)} >+ Adauga un articol</button>
            </div>
            <div>
                <CategoryItems selectedCategory={selectedCategory}/>
            </div>
        </div>
    )
}