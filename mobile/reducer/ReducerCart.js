const initalStateCart = {cart : [],subtotal : 0, discount : 0, deliveryFee : 5,total : deliveryFee};

export default function ToggleCart(state = initalStateCart,  action){
    let nextState;

    switch(actionn.type) {
        case 'TOGGLE_ITEM':
            const findItem = state.cart.findIndex(item => item.id === action.value.id);
            if(findItem !== -1) {
                // just increment number count
                // nextState = {
                //     subtotal : state.subtotal + item.value.price,
                //     discount : if(cart.length )

                // }
            }
    }
}