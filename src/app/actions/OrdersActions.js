
"use server"
import connectToDB from "@/utils/connectToDB"
import PlacedOrder from "@/models/PlacedOrder"

import { revalidatePath } from "next/cache"

export async function getPlacedOrders () {
    try {
        await connectToDB()
        console.log("Placed Orders")
        const PlacedOrders = await PlacedOrder.find({status:"placed"}).sort({ createdAt: -1 }).exec()
        return {ok:true , data:JSON.parse(JSON.stringify(PlacedOrders))}
        
    } catch (error) {
        console.error(error); // Log the error for debugging
        return { error: error.message || 'An error occurred getting the orders from database' }; // Return an error object with message
    }
}

export async function getPendingOrders () {
    try {
        await connectToDB()
        console.log("Penidng Orders")
        const PlacedOrders = await PlacedOrder.find({status:"pending"}).sort({ createdAt: -1 }).exec()
        return {ok:true , data:JSON.parse(JSON.stringify(PlacedOrders))}
        
    } catch (error) {
        console.error(error); // Log the error for debugging
        return { error: error.message || 'An error occurred getting the orders from database' }; // Return an error object with message
    }
}

export async function getCompletedOrders () {
    try {
        await connectToDB()

        const PlacedOrders = await PlacedOrder.find({status:"completed"}).sort({ createdAt: -1 }).exec()
        return {ok:true , data:JSON.parse(JSON.stringify(PlacedOrders))}
        
    } catch (error) {
        console.error(error); // Log the error for debugging
        return { error: error.message || 'An error occurred getting the orders from database' }; // Return an error object with message
    }
}

export async function getDeniedOrders () {
    try {
        await connectToDB()

        const PlacedOrders = await PlacedOrder.find({status:"denied"}).sort({ createdAt: -1 }).exec()
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
        return {ok:true , data:JSON.parse(JSON.stringify(result))}
    } catch (error) {
        console.error(error); // Log the error for debugging
        return { error: error.message || 'An error occurred during confirming order' }; // Return an error object with message
    }
}

export async function completeOrder (order) {
    try {
        await connectToDB()

        const result = await PlacedOrder.updateOne( { _id: order._id } , {
            status:"completed"
        })

        console.log(result)
        return {ok:true , data:JSON.parse(JSON.stringify(result))}
    } catch (error) {
        console.error(error); // Log the error for debugging
        return { error: error.message || 'An error occurred during completing order' }; // Return an error object with message
    }
}

export async function denyOrder (order) {
    try {
        await connectToDB()

        const result = await PlacedOrder.updateOne( { _id: order._id } , {
            status:"denied"
        })

        console.log(result)
        return {ok:true , data:JSON.parse(JSON.stringify(result))}
    } catch (error) {
        console.error(error); // Log the error for debugging
        return { error: error.message || 'An error occurred during denying order' }; // Return an error object with message
    }
}