'use client'
import styles from './navBar.module.scss'

import Link from "next/link"

export default function NavBarMenu ({isMenuOpen , setIsMenuOpen}) {
    return (
        <div 
        onClick={(e)=>{if(e.target === e.currentTarget) setIsMenuOpen(false)}}
        className={`
            ${isMenuOpen ? 'left-0 no-doc-scroll' : 'left-[-100%]'}
            w-full h-full fixed top-0 z-10 transition-all
            bg-[rgba(0,0,0,0.5)] 
            flex sm:hidden
        `}>

            {/* Content */}
            <div className="w-[300px] h-full bg-primary">

                {/* Nav menu */}
                <div className="w-full h-[80px] flex  justify-start items-center box-border pl-[7.5vw]">
                    <button onClick={()=>setIsMenuOpen(current=>!current)}
                    className="relative w-[32px] h-[24px] p-0 bg-transparent hover:bg-transparent">

                        <div className="w-full h-[2px] absolute top-0 left-0 bg-white rounded"></div>
                        <div className="w-full h-[2px] absolute left-0 bg-white rounded"></div>
                        <div className="w-full h-[2px] absolute bottom-0 left-0 bg-white rounded"></div>
                    </button>
                </div>

                {/* Links */}
                <div className=" box-border text-2xl
                flex flex-col justify-center bg-primary-light
                ">   
                    <Link href='/menu' className={styles.navBarMenuLink}>Menu</Link>
                    <Link href='/menu' className={styles.navBarMenuLink}>Meniu în sală</Link>
                    <Link href='/menu' className={styles.navBarMenuLink}>Servicii</Link>
                    <Link href='/menu' className={styles.navBarMenuLink}>Cariera</Link>
                    <Link href='/menu' className={`${styles.navBarMenuLink} !border-0`}>Contacte</Link>
                </div>

            </div>

        </div>
    )
}