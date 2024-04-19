'use client'

import "./styles.scss"

import { useEffect, useState } from "react"
import Image from "next/image"

import MenuItem from "@/components/MenuItem/MenuItem"

import noImageIMG from '/public/imgs/no-image.jpg'

import { uploadPhoto } from "@/app/actions/MenuItemFormActions"


export default function AdminEditProductForm ({productData}) {

    const [name, setName] = useState(productData?.name)
    const [categoryID, setCategoryID] = useState(productData?.category)
    const [description, setDescription] = useState(productData?.description)
    const [weight, setWeight] = useState(productData?.weight)
    const [price, setPrice] = useState(productData?.price)
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
        // Form Data
        const formData = new FormData()

        formData.append('imageUrl' , productData.imageUrl)
        formData.append('imageId' , productData.imageId)
        formData.append('name', name)
        formData.append('category', categoryID)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('weight', weight)

        let isUploadingToCloud = null

        if(file[0]) {
            formData.append('files', file[0])
            isUploadingToCloud = true
            const res = await uploadPhoto(formData)
            if(res?.photoUrl && res?.photoId){
                formData.append('imageUrl' ,res.photoUrl)
                formData.append('imageId' , res.photoId)
                isUploadingToCloud = false
            } else {
                setErrorMsg("A aparut o problema!")
                return
            }
        }

        if(isUploadingToCloud === null || isUploadingToCloud === false) {
            const databaseResponse = await fetch(`/api/menu/products/${productData._id}`,{
                method:"PUT",
                body:JSON.stringify(Object.fromEntries(formData))
            })
            const data = await databaseResponse.json()

            if(data.acknowledged === true) {
                setSuccessMsg("A fost actualizat cu success!")
            } else {
                setErrorMsg("A aparut o problema!")
            }
            console.log("UPDATED DATA : " , data)
        }

        setLoading(false)
        

    }




    return (
        <div className="flex flex-col justify-center items-center w-full gap-4 sm:flex-row">
        <form onSubmit={handleFormSubmit} className="editProductForm justify-center flex gap-4 bg-white p-4 w-full rounded">

            {/* First Column */}
            <div className="flex-1 flex-col flex gap-2">
                <div className="flex flex-col">
                    <label>Nume</label>
                    <input type="text" required onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div className="flex flex-col"> 
                    <label>Categorie</label>
                    <input type="text" required value={categoryID} disabled onChange={(e)=>setCategoryID(category._id)}/>
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
                               {!file[0] || !productData.imageUrl && <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Adauga o imagine</span></p> }
                            </div>
                            <input id="dropzone-file" type="file" className="absolute w-0 opacity-0" accept="image/*" onChange={handleInputFile}/>
                        </label>
                        {/* Show image after upload */}
                        {file[0] ? <>
                            <div className="w-full h-full -z-10 absolute p-2 box-border"> <Image src={file[0] && URL.createObjectURL(file[0])} width='500' height='500' className='object-cover w-full h-full box-border rounded -z-10'/> </div>
                        </> : <>
                        <div className="w-full h-full -z-10 absolute p-2 box-border"> <Image src={productData.imageUrl} width='500' height='500' className='object-cover w-full h-full box-border rounded -z-10'/> </div>
                        </>}
                    </div> 
                </div>

                <button className="font-semibold text-base rounded py-2" type="submit" disabled={loading}>{loading ? "Se actualizeaza..." : "Actualizeaza"}</button>
                {errorMsg && <div><p>{errorMsg}</p></div>}
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
                imageUrl:file[0] && URL.createObjectURL(file[0]) || productData?.imageUrl  ||  noImageIMG
            }}
            styles={{ "height":"fit-content" , "width":"250px"}}
            />
        </div>
        </div>
    )
}