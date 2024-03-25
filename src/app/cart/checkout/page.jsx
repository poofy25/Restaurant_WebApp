'use client'


import styles from './page.module.scss'

import { useCartContext } from '@/hooks/useCartContext'
import { useEffect, useState , useRef} from 'react'
import { handleCheckout } from '@/app/actions/CheckoutActions'
import { calculatePrice } from '@/utils/cartUtils'

import { socket } from '@/utils/socket'

export default function CheckoutPage () {

    const {items , dispatch} = useCartContext()

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
    const [payment , setPayment] = useState('Cash at delivery')

    const formRef = useRef()
    const confimrNumberRef = useRef()


    const handleFormSubmit = async (e) => {
        e.preventDefault()

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
            payment:payment,
            items:items
        }
        console.log(formData)
        const response = await handleCheckout(formData)
        if(response){
            socket.emit('placedOrderClient', response.data);
            console.log(response)
        }
    }

    useEffect(()=>{
        console.log(phone , confirmPhone)
        console.log(phone === confirmPhone)
        if(phone !== confirmPhone){
            confimrNumberRef.current.setCustomValidity("Phone number is not matching"); 
        } else {
            confimrNumberRef.current.setCustomValidity("");
        }

    },[phone , confirmPhone])




    return (
        <main className={styles.main}>
            <div className={styles.items}>
                <h2>Delivery</h2>
                    <form className={styles.form} onSubmit={handleFormSubmit} id="hook-form" ref={formRef}>
                        <label>Nume *</label>
                        <input type='text'onChange={(e)=>{setName(e.target.value)}} value={name} required/>
                        <label>Telefon *</label>
                        <input type='tel'onChange={(e)=>{setPhone(e.target.value)}} value={phone} required/>
                        <label>Confirma Nr de Telefon *</label>
                        <input type='tel'onChange={(e)=>{setConfirmPhone(e.target.value)}} value={confirmPhone} ref={confimrNumberRef} required/>
                        <label>Email</label>
                        <input type='email' onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                        <label>Strada *</label>
                        <input type='text' onChange={(e)=>{setStreet(e.target.value)}} value={street} required/>
                        <div>
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
                        <label>Oras *</label>
                        <input type='text' onChange={(e)=>{setCity(e.target.value)}} value={city} required/>
                        <label>Sector *</label>
                        <input type='text' onChange={(e)=>{setSector(e.target.value)}} value={sector} required/>
                        <label>Informatie suplimentara</label>
                        <textarea type='text' onChange={(e)=>{setInfo(e.target.value)}} value={info}/>
                    </form>
            </div>

            <div className={styles.totalInfo}>
                <div><h1>Total</h1><h2>{calculatePrice(items).total + " mdl"}</h2></div>
                <div><p>Subtotal</p><h3>{calculatePrice(items).subtotal + " mdl"}</h3></div>
                <div><p>Delivery</p><h3>{calculatePrice(items).delivery + " mdl"}</h3></div>
                <form className={styles.paymentForm}>
                    <div>
                        <label>Cash at delivey</label>
                        <input type="radio" id="payment1" name="payment" value="Cash at delivery" onClick={(e)=>{setPayment(e.target.value)}} defaultChecked/>
                    </div>
                    <div>
                        <label>Card at delivey</label>
                        <input type="radio" id="payment2" name="payment" value="Card at delivery" onClick={(e)=>{setPayment(e.target.value)}}/>
                    </div>
                </form>
                <button onClick={()=>{formRef.current.requestSubmit()}}>Order</button>
            </div>
            
        </main>
    )
}