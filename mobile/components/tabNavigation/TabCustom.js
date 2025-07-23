import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from "react-native";
import { HeartIcon, HomeIcon, ShoppingCartIcon, UserIcon } from "react-native-heroicons/outline";

export default function TabCustom({state, descriptors, navigation}) {

    const icons = (name,props) => {
        if(name == 'List') {
            return (
                <HomeIcon size={30} {...props}/>
            )
        }else if(name == 'Favorite') {
            return (
                <HeartIcon size={30} {...props}/>
            )
        } else if(name == 'Cart') {
            return (
                <ShoppingCartIcon size={30} {...props}/>
            )
        }
        else if(name == 'Profile') {
            return (
                <UserIcon size={30} {...props} />
            )
        }
    }

    return (
        <View style={styles.tabbar}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label = options.tabBarLabel ? options.tabBarLabel : route.name

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type : 'tabPress',
                        target : route.key,
                        canPreventDefault : true,
                    });
                    if(!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type : 'tabLongPress',
                        target : route.key
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        accessibilityRole='button'
                        accessibilityState={isFocused ? {selected : true} : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabItem}
                    >
                        {icons(route.name, {
                            color : isFocused ? '#f59e0b' : '#222'
                        })}
                        <Text style={{color : isFocused ? '#f59e0b' : '#222'}}>{label}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
};

const styles = StyleSheet.create({
    tabbar : {
        position : 'absolute',
        bottom : 55,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        backgroundColor : 'white',
        marginHorizontal : 20,
        paddingVertical : 5,
        borderRadius : 25,
        borderCurve : 'continuous',
        shadowColor : 'black',
        shadowOffset : {width : 0, height : 10},
        shadowOpacity : 10,
        shadowOpacity : 0.1
    },
    tabItem : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        gap : 4
    }
})