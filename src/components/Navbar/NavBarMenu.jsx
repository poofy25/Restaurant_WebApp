'use client'
import styles from './navBar.module.scss'

import Link from "next/link"
import BrushStrokeImg from '/public/imgs/brushStroke2.png' 
import Image from 'next/image'


export default function NavBarMenu ({isMenuOpen , setIsMenuOpen}) {
    return (
        <div 
        onClick={(e)=>{if(e.target === e.currentTarget) setIsMenuOpen(false)}}
        className={`
            ${isMenuOpen ? 'top-[80px] no-doc-scroll' : 'top-[-100%]'}
            w-full h-full fixed left-0 -z-30 transition-all
            bg-[rgba(0,0,0,0.5)] 
            flex sm:hidden
        `}>

            {/* Content */}
            <div className="flex flex-col justify-start items-center w-full h-full bg-primary z-20 textureBackground">

                {/* Background Image */}
                <div className="absolute w-full h-[100vh] -z-10 left-0 top-[-80px] bg-[url(/imgs/hero1.jpg)] md:bg-[url(/imgs/hero2.jpg)] !bg-cover !bg-center"></div>
                <div className="absolute w-full h-[80px] z-10 left-0 top-[-80px] lightNavBarBackground "></div>


                {/* Links */}
                <div className=" text-2xl w-full h-full
                flex flex-col justify-start items-center gap-6  pt-[160px] box-border
                ">   
                    <Link href='/menu' className="flex justify-between items-center w-[75%] px-[0.5rem] py-3 border-0 border-solid border-primay-light relative imageDropShadow transform-gpu">
                        <h3 className="w-full text-center text-2xl">Meniu</h3>
                        <Image src={BrushStrokeImg} className='filterToComplimentary -z-10' fill={true}/>
                    </Link>
                    <Link href='/menu-local' className="flex justify-between items-center w-[75%] px-[0.5rem] py-3 border-0 border-solid border-primay-light relative imageDropShadow transform-gpu">
                        <h3 className="w-full text-center text-2xl">Meniu în sală</h3>
                        <Image src={BrushStrokeImg} className='filterToComplimentary -z-10' fill={true}/>
                    </Link>
                    <Link href='/cariera' className="flex justify-between items-center w-[75%] px-[0.5rem] py-3 border-0 border-solid border-primay-light relative imageDropShadow transform-gpu">
                        <h3 className="w-full text-center text-2xl">Carieră</h3>
                        <Image src={BrushStrokeImg} className='filterToComplimentary -z-10' fill={true}/>
                    </Link>
                    <Link href='/contacte' className="flex justify-between items-center w-[75%] px-[0.5rem] py-3 border-0 border-solid border-primay-light relative imageDropShadow transform-gpu">
                        <h3 className="w-full text-center text-2xl">Contacte</h3>
                        <Image src={BrushStrokeImg} className='filterToComplimentary -z-10' fill={true}/>
                    </Link>
                </div>

            </div>

        </div>
    )
}