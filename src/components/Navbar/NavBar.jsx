'use client'
import styles from './navBar.module.scss'

import { useEffect, useState , useRef } from "react"

import Image from "next/image"
import Link from "next/link"

import { useCartContext } from "@/hooks/useCartContext"

import NoImage from '/public/imgs/no-image.jpg'
import LogoPlaceHolder from '/public/imgs/logo_placeholder.png'
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
        ${isMenuOpen ? 'bg-[url(/imgs/bgTexture.png),linear-gradient(0deg, rgba(27,26,27,1) 0%, rgba(10,10,10,1) 100%)]' : ''}
        `}
        style={{background: "url(/imgs/bgTexture.png) , linear-gradient(0deg, rgba(27,26,27,1) 0%, rgba(10,10,10,1) 100%)"}}
        >


            {/* Navbar menu */}
            <NavBarMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
            {/* Hamburger button */}
            <div className="relative h-full flex flex-col justify-center items-center sm:hidden ">
                <button onClick={()=>setIsMenuOpen(current=>!current)}
                className="relative w-[32px] h-[24px] p-0 bg-transparent hover:bg-transparent">
                    <div className="w-full h-[2px] absolute top-0 left-0 bg-white rounded"></div>
                    <div className="w-full h-[2px] absolute left-0 bg-white rounded"></div>
                    <div className="w-full h-[2px] absolute bottom-0 left-0 bg-white rounded"></div>
                </button>
            </div>


            {/* Logo */}
            <div onClick={()=>setIsMenuOpen(false)} className="relative h-full flex flex-col justify-center items-center">
                <Link href='/' className="relative aspect-square h-[100%] flex">
                    <Image layout='fill' objectFit='contain' src={LogoPlaceHolder} priority={true}/>
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
                <Link href='/cart' className={`relative aspect-square h-[40%] flex invert`}>
                {items.length > 0 &&
                    <div
                    className="absolute w-[20px] h-[20px] bg-red-600 invert rounded-full right-[-6px] top-[-6px] z-[1] flex items-center justify-center "
                    >{items.length}</div>
                }
                    <Image layout='fill' objectFit='contain' src={CartSvg} priority={true}/>
                </Link>
            </div>
        </nav>
    )
}