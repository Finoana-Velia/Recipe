import { useNavigation } from '@react-navigation/native';
import {KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { MapPinIcon } from 'react-native-heroicons/outline';
import tw from 'twrnc';
export default function Location() {

    const navigation = useNavigation();

    const redirectNextStep = () => {
        navigation.navigate('contact');
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex : 1}}
        >
            <View style={tw`flex justify-Center py-10 px-5`}>
                <View style={tw`w-full flex flex-row items-center gap-2`}>
                    <MapPinIcon size={28}/>
                    <Text>Location</Text>
                </View>
                <View style={tw`mx-2 w-full`}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={styles.formControl}
                        placeholder="Ex : 109 Garden Road"
                    />
                </View>
                <View style={tw`mx-2 w-full`}>
                    <Text style={styles.label}>City</Text>
                    <TextInput
                        style={styles.formControl}
                        placeholder="Ex : Antananarivo"
                    />
                </View>
                <View style={tw`mx-2 w-full`}>
                    <Text style={styles.label}>Province/State</Text>
                    <TextInput
                        style={styles.formControl}
                        placeholder="Ex : Analamanga"
                    />
                </View>
                <View style={tw`pl-2 my-3 w-full`}>
                    <TouchableOpacity
                        onPress={redirectNextStep}
                        style={tw`p-3 bg-lime-500 rounded`}
                    >
                        <Text style={tw`text-center text-white font-bold`}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    label : {
        fontSize : 15,
        fontWeight : 400,
        marginVertical : 8
    },
    formControl : {
        width : '100%',
        height : 50,
        borderRadius : 8,
        borderWidth : 1,
        paddingLeft : 20,
        fontSize : 15
    },
})