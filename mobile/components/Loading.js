
import { ActivityIndicator, View } from 'react-native';
import tw from 'twrnc';

export default function Loading() {
    return (
        <View style={tw`flex justify-center items-center min-h-150`}>
            <ActivityIndicator size='large'/>
        </View>
    )
};
