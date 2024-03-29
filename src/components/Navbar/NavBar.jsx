'use client'

import { useState } from "react"

import Image from "next/image"
import Link from "next/link"

import { useCartContext } from "@/hooks/useCartContext"

import NoImage from '/public/imgs/no-image.jpg'
import LogoPlaceHolder from '/public/imgs/logo_placeholder.png'
import CartSvg from '/public/svgs/cart.svg'

export default function NavBar () {

    const {items , dispatch} = useCartContext()
    return (
        <nav className="
        flex flex-row items-center w-full h-[80px] bg-[rgba(0,0,0,0.5)] overflow-hidden px-[7.5vw]
        relative justify-between box-border
        ">
            {/* Logo */}
            <div className="relative h-full flex flex-col justify-center items-center">
                <Link href='/' className="relative aspect-square h-[100%] flex invert">
                    <Image layout='fill' objectFit='contain' src={LogoPlaceHolder}/>
                </Link>
            </div>

            {/* Nav buttons */}
            <div className="hidden ml-auto gap-8 [&_*]:py-4 sm:flex">
                <Link href='/menu'>Menu</Link>
                <Link href='/servicii'>Servicii</Link>
                <Link href='/menu-local'>Meniu in sala</Link>
                <Link href='/cariera'>Carieca</Link>
                <Link href='/contacte'>Contacte</Link>
            </div>

            {/* Phone Number */}
            <div className="hidden sm:flex ml-auto mr-8">
                <Link href='tel:000000'>060951364</Link>
            </div>


            {/* Cart */}
            <div className="relative h-full flex flex-col justify-center items-center">
                <Link href='/cart' className={`relative aspect-square h-[40%] flex invert`}>
                {items.length > 0 &&
                    <div
                    className="absolute w-[20px] h-[20px] bg-red-600 invert rounded-full right-[-6px] top-[-6px] z-[1] flex items-center justify-center "
                    >{items.length}</div>
                }
                    <Image layout='fill' objectFit='contain' src={CartSvg}/>
                </Link>
            </div>
        </nav>
    )
}