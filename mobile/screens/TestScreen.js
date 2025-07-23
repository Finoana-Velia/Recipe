import { View,Text } from "react-native";
import tw from 'twrnc';

export default function TestScreen(params) {
    return (
        <View style={tw`w-full h-full flex justify-center items-center`}>
            <Text>TestScreen</Text>
        </View>
    )
    
};
