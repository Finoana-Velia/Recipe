import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import { MapPinIcon } from "react-native-heroicons/outline";
import Animated, { BounceInUp, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { useDispatch } from "react-redux";

import tw from 'twrnc';
import { emptyCart } from "../reducer/CartActions";

export default function Order(props) {

    const params = props.route.params;

    const navigation = useNavigation();

    const dispatcher = useDispatch();

    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    useEffect(() => {
        scale.value = withRepeat(
            withTiming(2, {
                duration : 1000,
                easing : Easing.out(Easing.ease)
            }),
            -1,false
        );

        opacity.value = withRepeat(
            withTiming(1,{
                duration : 1000,
                easing : Easing.out(Easing.ease),
            }),
            -1,false
        );
    },[]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform : [{ scale : scale.value }],
            opacity : opacity.value
        };
    });

    const confirm = () => {
        dispatcher(emptyCart());
        navigation.navigate('Home');
    }

    return (
        
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex : 1}}
        >
            <View style={tw`flex justify-center items-center w-full h-full gap-5`}>
                <Animated.View entering={BounceInUp} >
                    <Animated.View style={[animatedStyle]}>
                        <MapPinIcon size={50} strokeWidth={2} style={tw`text-lime-500`}/>
                    </Animated.View>
                </Animated.View>
                
                <Text style={tw`text-2xl font-bold my-5`}>Give the delivery location</Text>
                <View style={tw`mx-3 p-3 border flex justify-center items-center gap-2`}>
                    <View style={tw`w-full flex flex-row justify-between items-center`}>
                        <Text>Subtotal : </Text><Text>{params.subtotal} $</Text>
                    </View>
                    <View style={tw`w-full flex flex-row justify-between items-center`}>
                        <Text>Discount ({params.discount} %): </Text><Text>{params.discountValue} $</Text>
                    </View>
                    <View style={tw`w-full flex flex-row justify-between items-center`}>
                        <Text>Delivery fee : </Text><Text>{params.deliveryFee} $</Text>
                    </View>
                    <View style={tw`w-full flex flex-row justify-between items-center border-t border-slate-400`}>
                        <Text>Total : </Text><Text>{params.total} $</Text>
                    </View>
                </View>
                <View style={tw`w-full px-3`}>
                    <TextInput 
                        placeholder="Ex : 109 Garden Road"
                        style={tw`border border-slate-400 rounded p-2`}
                    />
                    <TouchableOpacity 
                        onPress={() => confirm()}
                        style={tw`bg-lime-500 p-1 my-1 rounded flex justify-center items-center`}
                    >
                        <Text style={tw`text-white`}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};
