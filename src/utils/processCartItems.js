
export function checkForIndex (ArrayToCheck , ID) {
    let index = null 
    ArrayToCheck.forEach((value , i) => {
        if(value._id === ID) {
            // Return the index of the first found value
            if(!index) index = i
        }
    })
    return index
}

export function processCartItems(cartItems) {
    const processedCartItems = []; 

    // cloning cart items to avoid saving changes to local storage
    const clonedCartItems = JSON.parse(JSON.stringify(cartItems))

    clonedCartItems.map((item) => {
        // Check if item is already in the processedCartItems array
        const itemExists = checkForIndex(processedCartItems , item._id)
        // If not add a quantity propriety and push it to the array 
        if(itemExists === null) {
            item.quantity = 1
            processedCartItems.push(item)
        }
        // If yes just increment the quantity propriety
        if(itemExists !== null) {
            processedCartItems[itemExists].quantity += 1
    } 
    });
    return processedCartItems
}