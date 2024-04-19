'use client'

import CategoryItemsContainer from './CategoryItemsContainer'

import { useEffect, useState } from "react"
export default function CategorySubmenu ({categoriesData , setCategoriesData ,selectedCategory , setSelectedCategory}) {

    const [isActive , setIsActive] = useState(selectedCategory.active)
    
    const handleDeleteCategory = async () => {

        async function deleteFromDb () {
            await fetch(`/api/menu/category/${selectedCategory._id}` , {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: selectedCategory._id }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("DELETE RESPONSE:" , data)
            })
            
        }
        await deleteFromDb()


        setCategoriesData((current)=>{
            const filteredArray = current.filter((item) => item._id !== selectedCategory._id);
            let order = 0
            for (const item of filteredArray) {
                item.order = order;
                order++;
              }
            console.log(filteredArray)

            return filteredArray
        })
        setSelectedCategory(null)
    }

    const handleChangeActiveState = async (e) => {
        const value = e.target.checked
        setIsActive(value)
        setCategoriesData((current)=>{
            const newArray = [...current]
            for (let i = 0; i < newArray.length; i++) {
                if (newArray[i]._id === selectedCategory._id) {
                    newArray[i].active = value;
                }
            }
            return newArray
        }) 
    }

    useEffect(()=>{
        setIsActive(selectedCategory.active)
    },[selectedCategory])

    return (
        <div className="flex flex-col bg-white w-full text-primary p-4 box-border">

            {/* Header */}
            <div className="flex flex-row w-full h-fit items-center justify-between">
                <h3>{selectedCategory.name}</h3>

                <label className="inline-flex items-center cursor-pointer m-0 ml-auto mr-4">
                    <input type="checkbox" onChange={handleChangeActiveState}  className="sr-only peer" checked={isActive == undefined ? false : isActive}/>
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
                <button onClick={handleDeleteCategory}>Sterge Categoria</button>
            </div>
            <CategoryItemsContainer
            categoriesData={categoriesData} setCategoriesData={setCategoriesData}
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            />

        </div>
    )
}