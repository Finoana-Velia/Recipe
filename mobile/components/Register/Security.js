import { useNavigation } from '@react-navigation/native';
import {KeyboardAvoidingView,TextInput ,Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { LockClosedIcon } from 'react-native-heroicons/outline';
import tw from 'twrnc';
export default function Security() {
    
    const navigation = useNavigation();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex : 1}}
        >
            <View style={tw`flex justify-center py-10 mx-5`}>

                 <View style={tw`w-full flex flex-row items-center gap-2`}>
                    <LockClosedIcon size={28}/>
                    <Text>Security</Text>
                </View>

                <View style={tw`mx-2 w-full`}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.formControl}
                    />
                </View>
                <View style={tw`mx-2 w-full`}>
                    <Text style={styles.label}>Current password</Text>
                    <TextInput
                        style={styles.formControl}
                        secureTextEntry
                    />
                </View>
                <View style={tw`mx-2 w-full`}>
                    <Text style={styles.label}>New password</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.formControl}
                    />
                </View>
                <View style={tw`mx-2 w-full`}>
                    <Text style={styles.label}>Last password</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.formControl}
                    />
                </View>

                <View style={tw`w-full m-2`}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={tw`p-3 bg-lime-500 rounded`}
                    >
                        <Text style={tw`text-white text-center font-bold`}>Finish</Text>
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