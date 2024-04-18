
import { NextResponse } from "next/server";
import connectToDB from '/src/utils/connectToDB.js'
import Category from "@/models/Category";

export const GET = async (req , {params}) => {
    try{
       
        await connectToDB()
        const categories = await Category.find({}).sort({ order: 1 })
        const data = categories
        console.log("DATA: " , data)
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