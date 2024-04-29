'use client'

import './styles.scss'

import Link from "next/link";
import Image from "next/image";
import useSticky from '@/hooks/useSticky'
import BrushStrokeImg from '/public/imgs/brushStroke2.png' 

import { useEffect } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel'

import { FreeMode, Pagination , Mousewheel } from 'swiper/modules';


export default function CategoriesSlider ({categories}) {


    const data = categories  
    const {ref, isSticky} = useSticky()

    useEffect(()=>{
        if(isSticky){
        //     document.getElementById('navbar').classList.add("!fixed")
        // } else {
        //     document.getElementById('navbar').classList.remove("!fixed")
        }
    },[isSticky])


    return (
        // <div ref={ref}
        // style={{background:"url(/imgs/bgTexture.png) , linear-gradient(0deg, rgba(27,26,27,0.85) 0%, rgba(27,26,27,1) 25%)"}}
        // className= " px-[7.5vw] w-full py-4 mx-[-7.5vw] overflow-x-auto overflow-y-hidden sticky top-[79px] z-10 gap-[1rem] flex flex-nowrap  snap-x md:relative md:top-0 noScrollBar">
        
        

        //     {data.map((categoryData, index)=>{
        //         return (
        //             <Link style={{flex:"0 0 auto"}} scroll={true}
        //                 className=" flex items-center justify-center rounded text-center relative z-10
        //                 px-6 py-3 min-w-[calc(125px-0.5rem)] h-full box-border snap-center transition-all
        //                 hover:translate-y-[-0.5rem] imageDropShadow transform-gpu
        //                 sm:min-w-[calc(200px-0.5rem)]
        //                 "
        //                 key={index} href={`#${categoryData.name}`}>
        //                     <Image className=" -z-10 object-fill  filterToComplimentary" fill={true} src={BrushStrokeImg}/>
        //                     <p className="z-10 font-bold text-base">{categoryData.name}</p>
        //             </Link>
        //         )
        //         })
        //     }

        // <div style={{background:isSticky ? "linear-gradient(0deg, rgba(27,26,27,1) 0%, rgba(27,26,27,1) 70%)" : ""}} className="absolute w-full h-full left-0 top-[80px]"></div>
        // <div className={`${isSticky ? "textureBackground" : "" } absolute w-full h-full left-0 top-[80px]`}></div>


        // </div>

    <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        freeMode={true}
        mousewheel={true}
        modules={[FreeMode , Mousewheel]}
        className="mySwiper"
    >
        {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}

        {data.map((categoryData, index)=>{
                return (
                    <SwiperSlide key={index}>
                        <Link style={{flex:"0 0 auto"}} scroll={true}
                            className=" flex items-center justify-center rounded text-center relative z-10
                            px-6 py-3 min-w-[calc(125px-0.5rem)] h-full box-border snap-center transition-all
                            hover:translate-y-[-0.5rem] imageDropShadow transform-gpu
                            sm:min-w-[calc(200px-0.5rem)]
                            "
                            href={`#${categoryData.name}`}>
                                <Image className=" -z-10 object-fill  filterToComplimentary" fill={true} src={BrushStrokeImg}/>
                                <p className="z-10 font-bold text-base">{categoryData.name}</p>
                        </Link>
                    </SwiperSlide>
                )
        })
        }

    </Swiper>


    )
}