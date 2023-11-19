import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Payment.css'
import { useStateValue } from '../StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../reducer'
import axios from './axios' 
import { db } from '../firbase'
import { doc, setDoc } from "firebase/firestore"; 



function Payment() {
  
  const [{ basket, user }, dispatch] = useStateValue()

  const navigate = useNavigate()

  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState("")
  const [isDisabled, setIsDisabled] = useState(true)
  const [succeded, setSucceded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState("")

  useEffect(()=>{
    const getClientSecret = async () =>{
        const response = await axios({
            method: 'post',
            url: `/payments/create?total=${getBasketTotal(basket) * 100}`
        })
        setClientSecret(response.data.clientSecret)
    }
    getClientSecret()
  },[basket])

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement)
        }
    }).then(({paymentIntent})=>{

        setDoc(doc(db, 'users', user?.uid, 'orders', paymentIntent.id),{
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
        })

        setSucceded(true)
        setError(null)
        setProcessing(false)

        dispatch({
            type: 'EMPTY_BASKET'
        })

        navigate('/orders', {replace: true})
    })

  }

  const handleChange = (e) =>{
    setIsDisabled(e.empty)
    setError(e.error ? e.error.message : "")
  }

  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>
                Checkout (<Link to="/checkout">{basket?.length} items</Link>)
            </h1>
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Seattle, WA</p>
                </div>
            </div>
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review Items & Delivery</h3>
                </div>
                <div className='payment__items'>
                    {basket.map(item=>(
                        <CheckoutProduct
                         id={item.id}
                         title={item.title}
                         image={item.image}
                         price={item.price}
                         rating={item.rating}
                         dispatch ={dispatch}
                        />
                    ))}
                </div>
            </div>
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__detail'>
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className='payment__priceContainer'>
                            <CurrencyFormat
                             renderText={(value)=>(
                                <h4>Order Total: {value}</h4>
                             )}
                             decimalScale={2}
                             value={getBasketTotal(basket)}
                             displayType={'text'}
                             thousandSeparator={true}
                             prefix={"$"}
                            />
                            <button disabled={ processing || isDisabled || succeded }>
                                <span>{processing ? <p>Processing</p>:"Buy Now"}</span>
                            </button>
                        </div>
                    </form>
                    {error && <div>{error}</div>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment