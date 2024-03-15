import Image from "next/image"


export default async function AdminMenuItemsPage () {
    const response = await fetch("http://localhost:3000/api/menuitems" , { next: { revalidate: 60 } })
    const data = await response.json()
    console.log(data)
    return (
        <menu>
            Menu Items
            {data.map(item => {
                return (
                    <>
                    <Image src={item.imageUrl} width="100" height="100"/>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <h4>{item.price}</h4>
                    <h5>{item.weight}</h5>
                    </>
                )
            })}
        </menu>
    )
}