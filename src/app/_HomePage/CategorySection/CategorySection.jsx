'use server'

import navNextSVG from '/public/svgs/navNext.svg'


import Image from 'next/image'

import { GetMenuItemsCategory } from '@/app/actions/MenuItemsActions' 

import MenuItem from "@/components/MenuItem/MenuItem"
import CategorySlider from './CategorySlider'

async function getData (section) {
    const response = await GetMenuItemsCategory(section)
    return response
}


export default async function HomeCategorySection ({section , isPage}) {

    
    const data = await getData(section)


        return (
            <div className="flex flex-col w-full gap-2">
                {/* Header */}
                <div className="flex justify-between items-center px-[0.5rem] py-2 border-0 border-b border-solid border-primay-light">
                    <h2 className="">{section}</h2>
                    {
                    // Check if the component is rendered in a separate menu/category page and render conditionaly
                    !isPage && 
                    <a href={`/menu/${section}`} className='flex items-center gap-2 text-l'>Vezi Meniu {section} </a>
                    }
                </div>


                {/* Items */}
                <div className="flex flex-wrap">

                    
                    {!isPage ? 

                        // If the page isnt the category page then render the slider for desktops
                        <div className='hidden md:block h-full w-full'>
                            <CategorySlider data={data}/>
                        </div>
                        :

                        // If the page is the category page then render the items without the slider
                        <>
                            { 
                                data.map((data, index)=>{
                                    return(
                                        <MenuItem data={data} key={index}/>
                                    )
                                })
                            }
                        </>

                    }
                    
                    {!isPage && 

                        // If the page isnt the category page then render the items for mobile
                        <div className='flex flex-wrap w-full h-full md:hidden '>
                            { 
                                data.map((data, index)=>{
                                    return(
                                        <MenuItem data={data} key={index}/>
                                    )
                                })
                            }
                        </div>
                    }

                </div>
            </div>
        )

        
}