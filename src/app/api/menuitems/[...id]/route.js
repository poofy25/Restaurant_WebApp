import { NextResponse } from "next/server"
import { deletePhoto } from "@/app/actions/MenuItemFormActions";
import connectToDB from '@/utils/connectToDB.js'
import MenuItem from "@/models/MenuItem";


export const GET = async (req, {params}) => {
    try{
        await connectToDB()
        const id = params.id[0]
        const menuItems = await MenuItem.find({_id:id})
        const data = menuItems
        const jsonData = JSON.stringify(data);

        return new NextResponse(jsonData, {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        
    } catch (error) {
        return new NextResponse(error)
    }
}

export const DELETE = async (request) => {
  
    try{
        const data = await request.json()
        await connectToDB()
        const deletePhotoRes = await deletePhoto(data.imageId)
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