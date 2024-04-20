'use client'

import "./styles.scss"

import { useEffect, useState } from "react"
import Image from "next/image"

import MenuItem from "@/components/MenuItem/MenuItem"

import noImageIMG from '/public/imgs/no-image.jpg'

import { uploadPhoto } from "@/app/actions/MenuItemFormActions"


export default function CreateProductForm ({category}) {

    const [name, setName] = useState('')
    const [categoryID, setCategoryID] = useState('')
    const [description, setDescription] = useState('')
    const [weight, setWeight] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState([])

    
    const [loading , setLoading] = useState(false)
    const [errorMsg , setErrorMsg] = useState(null)
    const [successMsg , setSuccessMsg] = useState(null)


    // Handles the file input
    async function handleInputFile (e) {
        const file = e.target.files

        const newFile = [...file].filter(currentFile => {
            if(currentFile.size < 1024 * 1024 * 4 && currentFile.type.startsWith('image/')){
                return file
            }else {
                throw new Error("File too large")
            }
        })
        setFile([...newFile])
    }

    // Handles form submit
    async function handleFormSubmit (e) {
        e.preventDefault()

        setLoading(true)
        setErrorMsg(null)
        setSuccessMsg(null)

        if(!file[0]) alert("NO IMAGE FILE")

        const formData = new FormData()

        formData.append('files', file[0])
        
        // Upload photo to Cloud
        const res = await uploadPhoto(formData)

        // Check if the response is valid
        if(res?.photoUrl && res?.photoId) {
            const newFormData = new FormData()

            newFormData.append('imageUrl' , res?.photoUrl)
            newFormData.append('imageId' , res?.photoId)
            newFormData.append('name', name)
            newFormData.append('category', categoryID)
            newFormData.append('description', description)
            newFormData.append('price', price)
            newFormData.append('weight', weight)

            // Send data to databbase
            const databaseResponse = await fetch('/api/menu/products',{
                method:"POST",
                body:JSON.stringify(Object.fromEntries(newFormData))
            })
            const data = await databaseResponse.json()
            // Check if database response is successful 
            if(data?._id) {
                setSuccessMsg("A fost creat cu success!")
                setFile([])
                setName('')
                setCategoryID('')
                setDescription('')
                setPrice('')
                setWeight('')
            } else {
                console.log("DATABASE ERROR DATA:  ", data)
                setErrorMsg("A aparut o problema! (Database)")
            }
        } else { 
            console.log("CLOUD ERROR DATA:  ", res)
            setErrorMsg("A aparut o problema! (Cloud)")    
        }
        setLoading(false)
    }

    useEffect(()=>{
        setCategoryID(category?._id)
    },[category])



    return (
        <div className="flex justify-center items-center w-full gap-4">
        <form onSubmit={handleFormSubmit} className="createProductForm w-full justify-center flex gap-4 bg-white p-4 rounded">

            {/* First Column */}
            <div className="flex-1 flex-col flex gap-2">
                <div className="flex flex-col">
                    <label>Nume</label>
                    <input type="text" required onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div className="flex flex-col"> 
                    <label>Categorie</label>
                    <input type="text" required value={category ? category.name : ""} disabled onChange={(e)=>setCategoryID(category._id)}/>
                </div>
                <div className="flex flex-col">
                    <label>Descriere</label>
                    <textarea rows="2" type="text" wrap="hard" required onChange={(e)=>setDescription(e.target.value)} value={description}/>
                </div>
                
                <div className="flex flex-col">
                    <label>Greutate (g)</label>
                    <input type="text" required onChange={(e)=>setWeight(e.target.value)} value={weight}/>
                </div>
                <div className="flex flex-col">
                    <label>Pret (lei)</label>
                    <input type="number" required onChange={(e)=>setPrice(e.target.value)} value={price}/>
                </div>
            </div>
            

            {/* Second Column */}
            <div className="w-[40%] max-w-[250px] flex flex-col gap-2">




                {/* Image input */}
                <div className="flex flex-col">
                    <label>Imagine</label>
                    <div className={`flex items-center justify-center w-full h-fit relative z-10 box-border`}>
                        <label htmlFor="dropzone-file" className="flex flex-col items-center !m-0 justify-center w-full aspect-square border border-solid border-primary-lighter rounded cursor-pointer">
                            <div className="flex flex-col items-center justify-center">
                               {!file[0] && <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Adauga o imagine</span></p> }
                            </div>
                            <input id="dropzone-file" type="file" required className="absolute w-0 opacity-0" accept="image/*" onChange={handleInputFile}/>
                        </label>
                        {/* Show image after upload */}
                        {file[0] &&<div className="w-full h-full -z-10 absolute p-2 box-border"> <Image src={URL.createObjectURL(file[0])} width='500' height='500' className='object-cover w-full h-full box-border rounded -z-10'/> </div>}
                    </div> 
                </div>

                <button className="font-semibold text-base rounded py-2" type="submit" disabled={loading}>{loading ? "Se creaza..." : "Crează produs"} </button>
                {errorMsg && <div className="bg-red-500 p-2 px-4 box-border font-semibold text-white rounded"><p>{errorMsg}</p></div>}
                {successMsg && <div className="bg-green-500 p-2 px-4 box-border font-semibold text-white rounded"><p>{successMsg}</p></div>}


            </div>

        </form>
        <div className="w-fit">
            <MenuItem data={{
                name,
                categoryID,
                description,
                price,
                weight,
                imageUrl:file[0] ? URL.createObjectURL(file[0]) : noImageIMG
            }}
            styles={{ "height":"fit-content" , "width":"250px"}}
            />
        </div>
        </div>
    )
}