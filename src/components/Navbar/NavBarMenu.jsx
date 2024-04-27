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
            w-full h-full fixed left-0 z-50 transition-all
            bg-[rgba(0,0,0,0.5)] 
            flex sm:hidden
        `}>

            {/* Content */}
            <div className="w-full h-full bg-primary z-50 textureBackground">

                {/* Nav menu */}
                {/* <div className="w-full h-[80px] flex  justify-start items-center box-border pl-[7.5vw]">
                    <button onClick={()=>setIsMenuOpen(current=>!current)}
                    className="relative w-[32px] h-[24px] p-0 bg-transparent hover:bg-transparent">

                        <div className="w-full h-[2px] absolute top-0 left-0 bg-white rounded"></div>
                        <div className="w-full h-[2px] absolute left-0 bg-white rounded"></div>
                        <div className="w-full h-[2px] absolute bottom-0 left-0 bg-white rounded"></div>
                    </button>
                </div> */}

                {/* Links */}
                <div className=" box-border text-2xl
                flex flex-col justify-center gap-6 mt-4
                ">   
                    <Link href='/menu' className="flex justify-between items-center px-[0.5rem] py-3 border-0 border-solid border-primay-light relative imageDropShadow transform-gpu">
                        <h3 className="w-full text-center text-2xl">Meniu</h3>
                        <Image src={BrushStrokeImg} className='filterToComplimentary -z-10' fill={true}/>
                    </Link>
                    <Link href='/menu-local' className="flex justify-between items-center px-[0.5rem] py-3 border-0 border-solid border-primay-light relative imageDropShadow transform-gpu">
                        <h3 className="w-full text-center text-2xl">Meniu în sală</h3>
                        <Image src={BrushStrokeImg} className='filterToComplimentary -z-10' fill={true}/>
                    </Link>
                    <Link href='/cariera' className="flex justify-between items-center px-[0.5rem] py-3 border-0 border-solid border-primay-light relative imageDropShadow transform-gpu">
                        <h3 className="w-full text-center text-2xl">Carieră</h3>
                        <Image src={BrushStrokeImg} className='filterToComplimentary -z-10' fill={true}/>
                    </Link>
                    <Link href='/contacte' className="flex justify-between items-center px-[0.5rem] py-3 border-0 border-solid border-primay-light relative imageDropShadow transform-gpu">
                        <h3 className="w-full text-center text-2xl">Contacte</h3>
                        <Image src={BrushStrokeImg} className='filterToComplimentary -z-10' fill={true}/>
                    </Link>
                </div>

            </div>

        </div>
    )
}