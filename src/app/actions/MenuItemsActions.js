export async function GetMenuItemsCategory (category) {
    const response = await fetch(`${process.env.WEBSITE_URL}/api/menuitems/category/${category}` ,
     { next: { revalidate: 3600 } } )
    const responseJson = await response.json()
    console.log("RESPONSE : " , responseJson)
    return responseJson
}