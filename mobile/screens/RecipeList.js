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
import Header from '../components/Header';


export default function RecipeList() {

    const [response, setResponse] = useState(null);
    const [data, setData] = useState([]);

    const [text, setText] = useState("");

    useEffect(() => {
        searchRecipe("").then(
            response => {
                setTimeout(() => {
                    setResponse(response);
                    setData(response.content);
                },2000)
            }
        );
    },[]);

    const filterRecipeList = (category = "") => {
        searchRecipe("").then(response => {
            if(category !== "") {
                setData(response.content.filter(item => item.category === category));
            }else {
                setData(response.content);
            }
        })
    }

    const onSearch = (text) => {
        searchRecipe(text).then(response => {
            setResponse(response);
            setData(response.content);
        })
    }

    const onLoad = () => {
        searchRecipe(text).then(response => {
            setResponse(response);
            setData(response.content);
        })
    }

    return (
        <View style={tw`mt-10 px-2`}>
            <StatusBar style='dark'/>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Header />
                
                <View style={tw`flex flex-row rounded bg-slate-200`}>
                    <TextInput
                        onChangeText={(text) => onSearch(text)}
                        onSubmitEditing={() => onLoad}
                        placeholder='Search'
                        placeholderTextColor={'gray'}
                        style={tw`text-xl flex pl-2 rounded w-[90%]`}
                    />
                    <MagnifyingGlassIcon size={20} strokeWidth={3} 
                    color='gray' style={tw`rounded-full my-auto`}/>
                </View>
                <Animated.View entering={FadeInDown.duration(500).springify()}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={tw`py-5`}
                        // contentContainerStyle={tw`py-5 w-full flex items-center`}
                    >
                        <TouchableOpacity
                            onPress={() => filterRecipeList()}
                            style={tw`bg-lime-500 rounded-full py-1 px-5 flex justify-center items-center mx-1`}
                        >
                                <Text style={tw`text-white`}>All</Text>
                        </TouchableOpacity>
                        {Category.map((category,index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => filterRecipeList(category.value)}
                                    style={tw`bg-lime-500 rounded-full py-1 px-5 flex justify-center items-center mx-1`}
                                >
                                    <Text style={tw`text-white`}>{category.label}</Text>
                                </TouchableOpacity>
                            )
                        })}

                    </ScrollView>
                </Animated.View>
                {response ? <List recipes={data}/> : <Loading />}
            </ScrollView>
        </View>
    );
};
