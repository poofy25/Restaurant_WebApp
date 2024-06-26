'use client'


import './page.scss'

import { useCartContext } from '@/hooks/useCartContext'
import { useEffect, useState , useRef} from 'react'
import { handleCheckout } from '@/app/actions/CheckoutActions'
import { calculatePrice , calculateItems } from '@/utils/cartUtils'

import { socket } from '@/utils/socket'
import { useRouter } from 'next/navigation'

import PlacedOrderMessage from "./PlacedOrderMessage"

export default function CheckoutPage () {


    const [loading , setLoading] = useState(null)
    const [formSuccess , setFormSuccess] = useState(null)

    const { items , dispatch } = useCartContext()
    const router = useRouter()

    const [name , setName] = useState('')
    const [phone, setPhone] = useState('')
    const [confirmPhone , setConfirmPhone] = useState('')
    const [email , setEmail] = useState('')
    const [street , setStreet] = useState('')
    const [scara , setScara] = useState('')
    const [floor , setFloor] = useState('')
    const [interfon , setInterfon] = useState('')
    const [city , setCity] = useState('Chisinau')
    const [sector , setSector] = useState('')
    const [info , setInfo] = useState('')
    const [payment , setPayment] = useState('Cash la livrare')

    const formRef = useRef()
    const confimrNumberRef = useRef()


    const resetForm = () => {
        setName('')
        setPhone('')
        setConfirmPhone('')
        setEmail('')
        setStreet('')
        setFloor('')
        setInterfon('')
        setCity('Chisinau')
        setSector('')
        setInfo('')
        setPayment('Cash la livrare')
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setFormSuccess(null)

        if(!items || items.length == 0) {
            setFormSuccess(false)
            return
        }

        // Set form data as an object from inputs
        const formData = {
            name:name,
            phone:phone,
            email:email,
            street:street,
            scara:scara,
            floor:floor,
            interfon:interfon,
            city:city,
            sector:sector,
            info:info,
            totalPrice:calculatePrice(items).total,
            deliveryPrice:calculatePrice(items).delivery,
            totalItems:calculateItems(items),
            payment:payment,
            items:items
        }
        // Post order in database
        const response = await handleCheckout(formData)

        console.log("Checkout Response: " , response)

        // Send event to the socketIO server that an order has been set
        if(response.ok){
            socket.emit('placedOrderClient', response.data);
            setFormSuccess(true)
            resetForm()
            dispatch({type: 'SET_CART', payload:[]})

        } else {
            setFormSuccess(false)
        } 

        setLoading(false)
    }

    // Check if telephone number is matching
    useEffect(()=>{
        if(phone !== confirmPhone){
            confimrNumberRef.current.setCustomValidity("Nr. de telefon nu coincide."); 
        } else {
            confimrNumberRef.current.setCustomValidity("");
        }

    },[phone , confirmPhone])

    useEffect(()=>{
        if(!items || items.length === 0) {
            router.push('/')
        }
    },[])



    return (
        <main className='flex flex-col h-full relative gap-4 px-[7.5vw] pb-8 box-border
        md:flex-row md:gap-8
        '>
            <div className='flex flex-col gap-4 w-full md:w-[60%]'>
                <h2 className='bg-transparent w-full box-border text-white text-center p-4 border-0 border-b-2 border-solid border-complimentary'>Livrare</h2>

                    {/* Personal info Form */}
                    <form className='checkoutForm' onSubmit={handleFormSubmit} id="hook-form" ref={formRef}>
                        <label>Nume <span className='text-red-500'>*</span></label>
                        <input type='text'onChange={(e)=>{setName(e.target.value)}} value={name} placeholder='Nume' required/>
                        <label>Telefon <span className='text-red-500'>*</span></label>
                        <input type='tel'onChange={(e)=>{setPhone(e.target.value)}} value={phone} placeholder='Telefon' required/>
                        <label>Confirma Nr de Telefon <span className='text-red-500'>*</span></label>
                        <input type='tel'onChange={(e)=>{setConfirmPhone(e.target.value)}} value={confirmPhone} ref={confimrNumberRef} placeholder='Confirma telefon' required/>
                        <label>Email</label>
                        <input type='email' onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder='Email'/>
                        <label>Strada <span className='text-red-500'>*</span></label>
                        <input type='text' onChange={(e)=>{setStreet(e.target.value)}} value={street} placeholder='Strada' required/>
                        <label>Oras <span className='text-red-500'>*</span></label>
                        {/* <input type='text' onChange={(e)=>{setCity(e.target.value)}} value={city} placeholder='Oras' required/> */}

                        <select name="oras" id="oras" value={city} onChange={(e)=>{setCity(e.target.value)}} required>
                            <option value="Chisinau">Chisinau</option>
                        </select>

                        <label>Sector <span className='text-red-500'>*</span></label>
                        {/* <input type='text' onChange={(e)=>{setSector(e.target.value)}} value={sector} placeholder='Sector' required/> */}

                        <select name="oras" id="oras" value={sector} onChange={(e)=>{setSector(e.target.value)}} required >
                            <option value="">Alege sectorul</option>
                            <option value="Centru">Centru</option>
                            <option value="Botanica">Botanica</option>
                            <option value="Buiucani">Buiucani</option>
                            <option value="Telecentru">Telecentru</option>
                            <option value="Rascani">Rascani</option>
                            <option value="Ciocana">Ciocana</option>
                        </select>


                        <div className='flex flex-col gap-2'>
                            <div>
                                <label>Scara</label>
                                <input type='text' onChange={(e)=>{setScara(e.target.value)}} placeholder='Scara' value={scara}/>
                            </div>
                            <div>
                                <label>Etajul</label>
                                <input type='text' onChange={(e)=>{setFloor(e.target.value)}} placeholder='Etajul' value={floor}/>
                            </div>
                            <div>
                                <label>Interfon</label>
                                <input type='text' onChange={(e)=>{setInterfon(e.target.value)}} placeholder='Interfon' value={interfon}/>
                            </div>
                        </div>
                        <label>Informatie suplimentara</label>
                        <textarea type='text' className='h-[150px]' onChange={(e)=>{setInfo(e.target.value)}} placeholder='Informatie suplimentara' value={info}/>
                    </form>
            </div>

            {/* Total price info */}
            <div className='flex flex-col flex-1 h-fit gap-2 md:sticky md:top-0'>
                <div className='flex justify-between border-0 border-b border-solid border-primary-lighter pb-2 md:py-4 md:border-complimentary md:border-b-2'><h2>Total</h2><h2>{calculatePrice(items).total + " mdl"}</h2></div>
                <div className='flex justify-between border-0 border-b border-solid border-primary-lighter pb-2'><p>Subtotal</p><p>{calculatePrice(items).subtotal + " mdl"}</p></div>
                <div className='flex justify-between border-0 border-b border-solid border-primary-lighter pb-2'><p>Livrare</p><p>{calculatePrice(items).delivery + " mdl"}</p></div>

                {/* Payment type buttons */}
                <div className='flex justify-between gap-4 my-2 font-semibold'>
                    <button onClick={()=>setPayment('Cash la livrare')}
                    className={` ${payment === "Cash la livrare" ? "!bg-complimentary" : ''}
                    flex items-center justify-center flex-1 px-4 py-4 border-2 border-solid border-complimentary bg-transparent rounded transition-all`}>
                        <p className='text-center'>Cash la livrare</p>
                    </button>
                    <button onClick={()=>setPayment('Card la livrare')}
                    className={` ${payment === "Card la livrare" ? "!bg-complimentary" : ''}
                    flex items-center justify-center flex-1 px-4     py-4 border-2 border-solid border-complimentary bg-transparent rounded transition-all`}>
                        <p className='text-center'>Card la livrare</p>
                    </button>
                </div>

                {/* Place Order Button */}
                <button className='py-4 rounded'
                disabled={loading} onClick={()=>{formRef.current.requestSubmit()}}>{loading ? "Se plaseaza comanda..." : "Plaseaza comanda"}</button>

                {formSuccess !== null && <PlacedOrderMessage success={formSuccess} setSuccess={setFormSuccess}/>}
            </div>
            
        </main>
    )
}
