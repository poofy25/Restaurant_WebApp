import { NextResponse } from "next/server"
import connectToDB from '@/utils/connectToDB.js'
import MenuItem from "@/models/MenuItem";


export const GET = async (req, {params}) => {
  try{

      await connectToDB()
      const category = params.category[0]
      const menuCategoryItems = await MenuItem.find({category:category})
      const data = menuCategoryItems

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