import { NextResponse } from "next/server";
import connectToDB from '/src/utils/connectToDB.js'
import MenuItem from "../../../models/MenuItem";


export const GET = async (request) => {
    try{
        await connectToDB()

        const menuItems = await MenuItem.find()
        return new NextResponse(menuItems)
    } catch (error) {
        return new NextResponse("Error fetching data" + error)
    }
}

export const POST = async (request) => {
    try{
        await connectToDB()
        const data = await request.json()
        const createdMenuItem = await MenuItem.create(data)

        return new NextResponse(createdMenuItem)
    } catch (error) {
        return new NextResponse("Error posting data" + error)
    }
}

