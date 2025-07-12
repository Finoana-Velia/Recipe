import { View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { connect } from 'react-redux';
import tw from 'twrnc';
import Header from '../components/Header';
import Cached from '../helpers/Image';
import { recipeImage } from '../API/RecipeAPI';
import { HeartIcon, ShoppingCartIcon } from 'react-native-heroicons/outline';

function Favorite(props) {

    const showStoreContent = () => {
        console.log("props.favorites");
        console.log(props.favorites);
    }

    return (
        // <View style={tw`flex justify-center items-center`}>
        //     <Text>Favorite screen!</Text>
        //     <TouchableOpacity
        //         onPress={showStoreContent}
        //         style={tw`p-2 bg-blue-500`}
        //     >
        //         <Text style={tw`text-white font-bold`}>Store</Text>
        //     </TouchableOpacity>
        // </View>
        // <ScrollView
        //     style={tw`mt-10 px-2`}
        //     showsVerticalScrollIndicator={false}
        // >
        <View style={tw`mt-10 px-2`}>
            <Header />
            <Text style={tw`text-center text-lime-500 text-2xl font-bold`}>Favorites</Text>
            {props.favorites.length !== 0 ? 
            <FlatList
                // style={tw`flex my-2`}
                data={props.favorites}
                renderItem={(recipe) => {
                    <Text>recipe name</Text>
                }}
            /> 
            : <View style={tw`w-full h-[50%] flex justify-center items-center`}>
                    <Text>No more favorite recipes yet</Text>
                </View>}
        {/* </ScrollView> */}
        </View>
    )
};

const mapStateToProps = state => {
    return {
        favorites : state.favorites
    }
}

export default connect(mapStateToProps)(Favorite);