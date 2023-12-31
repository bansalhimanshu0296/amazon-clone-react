import React from 'react'
import '../css/Checkout.css'
import { useStateValue } from '../StateProvider'
import CheckoutProduct from './CheckoutProduct'
import Subtotal from './Subtotal'
import FlipMove from 'react-flip-move';

function Checkout() {
  
  const [{basket, user}, dispatch] = useStateValue()
  return (
    <div className='checkout'>
        <div className='checkout__left'>
            <img className='checkout__ad' 
             src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg' 
             alt='' />
            <div>
                <h3>Hello, {user?.email || 'Guest'}</h3>
                <h2 className='checkout__title'>
                    Your Shopping Basket
                </h2>
                <FlipMove>
                    {
                        basket.map(item=>(
                            <CheckoutProduct
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            dispatch ={dispatch}
                            />
                        ))
                    }
                </FlipMove>
            </div>
        </div>
        <div className='checkout__right'>
            <Subtotal/>
        </div>
    </div>
  )
}

export default Checkout