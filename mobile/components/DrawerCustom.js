import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { View,Text, Image } from "react-native"
import { ArrowLeftStartOnRectangleIcon, UserIcon } from "react-native-heroicons/outline";

import tw from 'twrnc';

export default function DrawerCustom(props) {
    const navigation = useNavigation();

    return (
        <DrawerContentScrollView {...props}>
            <View style={tw`w-full flex flex-row items-center my-5`}>
                <Image 
                    source={require('../assets/User_icon_2.svg.png')}
                    style={tw`w-15 h-15`}
                />
                <Text style={tw`text-lime-500 text-xl font-bold`}>John Doe</Text>
            </View>
            {/* implement the inital list in DrawerNavigation */}
            {/* <DrawerItemList {...props}/> */}
            <DrawerItem
                label="Edit profile"
                icon={(color, size) => <UserIcon size={size} color={color}/>}
                onPress={() => navigation.navigate('Register')}
            />
            <DrawerItem 
                label="Log out"
                icon={(color, size) => <ArrowLeftStartOnRectangleIcon size={size} color={color}/>}
                onPress={() => navigation.navigate('Login')}
            />
        </DrawerContentScrollView>
    )
};
