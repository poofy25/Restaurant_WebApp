import Image from "next/image";
import styles from "./page.module.css";

async function GetMenuItems () {
  const response = await fetch(`${process.env.WEBSITE_URL}/api/menuitems` , { next: { revalidate: 300 } } )
  return await response.json()
}

export default async function Home() {
  const data = await GetMenuItems()
  console.log(data)
  return (
    <main className={styles.main}>
      
    </main>
  );
}
