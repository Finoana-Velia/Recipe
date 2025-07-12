import { useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity, View } from 'react-native';
import { BellIcon } from 'react-native-heroicons/outline';
import tw from 'twrnc';

export default function Header() {
    const navigation = useNavigation();

    return (
        <View style={tw`w-full flex flex-row justify-between items-center`}>
            <Image
                source={require('../assets/User_icon_2.svg.png')}
                style={tw`w-15 h-15 rounded-full`}
            />
            <Image
                source={require('../assets/Ginyard-removebg-preview.png')}
                style={tw`w-20 h-20 rounded`}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('Notification')}
            >
                <BellIcon size="30" strokeWidth={2} color='black'/>
            </TouchableOpacity>
        </View>
    )
    
};
