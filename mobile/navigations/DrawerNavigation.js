import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen";
import TestScreen from "../screens/TestScreen";
import DrawerCustom from "../components/DrawerCustom";
import { View } from "react-native";
import TabNavigation from "./TabNavigation";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
    return (
        <Drawer.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerShown : false,
                drawerStatusBarAnimation : 'fade',
                drawerType : 'back'
            }}
            drawerContent={(props) => <DrawerCustom {...props} />}
        >
            <Drawer.Screen name="Main" component={TabNavigation} />
        </Drawer.Navigator>
    )
};
