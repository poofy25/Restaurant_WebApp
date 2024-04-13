import Image from "next/image";
import styles from "./page.module.css";
import MenuItem from "@/components/MenuItem/MenuItem"

import HomeCategorySection from '@/app/_HomePage/CategorySection/CategorySection'
import HeroSection from '@/components/Hero/Hero'

async function GetMenuItems () {
  const response = await fetch(`${process.env.WEBSITE_URL}/api/menuitems` , { next: { revalidate: 300 } } )
  const responseJson = await response.json()
  return responseJson
}

export default async function Home() {
  const data = await GetMenuItems()
  return (
    <main className='flex flex-wrap justify-start px-[7.5vw] gap-[3vw] sm:gap-0 bg-repeat'>
      {/* <HeroSection/> */}


      <div className="w-full flex flex-col gap-16">
      <HomeCategorySection section='Pizza'/>
      <HomeCategorySection section='Salate'/>
      <HomeCategorySection section='Supe'/>
      <HomeCategorySection section='Snacks-uri'/>
      </div>

    </main>
  );
}
