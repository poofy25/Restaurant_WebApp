'use server'

import navNextSVG from '/public/svgs/navNext.svg'


import Image from 'next/image'

import { GetMenuItemsCategory } from '@/app/actions/MenuItemsActions' 

import MenuItem from "@/components/MenuItem/MenuItem"
import CategorySlider from './CategorySlider'

import BrushStrokeImg from '/public/imgs/brushStroke.png' 

async function getData (section) {
    const response = await GetMenuItemsCategory(section)
    return response
}


export default async function HomeCategorySection ({section , isPage}) {

    
    const data = await getData(section)


        return (
            <div className="flex flex-col w-full gap-2">
                {/* Header */}
                <div className="flex justify-between items-center px-[0.5rem] py-2 border-0 border-solid border-primay-light relative">
                    <h2 className="w-full text-center">{section}</h2>
                    <Image src={BrushStrokeImg} className='filterToComplimentary -z-10' fill={true}/>
                </div>


                {/* Items */}
                <div className="flex flex-wrap">

                    
  
                        {/* If the page is the category page then render the items without the slider */}
                            { 
                                data.map((data, index)=>{
                                    return(
                                        <MenuItem data={data} key={index}/>
                                    )
                                })
                            }
                    
                    
                    {/* {!isPage && 

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
                    } */}

                </div>
            </div>
        )

        
}