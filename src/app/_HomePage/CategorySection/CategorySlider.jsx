'use client'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import { useState } from 'react'

import MenuItem from '@/components/MenuItem/MenuItem'

import navLeftSVG from '/public/svgs/navLeft.svg'
import navRightSVG from '/public/svgs/navRight.svg'

import Image from 'next/image'

export default function CategorySliver ({data}) {

    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider(
      {
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
        slides: {
            perView: 4,
        },
        breakpoints: {
            "(min-width: 768px)": {
              slides: { perView: 4 },
            },
            "(min-width: 1024px)": {
              slides: { perView: 5 },
            },
          },
      },
    )
  
    return (
        <div className='relative w-full h-full'>
      <div ref={sliderRef} className="keen-slider relative">

        { 
            data.map((data, index)=>{
                return(
                        <MenuItem isSlider={true} data={data} key={index}/>
                )
            })
        } 


      
      </div>

      {loaded && instanceRef.current && instanceRef.current.track.details.slidesLength > 0 && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide === instanceRef.current.track.details.maxIdx
              }
            />
          </>
        )}


      </div>
    )
  }


  function Arrow(props) {
    const disabled = props.disabled ? " arrow--disabled" : ""
    return (

        <button onClick={props.onClick} disabled={props.disabled}
        className={` ${props.left ? 'left-0 translate-x-[-100%]' : 'right-0 translate-x-[100%]'}
        absolute p-0 h-full w-fit top-0
        bg-transparent hover:bg-transparent
        disabled:hidden
        `}
        >
        <Image className='invert'
         src={props.left ? navLeftSVG : navRightSVG} height='32' width='32' alt='Navigate'/>
        </button>
    //   <svg
    //     onClick={props.onClick}
    //     className={`arrow ${
    //       props.left ? "arrow--left" : "arrow--right"
    //     } ${disabled}`}
    //     xmlns="http://www.w3.org/2000/svg"
    //     viewBox="0 0 24 24"
    //   >
    //     {props.left && (
    //       <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
    //     )}
    //     {!props.left && (
    //       <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
    //     )}
    //   </svg>
    )
  }
  