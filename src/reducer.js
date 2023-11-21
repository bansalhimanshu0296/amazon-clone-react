import { setDoc, doc } from "firebase/firestore";
import { db } from "./firbase";

export const initialState = {
    basket: [],
    user: null,
};

export const getBasketTotal = (basket) => 
basket?.reduce((amount, item)=> item.price + amount, 0)

const reducer = (state, action) => {
    let newBasket = []
    switch(action.type){
        case 'ADD_TO_BASKET':
            newBasket = [...state.basket, action.item]
            if(state.user){
                setDoc(doc(db, 'users', state.user?.uid),{
                    basket: newBasket
                })
            }
            return{
                ...state,
                basket: newBasket
            };
        case 'EMPTY_BASKET':
            return{
                ...state,
                basket:[]
            };
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (item) => item.id === action.id
            )
            newBasket = [...state.basket]
            if(index>=0){
                newBasket.splice(index, 1)
            }else{
                console.warn(`Can't remove product (id: ${action.id}) as its not in basket!`)
            }
            if(state.user){
                setDoc(doc(db, 'users', state.user?.uid),{
                    basket: newBasket
                })
            }
            return{
                ...state,
                basket: newBasket 
            };
        case 'SET_USER':
            return{
                ...state,
                user: action.user
            };
        case 'SET_BASKET':
            newBasket = action.basket.concat(state.basket)
            if(action.user){
                setDoc(doc(db, 'users', action.user),{
                    basket: newBasket
                })
            }
            return{
                ...state,
                basket: newBasket
            }
        default:
            return state;
    }
}

export default reducer;