'use client'

import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import {
  restrictToParentElement, restrictToWindowEdges
} from '@dnd-kit/modifiers'

import Image from 'next/image'
import DraggableSVG from '/public/svgs/draggable.svg'
import NavRightSVG from '/public/svgs/navRight.svg'

import { UpdateCategoryItemActiveStatus } from '@/app/actions/MenuItemsActions';
import { useState } from 'react';


export default function CategoryItemDraggable ({data}) {

    const [isActive , setIsActive] = useState(data.active)

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


    const handleChangeActiveState = async (e) => {
      const value = e.target.checked
      setIsActive(value)
      const response = await UpdateCategoryItemActiveStatus(data._id , value)
      console.log(response)
    }

    return (
        <div className='p-2  box-border
        !bg-white w-full flex flex-row items-center noEffects text-black
        border-0 border-b border-solid border-primary-lighter 
        '
        ref={setNodeRef} style={style}  >
            <div {...attributes} {...listeners} className='p-0 opacity-50 relative w-[32px] h-[32px] noEffects cursor-pointer'>
              <Image src={DraggableSVG} className='object-cover' fill={true}/>
            </div>

            <label className="inline-flex items-center cursor-pointer ml-4 mr-2">
                    <input type="checkbox"   className="sr-only peer" onChange={handleChangeActiveState} checked={isActive}/>
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <p className='min-w-[200px]'>{data.name}</p>
            <p className='font-semibold'>MDL {data.price}</p>
        </div>
    )
}