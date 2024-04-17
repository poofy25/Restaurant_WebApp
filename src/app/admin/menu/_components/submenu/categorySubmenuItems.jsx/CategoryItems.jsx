'use client'


import {
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
  } from '@dnd-kit/core';
  import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
  } from '@dnd-kit/sortable';
  import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
    restrictToParentElement
  } from '@dnd-kit/modifiers'

import CategoryItemDraggable from './CategoryItemDraggable'
import { UpdateCategoryItemsOrder } from '@/app/actions/MenuItemsActions';



import { useEffect, useState } from "react"

export default function CategoryItems ({selectedCategory}) {

    const [categoryItems , setCategoryItems] = useState([])
    const [isLoading, setLoading] = useState(true)
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    function handleDragEnd(event) {
        const {active, over} = event;
        if (active.id === over.id) return;
        if (active.id !== over.id) {
          setCategoryItems((currentArray) => {
            const oldIndex = currentArray.indexOf(active.id);
            const newIndex = currentArray.indexOf(over.id);
            
            return arrayMove(currentArray, oldIndex, newIndex);
          });
        }
    }

    useEffect(()=>{
        fetch(`/api/menu/category/getitems/${selectedCategory._id}`)
        .then((res) => res.json())
        .then((data) => {
            setLoading(false)
            setCategoryItems(data)
        })
    },[selectedCategory])

    useEffect(()=>{
        async function updateOrder () {
            if(categoryItems.length > 0) {
                const response = await UpdateCategoryItemsOrder(categoryItems)
                console.log(response)
            }
        }
        updateOrder()
    },[categoryItems])



    if (isLoading) return <p>Loading...</p>

    return (
        <div>

            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext 
                    items={categoryItems}
                    strategy={verticalListSortingStrategy}
                    modifiers={[restrictToParentElement , restrictToWindowEdges]}
                >
                    {categoryItems.map(data => <CategoryItemDraggable key={data.order} data={data} />)}
                </SortableContext>
            </DndContext>



        </div>
    )
}