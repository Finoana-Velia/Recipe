import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { connect, useDispatch } from "react-redux";

import tw from 'twrnc';
import Cached from "../../helpers/Image";
import { recipeImage } from "../../API/RecipeAPI";
import { EyeIcon, HeartIcon, ShoppingCartIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const ListItem = ({item}) => {

    const navigation = useNavigation();
    const dispatchAction = useDispatch();
    
    const renderAction = () => (
        <View style={tw`flex flex-row`}>
            <TouchableOpacity style={tw`w-24 justify-center items-center bg-lime-500`}>
                <ShoppingCartIcon style={tw`text-white`} size={30} strokeWidth={2}/>
            </TouchableOpacity>
        </View>
    );

    const toggleFavorite = () => {
        dispatchAction({ type :'TOGGLE_FAVORITE', value : item});
    }

    return (
        <Swipeable renderRightActions={renderAction} containerStyle={{ marginBottom : 2}}>
            <View style={tw`flex flex-row gap-2 border-b border-slate-200 py-2`}>
                <Cached 
                    decorator={{
                        width : 100,
                        height : 100,
                        borderRadius : 10
                    }}
                    url={{ uri : recipeImage(item.id)}}
                />
                <View style={tw`flex gap-2`}>
                    <Text style={tw`text-lime-500 font-bold text-xl`}>{item.name}</Text>
                    <Text style={tw`text-slate-500 font-bold`}>{item.category}</Text>
                    <View style={tw`flex flex-row gap-5`}>
                        <Text style={tw`text-lime-400 text-xl font-bold`}>${item.price}</Text>
                        <TouchableOpacity
                            onPress={() => toggleFavorite()}
                        >
                            <HeartIcon size={25} strokeWidth={2} style={tw`text-red-500`}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Detail',item)}
                        >
                            <EyeIcon size={25} strokeWidth={2} style={tw`text-lime-500`} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Swipeable>
    )
}
 function FavoriteList({recipes}) {

    return (
        <GestureHandlerRootView style={tw`flex pb-90`}>
            <FlatList
                // data={props.favroites}
                data={recipes}
                keyExtractor={item => item.id}
                renderItem={({item}) => <ListItem item={item}/>}
            />
        </GestureHandlerRootView>
    )
    
};

export default FavoriteList;

