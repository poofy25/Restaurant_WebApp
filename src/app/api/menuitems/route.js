import { NextResponse } from "next/server";
import connectToDB from '/src/utils/connectToDB.js'
import MenuItem from "../../../models/MenuItem";


export const GET = async () => {
    try{
        await connectToDB()

        const menuItems = await MenuItem.find().sort({ createdAt: -1 });
        const data = menuItems
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
        const createdMenuItem = await MenuItem.create(data)
        return new NextResponse(JSON.stringify(createdMenuItem) , {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          })
    } catch (error) {
        return new NextResponse(JSON.stringify(error))
    }
}


