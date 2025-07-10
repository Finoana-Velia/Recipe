import { View, Text, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import tw from 'twrnc';

function Favorite(props) {

    const showStoreContent = () => {
        console.log("props.favorites");
        console.log(props.favorites);
    }

    return (
        <View style={tw`flex justify-center items-center`}>
            <Text>Favorite screen!</Text>
            <TouchableOpacity
                onPress={showStoreContent}
                style={tw`p-2 bg-blue-500`}
            >
                <Text style={tw`text-white font-bold`}>Store</Text>
            </TouchableOpacity>
        </View>
    )
};

const mapStateToProps = state => {
    return {
        favorites : state.favorites
    }
}

export default connect(mapStateToProps)(Favorite);