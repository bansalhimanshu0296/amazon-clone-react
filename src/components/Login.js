import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Login.css'
import { auth } from '../firbase'
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firbase";
import { useStateValue } from '../StateProvider'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [{basket}, dispatch] = useStateValue()

  const signIn = (e) =>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((auth)=>{
        if(auth){
            const docSnap = getDoc(doc(db, "users", auth.user?.uid))
            docSnap.then((data)=>{
                dispatch({
                    type: 'SET_BASKET',
                    user:  auth.user?.uid,
                    basket: data.data().basket
                })
            })
            navigate('/')
        }
    }).catch(error=>alert(error.message));
  }

  const register = (e) =>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(
        (auth) => {
            if(auth){
                setDoc(doc(db, 'users', auth.user?.uid),{
                    basket: basket
                })
                navigate('/')
            }
        }
    ).catch(error=>alert(error.message))
  }

  return (
    <div className='login'>
        <Link to="/">
            <img 
            className='login__logo'
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            alt ='Logo'/>
        </Link>
        <div className='login__container'>
            <h1>Sign-in</h1>
            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className='login__signInButton' onClick={signIn} type='submit'>Sign In</button>
            </form>
            <p>
                By signing-in you agree to Amazon's Condition of Use & Sale. Please see our Privacy Notice, our Cookies Notice
                and our Interest-Based Ad Notice.
            </p>
            <button className='login__registerButton' onClick={register}>Create Amazon Account</button>
        </div>
    </div>
  )
}

export default Login