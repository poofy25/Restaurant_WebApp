import MenuItemForm from "../../_components/menuItemForm/MenuItemForm";


async function GetMenuItem (id) {
  const response = await fetch(`${process.env.WEBSITE_URL}/api/menuitems/${id}` , { next: { revalidate: 60 } } )
  return await response.json()
}


export default async function AdminEditId({params}) {
  const data = await GetMenuItem(params.id)
  return (
    <main>
      <MenuItemForm data={data[0]}/>
    </main>
  );
}
