"use client"
import styles from './menuItemForm.module.scss'

import { useState , useRef } from 'react'
import MenuItemFormPhotoCard from './MenuItemFormPhotoCard'
import MenuItemFormSubmitBtn from './MenuItemFormSubmitBtn'
import MenuItem from '@/components/MenuItem/MenuItem'

import { uploadPhoto } from '@/app/actions/MenuItemFormActions'

import menuCategories from '@/utils/menuCategoriesJSON'

import noImageIMG from '/public/imgs/no-image.jpg'

export default function MenuItemForm ({data:editData}) {
    
    const formRef = useRef()
    const [file, setFile] = useState([])
    const [name, setName] = useState(editData?.name || '')
    const [category, setCategory] = useState(editData?.category || '')
    const [description, setDescription] = useState(editData?.description || '')
    const [price, setPrice] = useState(editData?.price || '')
    const [weight, setWeight] = useState(editData?.weight || '')


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

    async function handleSubmit () {
        // Handle submit for  creation
        if(!editData){
            if(!file.length) return alert('No image files are selected!')

            const formData = new FormData()

            file.forEach(currentFile => {
                formData.append('files', currentFile)
            })
            
            
            // Upload photo to Cloud
            const res = await uploadPhoto(formData)
            
            if(res?.photoUrl && res?.photoId) {
                const newFormData = new FormData()

                newFormData.append('imageUrl' , res?.photoUrl)
                newFormData.append('imageId' , res?.photoId)
                newFormData.append('name', name)
                newFormData.append('category', category)
                newFormData.append('description', description)
                newFormData.append('price', price)
                newFormData.append('weight', weight)

                const databaseResponse = await fetch('/api/menuitems',{
                    method:"POST",
                    body:JSON.stringify(Object.fromEntries(newFormData))
                })
                const data = await databaseResponse.json() 
            } else { alert("Error : " , res?.error) }

            setFile([])
            setName('')
            setCategory('')
            setDescription('')
            setPrice('')
            setWeight('')
            formRef.current.reset()
        }
        // Handle submit for edit 
        if(editData){
            // Form Data for uploading to cloud
            const formData = new FormData()
            // Form Data for uploading to DB
            const newFormData = new FormData()

            newFormData.append('imageUrl' , editData.imageUrl)
            newFormData.append('imageId' , editData.imageId)
            newFormData.append('name', name)
            newFormData.append('category', category)
            newFormData.append('description', description)
            newFormData.append('price', price)
            newFormData.append('weight', weight)

            // Check if the image has been edited
            const isNewImage = file[0] ? true : false
            if(isNewImage){

                file.forEach(currentFile => {
                    formData.append('files', currentFile)
                })

                // Upload photo to Cloud
                const res = await uploadPhoto(formData)
                if(res?.photoUrl && res?.photoId) {
                    newFormData.append('imageUrl' , res?.photoUrl)
                    newFormData.append('imageId' , res?.photoId)
                } else { alert("Error : " , res?.error) }


            }
            const databaseResponse = await fetch(`/api/menuitems/${editData._id}`,{
                method:"PUT",
                body:JSON.stringify(Object.fromEntries(newFormData))
            })
            const data = await databaseResponse.json() 
        
        }
    }


    return (
        <div>
        <form action={handleSubmit} ref={formRef} className={styles.form}>
        
            <label>Image</label>
            <input type="file" required={false} accept="image/*" onChange={handleInputFile}/>
            <label>Name</label>
            <input type="text" onChange={(e)=>{setName(e.target.value)}} value={name} required/>
            <label>Category</label>
            <select onChange={(e)=>{setCategory(e.target.value)}} value={category} required>
                <option value="">Chose Category</option>
                {menuCategories.map((ctgr , index) => {
                    return (
                        <option key={index} value={ctgr}>{ctgr}</option>
                    )
                })}

            </select>
            <label>Description</label>
            <input type="text" onChange={(e)=>{setDescription(e.target.value)}} value={description} required/>
            <label>Price (lei)</label>
            <input type="number" onChange={(e)=>{setPrice(e.target.value)}} value={price} required/>
            <label>Weight (g)</label>
            <input type="text" onChange={(e)=>{setWeight(e.target.value)}} value={weight} required/>

            <MenuItemFormSubmitBtn value="Upload"/>
        
        </form>
        <MenuItem data={{
            name,
            category,
            description,
            price,
            weight,
            imageUrl:file[0] && URL.createObjectURL(file[0]) || editData?.imageUrl  ||  noImageIMG
        }}/>
        </div>
    )
} 