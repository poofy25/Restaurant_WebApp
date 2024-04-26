'use client'

import Link from "next/link";
import Image from "next/image";
import useSticky from '@/hooks/useSticky'
import BrushStrokeImg from '/public/imgs/brushStroke.png' 



export default function CategoriesSlider ({categories}) {


    const data = categories  
    const {ref, isSticky} = useSticky()

    return (
        <div ref={ref}
        style={{background:isSticky ? "url(/imgs/bgTexture.png) , linear-gradient(0deg, rgba(27,26,27,0.85) 0%, rgba(27,26,27,1) 25%)" : ""}}
        className= "h-auto px-[7.5vw] w-full py-4 mx-[-7.5vw] overflow-x-auto sticky top-0 z-10 gap-[1rem] flex flex-nowrap snap-x noScrollBar">
        
        

            {data.map((categoryData, index)=>{
                return (
                    <Link style={{flex:"0 0 auto"}} scroll={true}
                        className=" flex items-center justify-center rounded text-center relative overflow-hidden z-10
                        px-4 py-2 min-w-[calc(180px-0.5rem)] h-full box-border snap-center
                        font-semibold  sm:min-w-[calc(180px-0.5rem)]
                        "
                        key={index} href={`#${categoryData.name}`}>
                            <Image className=" -z-10 filterToComplimentary" fill={true} src={BrushStrokeImg}/>
                            <p className="z-10 font-bold text-xl">{categoryData.name}</p>
                    </Link>
                )
                })
            }

        <div style={{background:isSticky ? "linear-gradient(0deg, rgba(27,26,27,1) 0%, rgba(27,26,27,1) 70%)" : ""}} className="absolute w-max h-full left-0 top-0"></div>
        <div className={`${isSticky ? "textureBackground" : "" } absolute w-max h-full left-0 top-0`}></div>


        </div>
    )
}