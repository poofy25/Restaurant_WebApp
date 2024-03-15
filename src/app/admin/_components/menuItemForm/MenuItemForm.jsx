"use client"
import styles from './menuItemForm.module.scss'

import { useState , useRef } from 'react'
import MenuItemFormPhotoCard from './MenuItemFormPhotoCard'
import MenuItemFormSubmitBtn from './MenuItemFormSubmitBtn'

import { uploadPhoto } from '@/app/actions/MenuItemFormActions'

export default function MenuItemForm () {

    const formRef = useRef()
    const [file, setFile] = useState([])
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [weight, setWeight] = useState('')


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

    async function handleDelete (index) {
        console.log(index)
        const newFile = file.filter((_, i)=> i !== index)
        setFile(newFile)
        formRef.current.reset()
    }

    async function handleSubmit () {
        if(!file.length) return alert('No image files are selected!')

        const formData = new FormData()

        file.forEach(currentFile => {
            formData.append('files', currentFile)
        })
        
        
        // Upload photo to Cloud
        const res = await uploadPhoto(formData)
        console.log(res)
        
        if(res?.photoUrl) {
            alert("Photo uploaded successfully to cloudinary!")
            const newFormData = new FormData()

            newFormData.append('imageUrl' , res?.photoUrl)
            newFormData.append('name', name)
            newFormData.append('category', category)
            newFormData.append('description', description)
            newFormData.append('price', price)
            newFormData.append('weight', weight)

            const databaseResponse = await fetch('/api/menuitems',{
                method:"POST",
                body:JSON.stringify(Object.fromEntries(newFormData))
            })
            // const data = await databaseResponse.json() || "NO DATA"
            console.log(databaseResponse)
        } else { alert("Error : " , res?.error) }

        // setFile([])
        // setName('')
        // setCategory('')
        // setDescription('')
        // setPrice('')
        // setWeight('')
        // formRef.current.reset()

    }



    return (
        <form action={handleSubmit} ref={formRef} className={styles.form}>
        
            <label>Image</label>
            <input type="file" required accept="image/*" onChange={handleInputFile}/>
            <label>Name</label>
            <input type="text" onChange={(e)=>{setName(e.target.value)}} value={name} required/>
            <label>Category</label>
            <input type="text" onChange={(e)=>{setCategory(e.target.value)}} value={category} required/>
            <label>Description</label>
            <input type="text" onChange={(e)=>{setDescription(e.target.value)}} value={description} required/>
            <label>Price</label>
            <input type="text" onChange={(e)=>{setPrice(e.target.value)}} value={price} required/>
            <label>Weight</label>
            <input type="text" onChange={(e)=>{setWeight(e.target.value)}} value={weight} required/>

            <MenuItemFormSubmitBtn value="Upload"/>
            

            {file.map((value , index) => {
                return(
                <MenuItemFormPhotoCard url={URL.createObjectURL(value)} onClick={()=>{handleDelete(index)}} key={index}/>
                )
            })}
        </form>
    )
} 