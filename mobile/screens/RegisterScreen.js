import { View, Text, StyleSheet, TextInput } from "react-native";

export default function RegsiterScreen() {
    return (
        <View style={styles.container}>
            <View style={{ flex : 1, marginHorizontal : 20}}>
                <View style={{marginVertical : 20}}>

                </View>
                <Text style={styles.title}>Create an account</Text>
                <Text style={styles.paragraph}>Fill the field</Text>

                <View style={{marginTop : 20}}>
                <View class={styles.formGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.formControl}
                        placeholder="Enter your mail address"
                        keyboardType="email-address"
                    />
                </View>

                <View class={styles.formGroup}>
                    <Text style={styles.label}>Phone number</Text>
                    <View style={styles.formWrapper}>
                        <Text style={{width : '10%'}}>+261</Text>
                        <TextInput
                            placeholder="Enter your phone number"
                            keyboardType="numeric"
                            style={styles.formNumeric}
                        />
                    </View>
                </View>

                <View class={styles.formGroup}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.formControl}
                        placeholder="Enter your password"
                        secureTextEntry
                    />
                </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#FFF'
    },
    title : {
        fontSize : 20,
        fontWeight : 'bold',
        marginVertical : 10,
        color : 'black'
    },
    paragraph : {
        fontSize : 15,
        color : 'black'
    },
    formGroup : {
        marginBottom : 20,
    },
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
    formNumeric : {
        borderWidth : 1,
        width : '90%',
        borderRightColor : 'black',
        height : "100%"
    }
})