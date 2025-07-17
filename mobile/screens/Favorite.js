import { View, Text} from 'react-native';
import { connect } from 'react-redux';
import tw from 'twrnc';
import Header from '../components/Header';
import FavoriteList from '../components/Favorite/FavoriteList';

function Favorite(props) {

    const recipes = props.favorites.favorites;

    return (
        <View style={tw`mt-10 px-2`}>
            <Header />
            <Text style={tw`text-center text-lime-500 text-2xl font-bold`}>Favorites</Text>
            {recipes.length !== 0 ? 
            <FavoriteList recipes={recipes}/>
            : <View style={tw`w-full h-[50%] flex justify-center items-center`}>
                    <Text>No more favorite recipes yet</Text>
                </View>}
        </View>
    )
};

const mapStateToProps = state => {
    return {
        favorites : state.favorites,
    }
}

export default connect(mapStateToProps)(Favorite);