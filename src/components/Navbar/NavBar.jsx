'use client'
import styles from './navBar.module.scss'

import { useEffect, useState , useRef } from "react"

import Image from "next/image"
import Link from "next/link"

import { useCartContext } from "@/hooks/useCartContext"

import roundBrushStroke from '/public/imgs/roundBrushStroke.png'
import logoImg from '/public/imgs/logo_cropped.png'
import CartSvg from '/public/svgs/cart.svg'

import NavBarMenu from './NavBarMenu'

export default function NavBar () {

    const {items , dispatch} = useCartContext()
    const [isMenuOpen , setIsMenuOpen] = useState(false)



    return (
        <nav id='navbar'
        className={` navBar
        flex flex-row items-center w-full h-[80px] overflow-hidden px-[7.5vw]
        justify-between box-border sticky top-0 z-40  transition-all
        `}
        style={{background: "url(/imgs/bgTexture.png) , linear-gradient(0deg, rgba(27,26,27,1) 0%, rgba(10,10,10,1) 100%)"}}
        >


            {/* Navbar menu */}
            <NavBarMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
            {/* Hamburger button */}
            <div className="relative h-full flex flex-col justify-center items-center sm:hidden ">

                <button onClick={()=>setIsMenuOpen(current=>!current)}
                className="relative w-[30px] h-[22px] p-0 bg-transparent hover:bg-transparent">


                    <div className={`w-full h-[3px] absolute top-0 left-0 bg-white rounded transition-all
                    ${isMenuOpen ? "rotate-45 translate-y-[10px]" : ""}
                    `}></div>
                    <div className={`w-full h-[3px] absolute left-0 translate-y-[-50%] bg-white rounded transition-all
                    ${isMenuOpen ? "translate-x-[-100px]" : ""}
                
                    `}></div>
                    <div className={`w-full h-[3px] absolute bottom-0 left-0 bg-white rounded transition-all
                    ${isMenuOpen ? "-rotate-45 translate-y-[-9px]" : ""}
                    `}></div>
                </button>
            </div>


            {/* Logo */}
            <div onClick={()=>setIsMenuOpen(false)} className="relative h-full flex flex-col justify-center items-center">
                <Link href='/' className="relative aspect-square h-[75%] flex">
                    <Image layout='fill' objectFit='contain' src={logoImg} priority={true}/>
                </Link>
            </div>

            {/* Nav buttons */}
            <div className="hidden ml-auto font-semibold gap-8 [&_*]:py-4 sm:flex">
                <Link href='/menu' className='hover:text-complimentary transition-all'>Menu</Link>
                {/* <Link href='/servicii'>Servicii</Link> */}
                <Link href='/menu-local' className='hover:text-complimentary transition-all'>Meniu in sala</Link>
                <Link href='/cariera' className='hover:text-complimentary transition-all'>Cariera</Link>
                <Link href='/contacte' className='hover:text-complimentary transition-all'>Contacte</Link>
            </div>

            {/* Phone Number */}
            <div className="hidden font-semibold sm:flex ml-auto mr-8">
                <Link href='tel:000000' className='hover:text-complimentary transition-all'>060951364</Link>
            </div>


            {/* Cart */}
            <div onClick={()=>setIsMenuOpen(false)}  className="relative h-full flex flex-col justify-center items-center">

                <Link href='/cart' className={`relative aspect-square h-[40%] flex`}>
                {items.length > 0 &&
                    <div
                    className="absolute w-[20px] h-[20px] bg-white rounded-full right-[-6px] top-[-6px] z-[1] flex items-center justify-center text-complimentary font-bold "
                    >{items.length}</div>
                }
                    <Image className='absolute left-[-50%] top-[-50%] w-[200%] h-[200%] filterToComplimentary '  src={roundBrushStroke} width='128' height='128'/>

                    <Image layout='fill' className='invert' objectFit='contain' src={CartSvg} priority={true}/>
                </Link>
            </div>
        </nav>
    )
}