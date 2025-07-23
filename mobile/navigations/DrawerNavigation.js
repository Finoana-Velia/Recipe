import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen";
import TestScreen from "../screens/TestScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Test" component={TestScreen} />
        </Drawer.Navigator>
    )
};
