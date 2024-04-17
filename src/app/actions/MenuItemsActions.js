'use server'
import Category from "../../models/Category"
import connectToDB from "@/utils/connectToDB"
import MenuItem from "@/models/MenuItem"


export async function UpdateCategoriesOrder (sortedArray) {

    try {
        await connectToDB()
        const updates = sortedArray.map(async (category , index) => {
            await Category.updateOne({ _id: category._id }, { $set: { order: index , active:category.active } });
        });
    
        await Promise.all(updates)
    
        return {ok:true , message:"Updated categories succesfully"}
    } catch (error) {
        return { error: error.message || 'An error occurred during checkout.' }; // Return an error object with message
    }
   
}


export async function UpdateCategoryItemsOrder (sortedArray) {

    try {
        await connectToDB()
        const updates = sortedArray.map(async (item , index) => {
            await MenuItem.updateOne({ _id: item._id }, { $set: {order: index} });
        });
    
        await Promise.all(updates)
    
        return {ok:true , message:"Updated category items succesfully"}
    } catch (error) {
        return { error: error.message || 'An error occurred during checkout.' }; // Return an error object with message
    }
   
}

export async function UpdateCategoryItemActiveStatus (menuItemId , activeStatus) {

    try {
        await connectToDB()
        await MenuItem.updateOne({ _id: menuItemId }, { $set: {active: activeStatus} });
    
        return {ok:true , message:"Updated category item active status succesfully"}
    } catch (error) {
        return { error: error.message || 'An error occurred during checkout.' }; // Return an error object with message
    }
   
}