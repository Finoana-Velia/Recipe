import { useNavigation } from '@react-navigation/native';
import {KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { LinkIcon } from 'react-native-heroicons/outline';
import tw from 'twrnc';

export default function Contact() {
    const navigation = useNavigation();
    
        const redirectNextStep = () => {
            navigation.navigate('security');
        }
    
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex : 1}}
            >
                <View style={tw`flex justify-center py-10 px-5`}>
                    <View style={tw`w-full flex flex-row items-center gap-2`}>
                        <LinkIcon size={28}/>
                        <Text>Contact</Text>
                    </View>
                    <View style={tw`mx-2 w-full`}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.formControl}
                            placeholder="Ex : johndoe@example.com"
                        />
                    </View>
                    <View style={tw`mx-2 w-full`}>
                        <Text style={styles.label}>Phone number</Text>
                        <View style={styles.formWrapper}>
                            <Text style={{width : '10%'}}>+261</Text>
                            <TextInput
                                placeholder="XX XX XXX XX"
                                keyboardType='numeric'
                                style={styles.formNumeric}
                            />
                        </View>
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
        formWrapper : {
            width : '100%',
            height : 50,
            borderRadius : 8,
            borderWidth : 1,
            paddingLeft : 5,
            flexDirection : 'row',
            justifyContent : 'space-between',
            alignItems : 'center'
        },
        formNumeric : {
            width : '90%',
            borderLeftColor : 'black',
            borderLeftWidth : 1,
            height : '100%',
        }
    })