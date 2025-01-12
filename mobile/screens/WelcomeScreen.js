import { useNavigation } from "@react-navigation/native";
import { View,Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.main}>
            <Text style={styles.title}>Let's get started !</Text>
            <View>
                <Image 
                    source={require('../assets/Design_sans_titre-removebg-preview.png')}
                />
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register') }
                    style={styles.button}
                >
                    <Text style={{ textAlign : "center", fontWeight : 'bold', fontSize : 25}}>Sign Up</Text>
                </TouchableOpacity>
                <View style={{ marginTop : 10, marginLeft : 10, flexDirection : "row"}}>
                    <Text style={styles.text}>Already have an account ?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.link}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "#FFD4AC"
    },
    title : {
        color : "#FFF",
        fontWeight : 'bold',
        fontSize : 40,
        textAlign : 'center',
    },
    button : {
        padding : 10,
        backgroundColor : "#fff",
        marginHorizontal : 7,
        width : '90%',
        borderRadius : 5,
    },
    text : {
        color : "#FFF",
        fontSize : 20,
    },
    link : {
        color : "#FFF",
        fontSize : 20,
        fontWeight : 'bold'
    }
})