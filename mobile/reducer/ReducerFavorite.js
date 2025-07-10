const initialStateFavorite = { favorites : []};

export default function toggleFavorite(state = initialStateFavorite, action) {
    let nextState;

    switch(action.type) {
        case 'TOGGLE_FAVORITE' : 
            const favoriteIndex = state.favorites.findIndex(item => item.id === action.value.id);
            if(favoriteIndex !== -1) {
                //delete into the favorite
                nextState = {
                    ...state,
                    favorites : [...state.favorites.filter((item,index) => index !== favoriteIndex),action.value]
                }
            }else {
                // add item into the favorite
                nextState = {
                    ...state,
                    favorites : [...state.favorites,action.value]
                }
            }
            return nextState || state;
        default : 
        return state;
    }
}