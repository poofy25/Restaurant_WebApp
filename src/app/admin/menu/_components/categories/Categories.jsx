'use client'


import CategoriesContainer from './CategoriesContainer';
import { useState } from 'react';



export default function Categories ({categoriesData , setCategoriesData ,selectedCategory , setSelectedCategory}) {

    const [isOpenForm , setIsOpenForm] = useState(false)
    const [name , setName] = useState('')

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        async function addCategoryToDb () {
            fetch('/api/menu/category' , {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ name: name })
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("CATEGORY ADDED:" , data)
            setCategoriesData(current=>[...current , data])
            })
        }
        await addCategoryToDb()


        async function getCategoriesFromDb () {
            fetch('/api/menu/getAllCategories/placeholder')
            .then((res) => res.json())
            .then((data) => {
                console.log("GOT DATA:" , data)
            setCategoriesData(data)
        })
        }
        await getCategoriesFromDb()

        setIsOpenForm(false)

    }
   
    return (

        <div className="bg-white w-[30%] h-full text-black overflow-y-auto">
            <div className="flex flex-col justify-between items-center">
                <p className='py-2 font-bold'>Categorii</p>
                {!isOpenForm ? 
                <button onClick={()=>setIsOpenForm(true)} className='font-normal text-md w-full'>+ Adauga o categorie</button>
                : 
                <form onSubmit={handleFormSubmit}>
                    <input onChange={(e)=>setName(e.target.value)} value={name} type='text' required placeholder='Numele categoriei'/>
                    <button type='submit' className='text-sm'>Adauga</button>
                </form>
                }   
            </div>
            <CategoriesContainer categoriesData={categoriesData} setCategoriesData={setCategoriesData} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
            
        </div>

    )
}