'use client'

import navNextSVG from '/public/svgs/navNext.svg'

import { useEffect , useState } from "react"

import Image from 'next/image'

import { GetMenuItemsCategory } from '@/app/actions/MenuItemsActions' 

import MenuItem from "@/components/MenuItem/MenuItem"


export default function HomeCategorySection ({section}) {

    const [data , setData] = useState([])
    
    useEffect(()=>{
        async function getData () {
            const response = await GetMenuItemsCategory(section)
            setData(response)
        }
        getData()
    },[])

    console.log("CATEGORY DATAL: " , data)
    if(data.length > 0) {
        return (
            <div className="flex flex-col w-full gap-4">
                {/* Header */}
                <div className="flex justify-between items-center px-[0.5rem] mt-2 border-0 border-b border-solid border-primay-light">
                    <h2 className="">{section}</h2>
                    <a href={`/menu/${section}`} className='flex items-center gap-2'>Vezi Meniu {section} </a>
                </div>



                <div className="flex flex-wrap gap-4 sm:gap-0">

                    {data.length > 0 && 
                        data.map((data, index)=>{
                            return(
                                <MenuItem data={data} key={index}/>
                            )
                        })
                    }

                </div>
            </div>
        )
    } else {
        return ('')
    }
        
}