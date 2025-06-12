import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Modal, Button, Touchable,
    KeyboardAvoidingView,Platform
 } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CameraIcon, PhotoIcon, TrashIcon, UserIcon, XMarkIcon } from 'react-native-heroicons/outline';
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc';
import { useState } from "react";

export default function RegsiterScreen() {

    const [image, setImage] = useState();
    const [display, setDisplay] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const deleteImage = () => {
        setImage(null);
        setDisplay(false);
        setModalVisible(false);
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
                    quality :1
                });
            }else {
                await ImagePicker.requestCameraPermissionsAsync();
                result = ImagePicker.launchCameraAsync({
                    cameraType : ImagePicker.CameraType.back,
                    allowsEditing : true,
                    aspect : [1,1],
                    quality : 1
                });
            }
            

            if(!result.canceled) {
                setImage((await result).assets[0].uri);
                setDisplay(true);
            }
            setModalVisible(false);
        } catch(error) {}
    };

    

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <TextInput
            placeholder="Entrez un texte"
            style={{
                height: 40,
                width: '80%',
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 20,
                paddingHorizontal: 10,
            }}
            /> */}
            <View style={tw`mx-2`}>
                <Text style={styles.label}>First name</Text>
                <TextInput 
                    style={styles.formControl}
                    placeholder="First name"
                />
            </View>
            <Button title="Valider" onPress={() => {}} />
        </View>
        </KeyboardAvoidingView>
//         <ScrollView
//             style={tw`bg-white flex p-5`}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{paddingBottom : 5}}
//         >
//             <Text style={tw`my-8 text-xl font-bold`}>Create an account</Text>
//             {/* <View style={tw`flex flex-row items-center gap-2`}>
//                 <UserIcon size={28} />
//                 <Text>Personal Info</Text>
//             </View> */}

//             <View style={tw`w-full flex justify-center items-center my-2`}>
//                 <View style={tw`relative border-2 border-slate-200 w-[35] h-[35] rounded-full`}>
//                     {display ? <Image
//                         source={{ uri : image}}
//                         style={tw`w-full h-full object-cover object-center rounded-full`}
//                     /> : <Image
//                         source={require('../assets/User_icon_2.svg.png')}
//                         style={tw`w-full h-full object-cover object-center`}
//                     />}
//                     {/* <TouchableOpacity 
//                         style={tw`absolute bottom-0 right-0 bg-white rounded-full p-1 border-2 border-lime-200`}
//                         onPress={uploadImage}
//                     >
//                         <CameraIcon size={30} style={tw`text-lime-500`}/>
//                     </TouchableOpacity> */}
//                     <TouchableOpacity 
//                         style={tw`absolute bottom-0 right-0 bg-white rounded-full p-1 border-2 border-lime-200`}
//                         onPress={() => setModalVisible(true)}
//                     >
//                         <CameraIcon size={30} style={tw`text-lime-500`}/>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//             <Modal
//                 transparent 
//                 visible={modalVisible}
//                 onRequestClose={() => setModalVisible(false)}
//                 animationType="fade"
//             >
//                 <View style={styles.modalBackground}>
//                     <View style={tw`relative bg-white w-[80%] p-5 rounded shadow-xl gap-5`}>
//                         <Text style={tw`text-center text-xl font-bold`}>Profile photo</Text>
//                         <View style={tw`flex flex-row justify-center items-center gap-5`}>
//                             <TouchableOpacity
//                                 onPress={() => uploadImage()}
//                                 style={tw`bg-slate-100 rounded flex justify-center items-center w-20 border border-slate-300`}
//                             >
//                                 <CameraIcon size={50} strokeWidth={2} color="#84cc16" />
//                                 <Text>Camera</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 onPress={() => uploadImage('gallery')}
//                                 style={tw`bg-slate-100 rounded flex justify-center items-center w-20 border border-slate-300`}
//                             >
//                                 <PhotoIcon size={50} strokeWidth={2} color="#84cc16" />
//                                 <Text style={tw`text-center`}>Gallery</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 onPress={() => deleteImage()}
//                                 style={tw`bg-slate-100 rounded flex justify-center items-center w-20 border border-slate-300`}
//                             >
//                                 <TrashIcon size={50} strokeWidth={2} color="#84cc16" />
//                                 <Text style={tw`text-center`}>Delete</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <TouchableOpacity style={tw`absolute top-0 right-0`} onPress={() => setModalVisible(false)}>
//                             <XMarkIcon size={20} strokeWidth={2} color="#000"/>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>

    
//             <View style={tw`mx-2`}>
//                 <Text style={styles.label}>First name</Text>
//                 <TextInput 
//                     style={styles.formControl}
//                     placeholder="First name"
//                 />
//             </View>
//             <View style={tw`mx-2`}>
//                 <Text style={styles.label}>Last name</Text>
//                 <TextInput 
//                     style={styles.formControl}
//                     placeholder="Last name"
//                 />
//             </View>

//             <View style={tw`mx-2`}>
//                 <Text style={styles.label}>Email address</Text>
//                 <TextInput 
//                     placeholder="Enter your mail address"
//                     style={styles.formControl}
//                     keyboardType="email-address"
//                 />
//             </View>

//             <View style={tw`mx-2`}>
//                 <Text style={styles.label}>Password</Text>
//                 <TextInput 
//                     secureTextEntry
//                     style={styles.formControl}
//                     placeholder="Last name"
//                 />
//             </View>

//             <View style={tw`mx-2`}>
//                 <Text style={styles.label}>Birthdate</Text>
//                 <TextInput 
//                     style={styles.formControl}
//                     placeholder="dd/mm/YYYY"
//                 />
//             </View>

//             <View style={tw`mx-2`}>
//                 <Text style={styles.label}>Postal code</Text>
//                 <TextInput 
//                     style={styles.formControl}
//                     placeholder="Postal code"
//                 />
//             </View>
            
//             {/* <View class={styles.formGroup}>
// +                    <Text style={styles.label}>Phone number</Text>
// +                    <View style={styles.formWrapper}>
// +                        <Text style={{width : '10%'}}>+261</Text>
// +                        <TextInput
// +                            placeholder="Enter your phone number"
// +                            keyboardType="numeric"
// +                            style={styles.formNumeric}
// +                        />
//                      </View>
//                  </View> */}
//             <View style={tw`mx-2`}>
//                 <Text style={styles.label}>Phone number</Text>
//                 <View style={styles.formWrapper}>
//                     <Text style={{ width : '10%'}}>+261</Text>
//                     {/* <TextInput
//                         placeholder="Enter your phone number"
//                         keyboardType="numeric"
//                         style={styles.formNumeric}
//                         formNumeric : {
//                             borderWidth : 1,
//                             width : '90%',
//                             borderRightColor : 'black',
//                             height : "100%",
//                             border : 'none'
//                         },
//                     /> */}
//                     <TextInput
//                         placeholder="Enter your phone number"
//                         keyboardType="numeric"
//                         style={tw`border-l w-[90%] h-full`}
//                     />
//                 </View>
//             </View>

//         </ScrollView>
    )
}

const styles = StyleSheet.create({
//     +    formGroup : {
// +        marginBottom : 20,
// +    },
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
    // formNumeric : {
    //     borderWidth : 1,
    //     width : '90%',
    //     borderRightColor : 'black',
    //     height : "100%",
    //     border : 'none'
    // },

    modalBackground : {
        flex : 1,
        backgroundColor : 'rgba(0,0,0,.5)', 
        justifyContent : 'center',
        alignItems : 'center'
    }
})