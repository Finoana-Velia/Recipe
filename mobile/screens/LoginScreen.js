import { useNavigation } from "@react-navigation/native";
import { View, Text, Platform, StyleSheet, KeyboardAvoidingView, Image, TextInput, TouchableOpacity } from "react-native";

import tw from 'twrnc';

export default function LoginScreen() {
    const navigation = useNavigation();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex : 1}}
        >
            
            <View style={tw`flex justify-center items-center`}>
                <View style={tw`rounded-full w-80 h-80`}>
                    <Image
                        source={require('../assets/Ginyard-removebg-preview.png')}
                        style={tw`w-full h-full rounded-full`}
                    />
                </View>   
                <Text style={tw`font-bold text-xl mx-2`}>Login</Text>
                <View style={tw`px-2 mx-2 w-full`}>
                    <Text style={styles.label}>Username or Email</Text>
                    <TextInput
                        style={styles.formControl}
                    />
                </View>
                <View style={tw`px-2 mx-2 w-full`}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.formControl}
                    />
                </View>
                <TouchableOpacity
                    style={tw`my-2`}
                >
                    <Text style={tw`text-blue-500`}>Forgot password ?</Text>
                </TouchableOpacity>
                <View style={tw`px-2 w-full`}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        style={tw`p-3 bg-lime-500 rounded`}
                    >
                        <Text style={tw`text-center text-white font-bold`}>Connect</Text>
                    </TouchableOpacity>
                </View>
                <View style={tw`flex flex-row justify-between items-center px-2 mt-5`}>
                    <View style={tw`w-[45%] border border-slate-300`}></View>
                    <Text style={tw`w-[10%] text-slate-300 font-bold text-center`}>OR</Text>
                    <View style={tw`w-[45%] border border-slate-300`}></View>
                </View>
                <View style={tw`flex flex-row justify-around items-center px-2 w-full mt-5`}>
                    <TouchableOpacity
                        style={tw`w-11 h-11 rounded-full`}
                    >
                        <Image
                            source={require('../assets/Google__G__logo.svg.png')}
                            style={tw`w-full h-full`}
                        />
                    </TouchableOpacity>
                     <TouchableOpacity
                        style={tw`w-11 h-11 rounded-full`}
                    >
                        <Image
                            source={require('../assets/747.png')}
                            style={tw`w-full h-full`}
                        />
                    </TouchableOpacity>
                     <TouchableOpacity
                        style={tw`w-11 h-11 rounded-full`}
                    >
                        <Image
                            source={require('../assets/Microsoft_icon.svg.png')}
                            style={tw`w-full h-full`}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    label : {
        fontSize : 15,
        fontWeight : 400,
        marginVertical : 8,
    },
    formControl : {
        width : '100%',
        height : 50,
        borderRadius : 8,
        borderWidth : 1,
        paddingLeft : 20,
        fontSize : 15
    }
})


