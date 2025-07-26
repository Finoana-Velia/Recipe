import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterNavigation from "./RegisterNavigation";
import RecipeDetails from "../screens/RecipeDetails";
import Notification from "../screens/Notification";
import DrawerNavigation from "./DrawerNavigation";
import Order from "../screens/Order";
// import RegsiterScreen from "../screens/RegisterScreen";


const Stack = createStackNavigator();

export default function AuthNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown : false}}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterNavigation} />
                <Stack.Screen name="Home" component={DrawerNavigation} />
                <Stack.Screen name="Detail" component={RecipeDetails} />
                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen name="Order" component={Order} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}