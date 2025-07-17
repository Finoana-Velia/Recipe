export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_TO_CART = "REMOVE_TO_CART";
export const EMPTY_CART = "EMPTY_CART";
export const DECREMENT = "DECREMENT";

export const addToCart = (recipe) => ({
    type : ADD_TO_CART,
    payload : recipe
});

export const removeToCart = (id) => ({
    type : REMOVE_TO_CART,
    payload : id
});

export const emptyCart = () => ({
    type : EMPTY_CART
});

export const decrement = (id) => ({
    type : DECREMENT,
    payload : id
})
