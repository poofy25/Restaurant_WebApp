

import MenuItemAdmin from "../_components/MenuItemAdmin/MenuItemAdmin"

async function GetMenuItems () {
    const response = await fetch(`${process.env.WEBSITE_URL}/api/menuitems` , { next: { revalidate: 60 } } )
    return await response.json()
}


export default async function AdminMenuItemsPage () {
    
    const data = await GetMenuItems()
    console.log("ADMIN MENU ITEMS PAGE : " , data)
   
    return (
        <main style={{display:"flex" , flexWrap:"wrap" , padding:"1rem" , justifyContent:"center"}}>
           <h1 style={{width:"100%" , textAlign:"center"}}>MENU ITEMS</h1>
            {data.map((item , index) => {
                return (
                    <MenuItemAdmin data={item} key={index}/>
                )
            })}
        </main>
    )
}