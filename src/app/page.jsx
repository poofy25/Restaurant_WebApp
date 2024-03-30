import Image from "next/image";
import styles from "./page.module.css";
import MenuItem from "@/components/MenuItem/MenuItem"

async function GetMenuItems () {
  const response = await fetch(`${process.env.WEBSITE_URL}/api/menuitems` , { next: { revalidate: 300 } } )
  const responseJson = await response.json()
  console.log("RESPONSE : " , responseJson)
  return responseJson
}

export default async function Home() {
  const data = await GetMenuItems()
  return (
    <main className={styles.main}>
      {data?.length > 0 ? <>
      {data.map((item , index) => {
        return (
          <MenuItem data={item} key={index}/>
        )
      })}
      </>
      : "Error"
    }
    </main>
  );
}
