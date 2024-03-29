"use server"
import connectToDB from "@/utils/connectToDB"
import PlacedOrder from "@/models/PlacedOrder"

export async function handleCheckout (formData) {
    try {
        await connectToDB()

        formData.status = "placed"
        const createdMenuItem = await PlacedOrder.create(formData)

        console.log(createdMenuItem)
        return {ok:true , data:JSON.parse(JSON.stringify(createdMenuItem))}
    } catch (error) {
        console.error(error); // Log the error for debugging
        return { error: error.message || 'An error occurred during checkout.' }; // Return an error object with message
    }
}