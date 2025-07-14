import { View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { connect } from 'react-redux';
import tw from 'twrnc';
import Header from '../components/Header';
import Cached from '../helpers/Image';
import { recipeImage } from '../API/RecipeAPI';
import { EyeIcon, HeartIcon, ShoppingCartIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

function Favorite(props) {

    const navigation = useNavigation();

    const displayFavorite = ({item}) => (
        <View style={tw`flex flex-row gap-2 border-b border-slate-200 py-2`}>
          <Cached 
            decorator={{
                width : 100,
                height : 100,
                borderRadius : 10
            }}
            url={{ uri : recipeImage(item.id)}}
          />
          <View style={tw`flex w-full gap-2`}>
            <Text style={tw`text-lime-500 font-bold text-xl`}>{item.name}</Text>
            <Text style={tw`text-md text-slate-500 font-bold`}>{item.category}</Text>
            <View style={tw`flex flex-row w-full gap-5`}>
                <TouchableOpacity>
                    <HeartIcon size={25} strokeWidth={2} style={tw`text-red-500`}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Detail',item)}
                >
                    <EyeIcon size={25} strokeWidth={2} style={tw`text-lime-500`}/>
                </TouchableOpacity>
            </View>
          </View>
          
        </View>
    );

    return (
        <View style={tw`mt-10 px-2`}>
            <Header />
            <Text style={tw`text-center text-lime-500 text-2xl font-bold`}>Favorites</Text>
            {props.favorites.length !== 0 ? 
            <FlatList 
                data={props.favorites}
                style={tw`pt-2`}
                renderItem={displayFavorite}
                keyExtractor={item => item.id}
            />
            : <View style={tw`w-full h-[50%] flex justify-center items-center`}>
                    <Text>No more favorite recipes yet</Text>
                </View>}
        </View>
    )
};

const mapStateToProps = state => {
    return {
        favorites : state.favorites
    }
}

export default connect(mapStateToProps)(Favorite);