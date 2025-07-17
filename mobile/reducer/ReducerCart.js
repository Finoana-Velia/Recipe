import { ADD_TO_CART, DECREMENT, EMPTY_CART, REMOVE_TO_CART } from "./CartActions";

const initialState = { cart : []};

export default function ReducerCart(state = initialState, action) {
    switch(action.type) {
        case ADD_TO_CART : 
            const recipe = action.payload;
            const exist = state.cart.find(item => item.id === recipe.id);

            if(exist) {
                return {
                    ...state,
                    cart : state.cart.map(item => 
                        item.id === recipe.id ?
                        {...item,quantity : item.quantity + 1} : item
                    )
                };
            }else {
                return {
                    ...state,
                    cart : [...state.cart, {...recipe, quantity : 1 }]
                };
            }
        case REMOVE_TO_CART : 
            return {
                ...state,
                cart : state.cart.filter(item => item.id !== action.payload)
            };
        case DECREMENT : 
            return {
                ...state,
                cart : state.cart.map(item =>
                    item.id === action.payload ? 
                    {...item, quantity : item.quantity > 1 ? item.quantity - 1 : 1} : item
                ).filter(item => item.quantity !== 0)
            };
        case EMPTY_CART : 
            return {
                ...state,
                cart : []
            };
        default :
            return state;
    }
}