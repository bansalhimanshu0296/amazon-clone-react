import React, { useEffect, useState } from 'react'
import '../css/Orders.css'
import { useStateValue } from '../StateProvider'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from '../firbase'
import Order from './Order'

function Orders() {

  const [{ basket, user }, dispatch] = useStateValue()

  const [orders, setOrders] = useState([])

  useEffect(()=>{
   if(user){
    const q = query(collection(db, 'users', user?.uid, 'orders'), orderBy('created', 'desc'))
    onSnapshot(q, (snapshot)=>(
        setOrders(snapshot.docs.map(doc=>({
            id: doc.id,
            data: doc.data()
        })))
    ))
   }else{
    setOrders([])
   }
  }, [user])

  return (
    <div className='orders'>
        <h1>Your Orders</h1>
        <div className='orders__order'>
            {orders?.map(order => (
                <Order order={order} />
            ))}
        </div>
    </div>
  )
}

export default Orders