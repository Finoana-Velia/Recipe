import { TouchableOpacity,Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import tw from 'twrnc';
import Cached from "../../helpers/Image";
import { recipeImage } from "../../API/RecipeAPI";
import { HeartIcon } from "react-native-heroicons/outline";
import { useState } from "react";
import { connect } from "react-redux";

function Card(props) {

    const item = props.item;
    const navigation = props.navigation;
    const recipe = props.item.item;

    // console.log("name : " + recipe.name);
    // console.log(props.favorites.favorites);

    const isFavorite = props.favorites.favorites.findIndex(item => 
        item.id === recipe.id
    ) !== -1;

    let pair = item.i%2 == 0;
    let impair = item.i%3 == 0;

    const toggleFavorite = () => {
        const action = { type : 'TOGGLE_FAVORITE', value : recipe};
        props.dispatch(action);
    }

    return (
        <Animated.View
            entering={FadeInDown.delay(item.i*100).duration(600).springify().damping(12)}
            style={{
                flex : 1,
                width : '100%',
                paddingLeft : pair ? 0 : 8,
                paddingRight : pair ? 8 : 0,
            }}
                sharedTransitionStyle={recipe.name}
        >
            <TouchableOpacity
                onPress={toggleFavorite}
                style={tw`w-7 h-7 bg-white absolute top-3 right-5 z-100 rounded-full flex justify-center items-center`}
            >
                <HeartIcon size={20} strokeWidth={4} style={isFavorite ? tw`text-red-500` : tw`text-slate-500`}/>
            </TouchableOpacity>
            <TouchableOpacity
                // onPress={() => navigation.navigate('Detail', recipe.id)}
                onPress={() => navigation.navigate('Detail',recipe)}
            >
                
                    <Cached
                        decorator={{
                            width : '100%',
                            height : impair ? 150 : 250,
                            backgroundColor : 'silver',
                            borderRadius : 35,
                        }}
                        url={{uri : recipeImage(recipe.id)}}
                    />
                    <Text style={tw`m-1`}>{recipe.name.length > 20 ? recipe.name.slice(0,10) + '...' : recipe.name}</Text>
            </TouchableOpacity>
        </Animated.View>
    )
};


const mapStateToProps = (state) => {
    return {
        favorites : state.favorites
    }
}

export default connect(mapStateToProps)(Card);