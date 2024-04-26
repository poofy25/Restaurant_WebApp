'use server'
import MenuItem from "@/models/MenuItem"
import Category from "../../models/Category"
import connectToDB from "@/utils/connectToDB"


export async function getCategoryFromName (name) {
    try {
        await connectToDB()
        console.log(name)
        const category = await Category.find({name: name});

        if(!category || category.length === 0 ) {
            throw new Error('No category found')
        }
        console.log("CAtegory from database: " , category)
    
        return category[0]
    } catch (error) {
        return { error: error.message || 'An error occurred during checkout.' }; // Return an error object with message
    }
}
