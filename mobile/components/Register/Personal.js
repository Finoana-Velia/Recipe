import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, Platform, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { CameraIcon, PhotoIcon, TrashIcon, UserIcon, XMarkIcon } from "react-native-heroicons/outline";

import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Personal() {
 const navigation = useNavigation();

    const [display, setDisplay] = useState(false);
    const [image, setImage] = useState();
    const [modal,toggleModal] = useState(false);
    
    const deleteImage = () => {
        setImage(null);
        setDisplay(false);
        toggleModal(false);
    } 

    const uploadImage = async (mode = "") => {
        try {
            let result = {};
            if(mode === 'gallery') {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = ImagePicker.launchImageLibraryAsync({
                    mediaTypes : ImagePicker.MediaTypeOptions.Images,
                    allowsEditing : true,
                    aspect : [1,1],
                    quality : 1
                });
            }else {
                await ImagePicker.requestCameraPermissionsAsync();
                result = ImagePicker.launchCameraAsync({
                    cameraType : ImagePicker.CameraType.back,
                    allowsEditing : true,
                    aspect : [1,1],
                    quality : 1
                })
            }

            if(!result.canceled) {
                setImage((await result).assets[0].uri);
                setDisplay(true);
            }
            toggleModal(false);
        }catch(error) {}
    }

    const [dateOfBirth, setDateOfBirth] = useState("");
    const [date, setDate] = useState(new Date());
    const [show , setShow] = useState(false);

    const toggleDatePicker = () => {
        setShow(!show);
    }

    const onChange = ({type}, selectDate) => {
        if(type == "set") {
            const currentDate = selectDate;
            setDate(currentDate);
            if(Platform.OS === "android") {
                toggleDatePicker();
                setDateOfBirth(currentDate.toDateString());
            }
        }else {
            toggleDatePicker();
        }
    }

    const confirmDateOnIos = () => {
        setDateOfBirth(date.toDateString());
        toggleDatePicker();
    }

    const redirectNextStep = () => {
        // form validate
        navigation.navigate('location');
    }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        >
        <View style={{ flex: 1, justifyContent : 'center',alignItems: 'center', paddingHorizontal : 10}}>
            <Text style={tw`font-bold text-xl`}>Create an user</Text>
            <View style={tw`w-full flex flex-row items-center gap-2`}>
                <UserIcon size={28}/>
                <Text>Personal info</Text>
            </View>
            <View style={tw`flex justify-center items-center my-2`}>
                <View style={tw`relative border-2 border-lime-200 w-[35] h-[35] rounded-full`}>
                    {display ? <Image
                        source={{ uri : image }}
                        style={tw`w-full h-full object-cover object-center rounded-full`}
                    /> : <Image
                        source={require('../../assets/User_icon_2.svg.png')}
                        style={tw`w-full h-full object-cover object-center rounded-full`}
                    />}
                    <TouchableOpacity
                        style={tw`absolute bottom-0 right-0 bg-white rounded-full p-1 border-2 border-lime-200`}
                        onPress={() => toggleModal(true)}
                    >
                        <CameraIcon size={30} style={tw`text-lime-500`}/>
                    </TouchableOpacity>
                </View>
            </View>
                    
            <Modal
                transparent
                visible={modal}
                animationType="fade"
                onRequestClose={() => toggleModal(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={tw`relative bg-white w-[80%] p-5 rounded shadow-xl gap-5`}>
                        <Text style={tw`text-center text-xl font-bold`}>Profile photo</Text>
                        <View style={tw`flex flex-row justify-center items-center gap-5`}>
                            <TouchableOpacity
                                onPress={() => uploadImage()}
                                style={tw`bg-slate-100 rounded flex justify-center items-center w-20 border-slate-300`}
                            >
                                <CameraIcon size={50} strokeWidth={2} color='#84cc16'/>
                                <Text>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => uploadImage('gallery')}
                                style={tw`bg-slate-100 rounded flex justify-center items-center w-20 border-slate-300`}
                            >
                                <PhotoIcon size={50} strokeWidth={2} color='#84cc16'/>
                                <Text>Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => deleteImage()}
                                style={tw`bg-slate-100 rounded flex justify-center items-center w-20 border-slate-300`}
                            >
                                <TrashIcon size={50} strokeWidth={2} color='#84cc16'/>
                                <Text>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={tw`absolute top-0 right-0`}
                            onPress={() => toggleModal(false)}
                        >
                            <XMarkIcon size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            <View style={tw`mx-2 w-full`}>
                <Text style={styles.label}>First name</Text>
                <TextInput 
                    style={styles.formControl}
                    placeholder="First name"
                />
            </View>
            <View style={tw`mx-2 w-full`}>
                <Text style={styles.label}>Last name</Text>
                <TextInput 
                    style={styles.formControl}
                    placeholder="Last name"
                />
            </View>

            <View style={tw`mx-2 w-full`}>
                <Text style={styles.label}>Date of birth</Text>
               {show && (
                <DateTimePicker
                    value={date}
                    mode="date" // "time" or "datetime"
                    display="sipnner" // "spinner" or "calendar", "default"
                    onChange={onChange}
                    style={{height : 120, martinTop : -10}}
                />
               )}
               {show && Platform.OS === "ios" && (
                    <View style={tw`flex-row justify-around`}>
                        <TouchableOpacity
                            style={tw`p-3 bg-slate-200 rounded`}
                            onPress={toggleDatePicker}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={tw`p-3 bg-blue-500 rounded`}
                            onPress={confirmDateOnIos}
                        >
                            <Text>Confirm</Text>
                        </TouchableOpacity>
                    </View>
               )}

               {!show && (
                    <Pressable onPress={toggleDatePicker}>
                        <TextInput
                            style={styles.formControl}
                            placeholder="Birth date"
                            value={dateOfBirth}
                            onChangeText={setDateOfBirth}
                            editable={false}
                            onPressIn={toggleDatePicker}
                        />
                    </Pressable>
               )}
            </View>

            <View style={tw`mx-2 w-full`}>
                <Text style={styles.label}>Gender</Text>
                <View style={tw`border rounded`}>
                    <RNPickerSelect
                        placeholder={{label : "Select gender", value : null}}
                        onValueChange={(value) => console.log(value)}
                        items={[
                            {label : "Man", value : "MAN"},
                            {label : "Woman", value : "WOMAN"},
                        ]}
                    />
                </View>
            </View>
            
            <View style={tw`px-2 my-3 w-full`}>
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
        marginVertical : 8,
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
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : 'center'
    },
    modalBackground : {
        flex : 1,
        backgroundColor : 'rgba(0,0,0,.5)', 
        justifyContent : 'center',
        alignItems : 'center'
    }
})