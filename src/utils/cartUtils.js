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

export function calculatePrice (items) {

    let delivery = 50
    let subtotal = 0
    let total = 0

    items.forEach((item) => {
        subtotal += item.price * item.quantity
    })

    if(subtotal >= 500) delivery = 0

    total = delivery + subtotal

    return {delivery , subtotal , total}

}
export function calculateItems (items) {
    let itemsCount = 0
        items.forEach((item) => {
            itemsCount += item.quantity
    })
    return itemsCount
}