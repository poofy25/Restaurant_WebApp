'use client'

import AdminEditProductForm from './EditProductForm'

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

export default function AdminMenuEditProduct({params}) {

    const router = useRouter()

    const productID = params.id

    const[product , setProduct] = useState(null)

    useEffect(()=>{
      fetch(`/api/menu/products/${productID}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data[0])
      })
    },[])

    const handleDelete = async () => {
        const response = await fetch(`/api/menu/products/${product._id}` , {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: product._id , imageId:product.imageId}),
        });
        const data = await response.json()
        if(data.success === true) router.push('/admin/menu')
    }

    return (
      <main className='flex flex-col flex-wrap items-center justify-center w-full h-[calc(100vh-80px)] px-[7.5vw] py-8 gap-8 box-border'>
        <div className="w-fit flex flex-col gap-4 h-fit  text-primary p-4">
          <div className='flex justify-between bg-white rounded p-4 items-center' >
            <h3 className='font-normal  text-black '>Editeaza produsul : <span className='font-bold'>{product ? product.name : "..."}</span> </h3>
            {product && <button onClick={handleDelete}>Sterge produsul</button> }
          </div>
          {product && 
          <AdminEditProductForm productData={product}/>
          }
        </div>
      </main>
    );
  }
  