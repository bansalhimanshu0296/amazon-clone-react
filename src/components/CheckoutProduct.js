import React from 'react'
import '../css/CheckoutProduct.css'

function CheckoutProduct({ id, image, title, price, rating, dispatch }) {
  
  const removeFromBasket = () =>{
    dispatch({
        type: 'REMOVE_FROM_BASKET',
        id: id
    })
    
  }
  return (
    <div className='checkoutProduct'>
        <img className='checkoutProduct__image' src={image} alt={title}/>
        <div className='checkoutProduct__info'>
            <p className='checkoutProduct__title'>{title}</p>
            <p className='checkoutProduct__price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className='checkoutProduct__rating'>
                {
                    Array(rating).fill().map((_, i)=>(
                        <p><font color="orange">★</font></p>
                    ))
                }
            </div>
            {dispatch && 
                <button onClick={removeFromBasket}>Remove from Basket</button>
            }
        </div>
    </div>
  )
}

export default CheckoutProduct