import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecipeList from "../screens/RecipeList";
import Favorite from "../screens/Favorite";
import Cart from "../screens/Cart";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{headerShown : false}}
        >
            <Tab.Screen
                name="List"
                component={RecipeList}
                options={{
                    tabBarLabel : 'Home'
                }}
            />

            <Tab.Screen
                name="Favorite"
                component={Favorite}
                options={{
                    tabBarLabel : "Favorite"
                }}
            />

            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarLabel : "Cart"
                }}
            />
        </Tab.Navigator>
    );
}