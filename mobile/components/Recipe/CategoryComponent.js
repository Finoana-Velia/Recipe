import { ScrollView, TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import {Category} from "../../models/Category";
import { Text } from "react-native";

import tw from 'twrnc';

export default function CategoryComponent() {
    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={tw`py-2 w-full flex items-center items-center`}
            >
                {Category.map((category, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={tw`bg-lime-500 rounded-full p-1 flex justify-center items-center mx-1`}
                        >
                            <Text style={tw`text-white`}>{category.label}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </Animated.View>
    )
};
