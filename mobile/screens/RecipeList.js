import { View, Text,Image, TextInput, ScrollView, StatusBar,} from 'react-native';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import tw from 'twrnc';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Category } from '../models/Category';
import { TouchableOpacity } from 'react-native';
import { useEffect,useState } from 'react';
import { searchRecipe } from '../API/RecipeAPI';
import Loading from '../components/Loading';
import List from '../components/Recipe/List';
import Card from '../components/Recipe/Card';


export default function RecipeList() {

    const [data, setData] = useState(null);

    useEffect(() => {
        searchRecipe("").then(
            response => {
                setTimeout(() => {
                    setData(response);
                },2000)
            }
        );
    },[]);

    return (
        <View style={tw`mt-10 px-2`}>
            <StatusBar style='dark'/>
            <ScrollView>
                <View style={tw`w-full flex flex-row justify-between items-center`}>
                    <Image
                        source={require('../assets/User_icon_2.svg.png')}
                        style={tw`w-15 h-15 rounded-full`}
                    />
                    <Image
                        source={require('../assets/Ginyard-removebg-preview.png')}
                        style={tw`w-20 h-20 rounded`}
                    />
                    <BellIcon size="30" strokeWidth={2} color='black'/>
                </View>
                
                <View style={tw`flex flex-row bounded bg-slate-200`}>
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor={'gray'}
                        style={tw`text-xl flex pl-2 rounded`}
                    />
                    <MagnifyingGlassIcon size={20} strokeWidth={3} 
                    color='gray' style={tw`rounded-full my-auto`}/>
                </View>
                {/* <CategoryComponent /> */}
                <Animated.View entering={FadeInDown.duration(500).springify()}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={tw`py-2 w-full flex items-center`}
                    >
                        {Category.map((category,index) => {
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
                {data ? <List recipes={data.content}/> : <Loading />}
            </ScrollView>
        </View>
    );
};
