import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecipeList from "../screens/RecipeList";
import Favorite from "../screens/Favorite";
import Cart from "../screens/Cart";

import { HeartIcon, HomeIcon, ShoppingCartIcon, UserIcon, } from "react-native-heroicons/outline";

import TabCustom from "../components/tabNavigation/TabCustom";
import ProfileScreen from "../screens/ProfileScreen";
import DrawerNavigation from "./DrawerNavigation";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{headerShown : false}}
            tabBar={props => <TabCustom {...props}/>}
        >
            <Tab.Screen
                name="List"
                component={RecipeList}
                options={{
                    tabBarLabel : 'Home',
                    tabBarIcon : () => {
                        return (
                            // <HomeIcon size={25} strokeWidth={2} color='#222'/>
                            <HomeIcon size={25} strokeWidth={2} color='#222'/>
                        )
                    }
                }}
            />

            <Tab.Screen
                name="Favorite"
                component={Favorite}
                // component={FavoriteList}
                options={{
                    tabBarLabel : "Favorite",
                    tabBarIcon : () => {
                        return(
                            <HeartIcon size={25} strokeWidth={2} color='#222' />
                        )
                    }
                }}
            />

            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarLabel : "Cart",
                    tabBarIcon : () => {
                        return (
                            <ShoppingCartIcon size={25} strokeWidth={2} color='#222'/>
                        )
                    }
                }}
            />

            {/* <Tab.Screen
                name="User"
                component={DrawerNavigation}
                options={{
                    tabBarLabel : "User",
                    tabBarIcon : () => {
                        return (
                            <UserIcon size={25} strokeWidth={2} color="#222"/>
                        )
                    }
                }}
            /> */}
        </Tab.Navigator>
    );
}