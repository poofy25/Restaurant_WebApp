
"use server"
import connectToDB from "@/utils/connectToDB"
import PlacedOrder from "@/models/PlacedOrder"

import { revalidatePath } from "next/cache"

export async function getPlacedOrders () {
    try {
        await connectToDB()

        const PlacedOrders = await PlacedOrder.find({}).sort({ createdAt: -1 }).exec()


        return {ok:true , data:JSON.parse(JSON.stringify(PlacedOrders))}
    } catch (error) {
        console.error(error); // Log the error for debugging
        return { error: error.message || 'An error occurred getting the orders from database' }; // Return an error object with message
    }
}

export async function confirmOrder (order) {
    try {
        await connectToDB()

        const result = await PlacedOrder.updateOne( { _id: order._id } , {
            status:"pending"
        })

        console.log(result)
        revalidatePath("/admin/orders")
        return {ok:true , data:JSON.parse(JSON.stringify(result))}
    } catch (error) {
        console.error(error); // Log the error for debugging
        return { error: error.message || 'An error occurred during confirming order' }; // Return an error object with message
    }
}