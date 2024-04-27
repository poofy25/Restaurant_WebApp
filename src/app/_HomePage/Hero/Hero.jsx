import Link from "next/link"
import Image from "next/image"
import BrushStrokeImg from '/public/imgs/brushStroke2.png' 
import Logo from '/public/imgs/logo_placeholder.png'



export default function HeroSection () {



    return (
        <div 
        // style={{background:"url(/imgs/hero.jpg)"}}
        className="flex flex-col z-[39] items-center justify-center bg-[url(/imgs/hero1.jpg)] md:bg-[url(/imgs/hero2.jpg)] relative h-[100vh] top-0 w-[calc(100vw-(100vw-100%)] box-border !bg-cover !bg-center mx-[-7.5vw]">
            <Image className="w-[50%] h-auto " src={Logo} width='500' height='500'/>
            <Link href='/#Pizza' className="flex justify-between mb-4 items-center w-[50%] px-8 py-3 border-0 border-solid border-primay-light relative imageDropShadow transform-gpu">
                <h3 className="w-full text-center text-2xl">Meniu</h3>
                <Image src={BrushStrokeImg} className='filterToComplimentary -z-10' fill={true}/>
            </Link>
            <Link href='/#Pizza' className="flex justify-between items-center w-[50%] px-8 py-3 border-0 border-solid border-primay-light relative imageDropShadow transform-gpu">
                <h3 className="w-full text-center text-complimentary text-2xl">Pizza</h3>
                <Image src={BrushStrokeImg} className='grayscale invert -z-10' fill={true}/>
            </Link>
            <Image className="w-[50%] h-auto opacity-0 " src={Logo} width='500' height='500'/>

            <div className="absolute w-full h-full left-0 top-0 bg-[rgba(0,0,0,0.25)] -z-10"></div>
            {/* <Link href='/menu-local' className="flex justify-between items-center px-8 py-3 border-0 border-solid border-primay-light relative imageDropShadow transform-gpu">
                <h3 className="w-full text-center text-2xl">Meniu în sală</h3>
                <Image src={BrushStrokeImg} className='filterToComplimentary -z-10' fill={true}/>
            </Link> */}
        </div>
    )
}