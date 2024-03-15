import Image from "next/image"


export default async function AdminMenuItemsPage () {
    let data
    try{
    const response = await fetch(`${process.env.WEBSITE_URL}/api/menuitems` , { next: { revalidate: 60 } })
    const resData = await response.json()
    data = resData
    } catch (error) {
        throw new Error(error)
    }
    console.log(data , JSON.stringify(data))
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