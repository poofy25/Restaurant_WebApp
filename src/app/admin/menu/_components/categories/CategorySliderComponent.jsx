'use client'

import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import Image from 'next/image'
import DraggableSVG from '/public/svgs/draggable.svg'
import NavRightSVG from '/public/svgs/navRight.svg'


export default function CategorySliderComponent ({data , index , selectedCategory , setSelectedCategory}) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id:data});
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };

    return (
        <div className='p-2  box-border
        !bg-white w-full flex flex-row items-center noEffects text-black
        border-0 border-b border-solid border-primary-lighter 
        '
        ref={setNodeRef} style={style}  >
            <div {...attributes} {...listeners} className='p-0 opacity-50 relative w-[32px] h-[32px] noEffects cursor-pointer'>
              <Image src={DraggableSVG} className='object-cover' fill={true}/>
            </div>
            <div className={`mr-2 w-3 h-3 rounded-full ${data.active ? "bg-green-500" : "bg-gray-500"}`}></div>
            {data.name}
            <button onClick={()=>{setSelectedCategory(data)}} className='p-0 noEffects m-0 ml-auto flex items-center'>
              <Image src={NavRightSVG} width='24' height='24' />
            </button>
        </div>
    )
}