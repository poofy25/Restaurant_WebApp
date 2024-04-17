import Image from "next/image";
import styles from "./page.module.css";
import MenuItem from "@/components/MenuItem/MenuItem"

import HomeCategorySection from '@/app/_HomePage/CategorySection/CategorySection'
import HeroSection from '@/components/Hero/Hero'

async function GetCategories () {
  const response = await fetch(`${process.env.WEBSITE_URL}/api/menu/category` ,
  { next: { revalidate: 0 } })
  const responseJson = await response.json()
  return responseJson
}

export default async function Home() {
  const data = await GetCategories()
  console.log("ALL CATEGORIES : " , data)
  return (
    <main className='flex flex-wrap justify-start px-[7.5vw] gap-[3vw] sm:gap-0 bg-repeat'>
      {/* <HeroSection/> */}
      <div className="w-full flex flex-col gap-16">
      {data.map((categoryData)=>{
        if(categoryData.active) {
          return (
            <HomeCategorySection categoryData={categoryData}/>
            )
        }
      }
      )}
      {/* <HomeCategorySection section='Pizza'/>
      <HomeCategorySection section='Salate'/>
      <HomeCategorySection section='Supe'/>
      <HomeCategorySection section='Pasta & Risotto'/>
      <HomeCategorySection section='Fast Food'/> */}
      </div>

    </main>
  );
}
