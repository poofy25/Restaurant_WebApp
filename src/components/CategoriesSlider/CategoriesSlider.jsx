'use client'

import Link from "next/link";
import useSticky from '@/hooks/useSticky'

export default function CategoriesSlider ({categories}) {


    const data = categories  
    const {ref, isSticky} = useSticky()

    return (
        <div ref={ref}
        style={{background:isSticky ? "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(30,30,30,1) 50%)" : ""}}
        className="h-[80px] px-[7.5vw] py-4 mx-[-7.5vw] overflow-x-auto sticky top-0 z-10 gap-[1rem] flex flex-nowrap snap-x">

        {data.map((categoryData, index)=>{
            return (
              <Link style={{flex:"0 0 auto"}}
                className=" flex items-center justify-center rounded text-center
                bg-complimentary px-4 py-2 w-[calc(150px-0.5rem)] h-full box-border snap-center"
                key={index} href={`/#${categoryData.name}`}>{categoryData.name}</Link>
              )
            })
        }

        </div>
    )
}