'use client'

import Categories from "../categories/Categories"
import CategorySubmenu from '../submenu/CategorySubmenu'

import { useEffect, useState } from "react"

export default function CategoryMenu () {

    const [selectedCategory , setSelectedCategory] = useState(null)
    const [categoriesData , setCategoriesData] = useState([])

    useEffect(()=>{
        console.log("Selected category: ",selectedCategory)
    },[selectedCategory])

    return (

        <div className="w-full h-[calc(100vh-80px)] flex gap-8 px-[7.5vw] py-8 box-border">
            <Categories 
            categoriesData={categoriesData} setCategoriesData={setCategoriesData}
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
            {selectedCategory && 
            <CategorySubmenu 
            categoriesData={categoriesData} setCategoriesData={setCategoriesData}
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
            }
        </div>

    )
}