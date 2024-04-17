import { NextResponse } from "next/server"
import connectToDB from '@/utils/connectToDB.js'
import MenuItem from "@/models/MenuItem";
import Category from "../../../../../models/Category";



export const GET = async (req, {params}) => {
  try{
      await connectToDB()
      const categoryId = params.category[0]

      const categoryFromDb = await Category.find({_id:categoryId})
      const data = categoryFromDb
      if(data.length === 0){
        throw new Error('Not a valid category')
      }
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

export const PUT = async (request, {params}) => {
  try{
      await connectToDB()
      const categoryID = params.category[0]

      const { name, order } = await request.json();

      const updatedCategory = await Category.findByIdAndUpdate(
        categoryID,
        { name, order },
        { new: true } // Return the updated document
      );

      if (!updatedCategory) {
        throw new Error("Category not found")
      }                

      return new NextResponse(JSON.stringify(updatedCategory))
      
  } catch (error) {
      return new NextResponse(error)
  }
}


export const DELETE = async (request) => {
  
  try{
      const data = await request.json()
      await connectToDB()

      //Still need to delete all items related to the category after deleting the cateogry
          const response = await Category.deleteOne({_id:data.id});
          if (response.deletedCount === 1) {
              return new NextResponse(JSON.stringify("Category deleted successfully"))
          } else {
              return new NextResponse(JSON.stringify({error:"Failed to delete from Database"}))
          }
      
  } catch (error) {
      return new NextResponse(JSON.stringify(error))
  }
}