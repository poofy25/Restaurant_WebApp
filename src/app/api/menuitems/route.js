import { NextResponse } from "next/server";
import connectToDB from '/src/utils/connectToDB.js'
import MenuItem from "../../../models/MenuItem";

export const GET = async () => {
    try{
        await connectToDB()

        const menuItems = await MenuItem.find().sort({ createdAt: -1 });
        // const data = [{test:"Hiiiii"}]
        const data = menuItems
        const jsonData = JSON.stringify(data); // Stringify data

        return new NextResponse(jsonData, {
            status: 200,
            headers: {
              'Content-Type': 'application/json', // Set content type
            },
          });
        
    } catch (error) {
        return new NextResponse("Error fetching data" + error)
    }
}

export const POST = async (request) => {
    try{
        await connectToDB()
        const data = await request.json()
        const createdMenuItem = await MenuItem.create(data)
        return new NextResponse(createdMenuItem , data)
    } catch (error) {
        return new NextResponse("Error posting data" + error)
    }
}

