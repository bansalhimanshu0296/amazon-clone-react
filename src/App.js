import './App.css';
import HomeContainer from './route_container/HomeContainer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckoutContainer from './route_container/CheckoutContainer';
import Login from './components/Login';
import { useEffect } from 'react';
import { auth } from './firbase';
import { useStateValue } from './StateProvider';
import PaymentContainer from './route_container/PaymentContainer';
import OrdersContainer from './route_container/OrdersContainer';

function App() {

  const [{}, dispatch] = useStateValue()

  useEffect(()=>{
    auth.onAuthStateChanged(authUser =>{
      console.log('The user is >>>>>', authUser)
      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else{
        dispatch({
          type: 'SET_USER',
          user: null
        })
        dispatch({
          type: 'EMPTY_BASKET'
        })
      }
    })
        
  },[])
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' Component={HomeContainer}/>
          <Route path='/checkout' Component={CheckoutContainer}/>
          <Route path='/login' Component={Login} />
          <Route path='/payment' Component={PaymentContainer}/>
          <Route path='/orders' Component={OrdersContainer} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
