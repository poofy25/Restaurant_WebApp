
"use server"
import connectToDB from "@/utils/connectToDB"
import PlacedOrder from "@/models/PlacedOrder"

export async function getPlacedOrders () {
    try {
        await connectToDB()

        const PlacedOrders = await PlacedOrder.find({status:'placed'}).sort({ createdAt: -1 }).exec()


        return {ok:true , data:JSON.parse(JSON.stringify(PlacedOrders))}
    } catch (error) {
        console.error(error); // Log the error for debugging
        return { error: error.message || 'An error occurred during checkout.' }; // Return an error object with message
      }
}