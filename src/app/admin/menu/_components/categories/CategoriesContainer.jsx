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

  import CategorySliderComponent from './CategorySliderComponent'

  import { useState , useEffect} from 'react';

  import { UpdateCategoriesOrder } from '../../../../actions/MenuItemsActions';


export default function CategoriesContainer ({categoriesData , setCategoriesData , selectedCategory , setSelectedCategory }) {

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
          setCategoriesData((currentArray) => {
            const oldIndex = currentArray.indexOf(active.id);
            const newIndex = currentArray.indexOf(over.id);
            
            return arrayMove(currentArray, oldIndex, newIndex);
          });
        }
    }

    useEffect(()=>{
      fetch('/api/menu/getAllCategories/placeholder')
      .then((res) => res.json())
      .then((data) => {
        setCategoriesData(data)
        setLoading(false)
      })
    },[])

    useEffect(()=>{
        async function update () {
            if(categoriesData.length > 0) {
                const response = await UpdateCategoriesOrder(categoriesData)
                console.log(response)
             }
        }
        update()
        console.log(categoriesData)
    },[categoriesData])
    if (isLoading) return <p>Loading...</p>

    return (


            <div className='flex flex-col'>

            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext 
                    items={categoriesData}
                    strategy={verticalListSortingStrategy}
                    modifiers={[restrictToParentElement , restrictToWindowEdges]}
                >
                    {categoriesData.map(data => <CategorySliderComponent key={data.order} data={data} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />)}
                </SortableContext>
            </DndContext>

            </div>

    )
}