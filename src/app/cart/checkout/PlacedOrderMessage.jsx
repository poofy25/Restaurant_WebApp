import Link from "next/link"

export default function PlacedOrderMessage ({success , setSuccess}) {

    
    return (
        <div className="fixed w-full h-full left-0 top-0 bg-primary text-white flex flex-col justify-center items-center px-[7.5vw] py-8 box-border gap-4">
            {/* <p></p> */}
            {/* <Link>Meniu</Link> */}
            {success === false && <button onClick={()=>setSuccess(null)} className="w-full rounded self-start mb-auto">Inchide</button> }
            {success ? 
                <>
                    <h2 className="text-center">Comanda a fost plasata cu success!</h2>
                    <p className="text-center">Vom reveni cu un apel foarte curand pentru a confirma comanda!</p>
                    <Link href='/'
                    className="bg-complimentary px-8 py-4 rounded font-bold"
                    >Inapoi la meniu</Link>
                </> 
            : 
                <>
                    <h2 className="text-center">Ne cerem scuze! A aparut o eroare.</h2>
                    <p className="text-center">Incercati sa recreati comanda.</p>
                    <Link href='/cart'
                    className="bg-complimentary px-8 py-4 rounded font-bold mb-auto"
                    >Inapoi la cos</Link>
                </>
            }
        </div>
    )
}