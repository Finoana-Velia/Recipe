import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterNavigation from "./RegisterNavigation";
// import RegsiterScreen from "../screens/RegisterScreen";


const Stack = createStackNavigator();

export default function AuthNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown : false}}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}