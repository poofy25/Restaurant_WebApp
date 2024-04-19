'use client'

import CreateProductForm from './CreateProductForm'

import { useEffect, useState } from 'react';

export default function AdminMenuAddProductByCategory({params}) {
    const categoryID = params.id

    const[categoryFromId , setCategoryFromId] = useState(null)

    useEffect(()=>{
      fetch(`/api/menu/category/${categoryID}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryFromId(data[0])
      })
    },[])
    return (
      <main className='flex flex-col flex-wrap items-center justify-center w-full h-[calc(100vh-80px)] px-[7.5vw] py-8 gap-8 box-border'>
        <div className="w-full flex flex-col gap-4 h-fit  text-primary p-4">
          <h3 className='font-normal bg-white text-black rounded p-4'>Creaza un produs in categoria : <span className='font-bold'>{categoryFromId ? categoryFromId.name : "..."}</span> </h3>
          <CreateProductForm category={categoryFromId}/>
        </div>
      </main>
    );
  }
  