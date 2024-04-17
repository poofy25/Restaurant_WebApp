import { NextResponse } from "next/server"
import connectToDB from '@/utils/connectToDB.js'
import Category from "@/models/Category";
import MenuItem from "@/models/MenuItem";
import mongoose from "mongoose";



export const GET = async (req, {params}) => {
    try{
        await connectToDB()
        const categoryId = params.id[0]
        const categoryItems = await MenuItem.find({category:categoryId}).sort({order:1})
        const data = categoryItems

        const jsonData = JSON.stringify(data);
  
        return new NextResponse(jsonData, {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        
    } catch (error) {
        return new NextResponse(JSON.stringify(error))
    }
  }