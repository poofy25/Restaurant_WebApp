'use server'

import navNextSVG from '/public/svgs/navNext.svg'


import Image from 'next/image'

import { GetMenuItemsCategory } from '@/app/actions/MenuItemsActions' 

import MenuItem from "@/components/MenuItem/MenuItem"

async function getData (section) {
    const response = await GetMenuItemsCategory(section)
    return response
}


export default async function HomeCategorySection ({section}) {

    
    const data = await getData(section)


        return (
            <div className="flex flex-col w-full gap-4">
                {/* Header */}
                <div className="flex justify-between items-center px-[0.5rem] py-2 mt-2 border-0 border-b border-solid border-primay-light">
                    <h2 className="">{section}</h2>
                    <a href={`/menu/${section}`} className='flex items-center gap-2 text-l'>Vezi Meniu {section} </a>
                </div>


                {/* Items */}
                <div className="flex flex-wrap gap-4 sm:gap-0">

                    { 
                        data.map((data, index)=>{
                            return(
                                <MenuItem data={data} key={index}/>
                            )
                        })
                    }

                </div>
            </div>
        )

        
}