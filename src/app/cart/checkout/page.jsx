'use client'


import './page.scss'

import { useCartContext } from '@/hooks/useCartContext'
import { useEffect, useState , useRef} from 'react'
import { handleCheckout } from '@/app/actions/CheckoutActions'
import { calculatePrice , calculateItems } from '@/utils/cartUtils'

import { socket } from '@/utils/socket'

export default function CheckoutPage () {


    const [loading , setLoading] = useState(null)
    const [formMessage , setFormMessage] = useState(null)

    const { items } = useCartContext()

    const [name , setName] = useState('')
    const [phone, setPhone] = useState('')
    const [confirmPhone , setConfirmPhone] = useState('')
    const [email , setEmail] = useState('')
    const [street , setStreet] = useState('')
    const [scara , setScara] = useState('')
    const [floor , setFloor] = useState('')
    const [interfon , setInterfon] = useState('')
    const [city , setCity] = useState('')
    const [sector , setSector] = useState('')
    const [info , setInfo] = useState('')
    const [payment , setPayment] = useState('Cash la livrare')

    const formRef = useRef()
    const confimrNumberRef = useRef()


    const handleFormSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setFormMessage(null)

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

        // Send event to the server that an order has been set
        if(response.ok){
            socket.emit('placedOrderClient', response.data);
            setFormMessage("Order sent successfuly")
        } else {
            setFormMessage(response)
        } 

        setLoading(false)
    }

    useEffect(()=>{
        if(phone !== confirmPhone){
            confimrNumberRef.current.setCustomValidity("Nr. de telefon nu coincide."); 
        } else {
            confimrNumberRef.current.setCustomValidity("");
        }

    },[phone , confirmPhone])




    return (
        <main className='flex flex-col gap-4 px-[7.5vw] pb-8 box-border'>
            <div className='flex flex-col gap-4 w-full'>
                <h2 className='bg-transparent w-full box-border text-white text-center p-4 border-0 border-b-2 border-solid border-complimentary'>Livrare</h2>

                    {/* Personal info Form */}
                    <form className='checkoutForm' onSubmit={handleFormSubmit} id="hook-form" ref={formRef}>
                        <label>Nume <span className='text-red-500'>*</span></label>
                        <input type='text'onChange={(e)=>{setName(e.target.value)}} value={name} required/>
                        <label>Telefon <span className='text-red-500'>*</span></label>
                        <input type='tel'onChange={(e)=>{setPhone(e.target.value)}} value={phone} required/>
                        <label>Confirma Nr de Telefon <span className='text-red-500'>*</span></label>
                        <input type='tel'onChange={(e)=>{setConfirmPhone(e.target.value)}} value={confirmPhone} ref={confimrNumberRef} required/>
                        <label>Email</label>
                        <input type='email' onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                        <label>Strada <span className='text-red-500'>*</span></label>
                        <input type='text' onChange={(e)=>{setStreet(e.target.value)}} value={street} required/>
                        <label>Oras <span className='text-red-500'>*</span></label>
                        <input type='text' onChange={(e)=>{setCity(e.target.value)}} value={city} required/>
                        <label>Sector <span className='text-red-500'>*</span></label>
                        <input type='text' onChange={(e)=>{setSector(e.target.value)}} value={sector} required/>
                        <div className='flex flex-col gap-2'>
                            <div>
                                <label>Scara</label>
                                <input type='text' onChange={(e)=>{setScara(e.target.value)}} value={scara}/>
                            </div>
                            <div>
                                <label>Etajul</label>
                                <input type='text' onChange={(e)=>{setFloor(e.target.value)}} value={floor}/>
                            </div>
                            <div>
                                <label>Interfon</label>
                                <input type='text' onChange={(e)=>{setInterfon(e.target.value)}} value={interfon}/>
                            </div>
                        </div>
                        <label>Informatie suplimentara</label>
                        <textarea type='text' className='h-[150px]' onChange={(e)=>{setInfo(e.target.value)}} value={info}/>
                    </form>
            </div>

            <div className=''>
                <div><h1>Total</h1><h2>{calculatePrice(items).total + " mdl"}</h2></div>
                <div><p>Subtotal</p><h3>{calculatePrice(items).subtotal + " mdl"}</h3></div>
                <div><p>Delivery</p><h3>{calculatePrice(items).delivery + " mdl"}</h3></div>
                <form className=''>
                    <div>
                        <label>Cash la livrare</label>
                        <input type="radio" id="payment1" name="payment" value="Cash at delivery" onClick={(e)=>{setPayment(e.target.value)}} defaultChecked/>
                    </div>
                    <div>
                        <label>Card la livrare</label>
                        <input type="radio" id="payment2" name="payment" value="Card at delivery" onClick={(e)=>{setPayment(e.target.value)}}/>
                    </div>
                </form>
                <button disabled={loading} onClick={()=>{formRef.current.requestSubmit()}}>{loading ? "Sending order..." : "Order"}</button>
                {formMessage && 
                    <div>
                        <p>{...formMessage}</p>
                    </div>
                }
            </div>
            
        </main>
    )
}
