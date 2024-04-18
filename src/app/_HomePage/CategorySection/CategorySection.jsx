'use server'

import navNextSVG from '/public/svgs/navNext.svg'

import Image from 'next/image'

import MenuItem from "@/components/MenuItem/MenuItem"

import BrushStrokeImg from '/public/imgs/brushStroke.png' 

async function getData (categoryID) {
    const response = await fetch(`${process.env.WEBSITE_URL}/api/menu/category/getitems/${categoryID}` ,
    { cache: 'no-store' } )
    const responseJson = await response.json()

    const activeData = responseJson.filter(item => item.active === true);
    return activeData
}


export default async function HomeCategorySection ({categoryData , isPage}) {

    // Fetch items that belong to the category 
    const data = await getData(categoryData._id)

    console.log(data)

        if(data.length <= 0 ) return ''
        return (
            <div className="flex flex-col w-full gap-2">
                {/* Header */}
                <div className="flex justify-between items-center px-[0.5rem] py-2 border-0 border-solid border-primay-light relative">
                    <h2 className="w-full text-center">{categoryData.name}</h2>
                    <Image src={BrushStrokeImg} className='filterToComplimentary -z-10' fill={true}/>
                </div>


                {/* Items */}
                <div className="flex flex-wrap">

                    
  
                        {/* If the page is the category page then render the items without the slider */}
                            { data.length > 0 ?
                                data.map((data, index)=>{
                                        return(
                                            <MenuItem data={data} key={index}/>
                                        )
                                })
                                :
                                "There was an error"
                            }
                        
                    

                </div>
            </div>
        )

        
}