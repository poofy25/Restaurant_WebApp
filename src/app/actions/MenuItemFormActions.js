"use server"
import path from 'path'
import fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import os from 'os'

import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

async function savePhotosToLocal(formData){
    const files = formData.getAll('files')

    const multipleBuffersPromise = files.map(file => {
        return file.arrayBuffer()
                    .then(data => {
                        const buffer = Buffer.from(data)
                        const name = uuidv4()
                        const ext = file.type.split("/")[1]
                        const tmpdir = os.tmpdir()
                        const uploadDir = path.join(tmpdir, `/${name}.${ext}`)

                        fs.writeFile(uploadDir, buffer)

                        return { filepath: uploadDir , filename: name }
                    })
    })
    return await Promise.all(multipleBuffersPromise)
}

async function uploadPhotoToCloudinary(newFiles) {
    const multiplePhotosPromise = newFiles.map(file => {
       return cloudinary.v2.uploader.upload(file.filepath , { folder: 'Restaurant_Menu_Items' })
    })
    return await Promise.all(multiplePhotosPromise)
}

export async function uploadPhoto (formData) {
    try {

        //Save photos to local temp folder
        const newFiles = await savePhotosToLocal(formData)

        //Upload photos to Cloudinary
        const photos = await uploadPhotoToCloudinary(newFiles)
        const photoUrl = `/${photos[0].public_id}.${photos[0].format}`
        // Delete photo files from temp folder after successful upload
        newFiles.map(file => fs.unlink(file.filepath))

        return { photoUrl : photoUrl}

    } catch (error) {
        return { error : error }
    }
}

export async function getAllPhotos () {
    try {

        const result = await cloudinary.v2.search.expression(
            'folder:Restaurant_Menu_Items/*'
        ).sort_by('created_at', 'desc').execute()

        return result
    } catch (error) {
        return { error : error }
    }
}

export async function deletePhoto (public_id) {
    try {

        await cloudinary.v2.uploader.destroy(public_id)

        return { message : "Deleted successfully from cloudinary "}
        
        return result
    } catch (error) {
        return { error : error }
    }
}

