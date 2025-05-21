import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View,Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Animated,{ useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import tw from 'twrnc';

export default function WelcomeScreen() {

    const navigation = useNavigation();

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const handlePress = () => {
        translateX.value += 10;
        translateY.value += 10;
    }

    useEffect( () => {
        translateX.value = 0;
        translateY.value = 0;
        setTimeout(handlePress,100);
    },[]);

    const animatedStyles = useAnimatedStyle(() => ({
        transform : [
            {translateX : withSpring(translateX.value * 2)},
            {translateY : withSpring(translateY.value * 2)}
        ]
    }));

    return (
        <View style={styles.main}>
            <StatusBar style="light"/>
            <Text></Text>
            <View style={styles.container}>
                <Animated.View style={[styles.content, animatedStyles]}>
                    <Image 
                        source={require('../assets/Ginyard-removebg-preview.png')}
                        style={styles.logo}
                    />
                    </Animated.View>
            </View>
            <View style={styles.welcome}>
                <Text style={styles.title}>Welcome to the App</Text>
            </View>
            <View style={tw`mt-5 w-full px-10`}>
                <TouchableOpacity 
                    style={tw`w-full p-2 bg-white flex items-center justify-center rounded h-11`}
                    onPress={() => navigation.navigate('Login')}    
                >
                    <Text style={tw`text-xl font-bold`}>Sign In</Text>
                </TouchableOpacity>
                <View style={tw`mt-5 flex flex-row gap-2`}>
                    <Text style={tw`text-white`}>Don't have an account ?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={tw`text-md text-white font-bold`}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        //marginTop : 40, space-y-10 16 x 2.5rem = 40px
        backgroundColor : '#84cc16'
    },
    container : {
        borderRadius : 50,
        backgroundColor : '#fff',
        width : 200,
        height : 200,
        //padding :20,
    },
    content : {
        borderRadius : 50,
        backgroundColor : '#ff9',
        width : 200,
        height : 200,
        //padding : 30
    },
    welcome : {
        alignItems : 'center',
        marginTop : 32
    },
    logo : {
        flex : 1,
        justifyContent : 'center',
        aligItems : 'center',
        width : 200,
        height : 200,
        resizeMode : 'cover'
    },
    title : {
        fontSize : 30,
        fontWeight : 'bold',
        color : '#fff'
    },
    text : {
        fontSize : 25,
        color : 'white'
    },
})