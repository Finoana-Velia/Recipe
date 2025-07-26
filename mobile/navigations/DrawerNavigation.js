import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerCustom from "../components/DrawerCustom";
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
