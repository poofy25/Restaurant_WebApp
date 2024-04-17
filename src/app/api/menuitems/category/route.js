
import { NextResponse } from "next/server";
import connectToDB from '/src/utils/connectToDB.js'
import Category from "../../../../models/Category";


export const GET = async () => {
    try{
       
        await connectToDB()
        const categories = await Category.find({}).sort({ order: 1 })
        const data = categories
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

export const POST = async (request) => {
    try{
        await connectToDB()
        const data = await request.json()
        console.log('request:' , data)
        const createdCategory = await Category.create(data)
        console.log('REPONSE:' , data)
        
        return new NextResponse(JSON.stringify(createdCategory) , {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          })
    } catch (error) {
        return new NextResponse(JSON.stringify(error))
    }
}


