import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Personal from "../components/Register/Personal";
import Location from "../components/Register/Location";
import Contact from "../components/Register/Contact";
import Security from "../components/Register/Security";
import { View,Text } from "react-native";

import tw from 'twrnc';


const Stack = createStackNavigator();

export default function RegisterNavigation() {
    return (
        <View style={tw`bg-white flex p-5 w-full h-full`}>
            <Text style={tw`my-8 text-xl font-bold`}>Create an account</Text>
            <Stack.Navigator initialRouteName="personal" screenOptions={{headerShown : false}}>
                <Stack.Screen name="personal" component={Personal}/>
                <Stack.Screen name="location" component={Location} />
                <Stack.Screen name="contact" component={Contact} />
                <Stack.Screen name="security" component={Security} />
            </Stack.Navigator>
        </View>
    )
}