'use client'

import Link from "next/link"
import Image from "next/image"
import BrushStrokeImg from '/public/imgs/brushStroke2.png' 
import Logo from '/public/imgs/logo_placeholder.png'

import { useEffect } from "react"

export default function HeroSection () {


    useEffect(()=>{
        const ref = document.getElementById('navbar')
        ref.classList.add('lightNavBarBackground')
        const handleScroll = (event) => {
            console.log('scroll')
            if(window.innerHeight - window.scrollY <= 0){
            console.log('scroll1')

                ref.classList.remove('lightNavBarBackground')
            } else {
                ref.classList.add('lightNavBarBackground')
            }
        }
        window.addEventListener('scroll', handleScroll);
        return ()=>{
            ref.classList.remove('lightNavBarBackground')
            window.removeEventListener('scroll', handleScroll);
        }
    },[])


    return (
        <div 
        // style={{background:"url(/imgs/hero.jpg)"}}
        className="flex flex-col z-[39] items-center justify-center  relative h-[calc(100vh-80px)] top-0 w-[calc(100vw-(100vw-100%)] box-border pb-[80px]  mx-[-7.5vw]">
            <div className="absolute w-full h-[100vh] -z-10 left-0 top-[-80px] bg-[url(/imgs/hero1.jpg)] md:bg-[url(/imgs/hero2.jpg)] !bg-cover !bg-center"></div>
            <div className="w-[50%] h-[50vw] max-h-[300px] relative">
                <Image className="object-cover"  src={Logo} fill={true} loading="eager"/>
            </div>
            <Link href='/#Pizza' className="flex justify-between mb-4 items-center w-[50%] px-8 py-3 border-0 border-solid border-primay-light relative imageDropShadow transform-gpu">
                <h3 className="w-full text-center text-2xl">Meniu</h3>
                <Image src={BrushStrokeImg} className='filterToComplimentary -z-10' fill={true}/>
            </Link>
            <Link href='/#Pizza' className="flex justify-between items-center w-[50%] px-8 py-3 border-0 border-solid border-primay-light relative imageDropShadow transform-gpu">
                <h3 className="w-full text-center text-complimentary text-2xl">Pizza</h3>
                <Image src={BrushStrokeImg} className='grayscale invert -z-10' fill={true}/>
            </Link>
            <Image className="w-[50%] h-auto opacity-0 " src={Logo} width='500' height='500'/>

            <div className="absolute w-full h-[100vh] left-0 top-[-80px] bg-[rgba(0,0,0,0.25)] -z-10"></div>
            {/* <Link href='/menu-local' className="flex justify-between items-center px-8 py-3 border-0 border-solid border-primay-light relative imageDropShadow transform-gpu">
                <h3 className="w-full text-center text-2xl">Meniu în sală</h3>
                <Image src={BrushStrokeImg} className='filterToComplimentary -z-10' fill={true}/>
            </Link> */}
        </div>
    )
}