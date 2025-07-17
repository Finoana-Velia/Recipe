import { combineReducers, createStore } from "redux";
import toggleFavorite from "./ReducerFavorite";
import ReducerCart from "./ReducerCart";

const rootReducer = combineReducers({
    favorites : toggleFavorite,
    cart : ReducerCart
});

export default createStore(rootReducer);