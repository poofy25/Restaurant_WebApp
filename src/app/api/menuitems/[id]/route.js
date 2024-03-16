import { NextResponse } from "next/server"
import { deletePhoto } from "@/app/actions/MenuItemFormActions";
import connectToDB from '@/utils/connectToDB.js'
import MenuItem from "@/models/MenuItem";

export const DELETE = async (request) => {
    try{
        const data = await request.json()
        await connectToDB()
        console.log("DATA : " , data)
        const deletePhotoRes = await deletePhoto(data.imageId)
        console.log("delete PHOTO RES : " , deletePhotoRes)
        if (deletePhotoRes.ok) {
            const dbRes = await MenuItem.deleteOne({_id:data.id});
            if (dbRes.deletedCount === 1) {
                return new NextResponse(JSON.stringify("Item deleted successfully"))
            } else {
                return new NextResponse(JSON.stringify({error:"Failed to delete from Database"}))
            }
        } else {
            return new NextResponse(JSON.stringify({error:"Failed to delete from Cloud"}))
        }
    } catch (error) {
        return new NextResponse(JSON.stringify(error))
    }
}