import React from 'react'
import Header from '../components/Header'
import Payment from '../components/Payment'

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe("pk_test_51ODLzFL9DeN3mz1caIRjmU7ojQn1ynQV7G41uvtX7bLXLRCtmQuoheCpenUWxV7umXzXVQv5cjoh5fbQwljZ6grS00S1AwE8vu")


function PaymentContainer() {
    return (
        <>
           <Header />
           <Elements stripe={promise}>
                <Payment />
           </Elements>
        </>
    )
}

export default PaymentContainer