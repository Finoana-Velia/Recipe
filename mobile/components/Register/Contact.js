import {Text, View} from 'react-native';
import tw from 'twrnc';

export default function Contact() {
    return (
        <View style={tw`flex w-full h-full justify-center items-center`}>
            <Text>Welcome to the Contact form!</Text>
        </View>
    );
}