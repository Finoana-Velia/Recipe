import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StatusBar, Image, StyleSheet, TouchableOpacity} from 'react-native';

import tw from 'twrnc';
import Cached from '../helpers/Image';
import { findById, recipeImage,chefImage } from '../API/RecipeAPI';
import { ChevronLeftIcon, HeartIcon, ShoppingCartIcon } from 'react-native-heroicons/outline';

export default function RecipeDetails(props) {
    
    // const id = props.route.params;
    const recipe = props.route.params;

    // const [recipe, setRecipe] = useState(null);
    const [isFavorite, setFavorite] = useState(false);
    const navigation = useNavigation();

    // useEffect(() => {
    //     findById(id).then(response => setTimeout(() => {
    //         console.log(response)
    //     },1000))
    // });

    return (
        // <View style={tw`w-full h-full items-center justify-center`}>
        //     <Text>Detail screen</Text>
        // </View>
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`flex`}
        >
            <StatusBar style='light'/>
            <View style={tw`flex flex-row justify-center`}>
                <Cached 
                    decorator={styles.image}
                    url={{ uri : recipeImage(recipe.id)}}
                />
            </View>
            <View style={tw`w-full absolute flex flex-row justify-between items-center pt-10`}>
                <TouchableOpacity style={tw`p-2 bg-white rounded-full m-5 flex justify-center items-center`}
                onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={28} strokeWidth={4.5} style={tw`text-lime-500`}/>
                </TouchableOpacity>
                <TouchableOpacity style={tw`p-2 bg-white rounded-full m-5 flex justify-center items-center`}>
                    <HeartIcon size={28} strokeWidth={4.5} style={isFavorite ? tw`text-red-500` : tw`text-slate-500`}/>
                </TouchableOpacity>
            </View>
            <View style={tw`px-2 pb-15`}>
                <View style={tw`w-full flex items-center flex-row justify-between my-3`}>
                    <Text style={tw`text-2xl text-lime-500 font-bold max-w-[50%]`}>
                        {recipe.name}
                    </Text>
                    <TouchableOpacity
                        style={tw`p-1 bg-lime-500 rounded flex flex-row items-center`}
                    >
                        <ShoppingCartIcon size={28} strokeWidth={2} style={tw`text-white`}/>
                        <Text style={tw`text-white`}>Add to cart</Text>
                    </TouchableOpacity>
                </View>
                <Text style={tw`text-slate-400 font-bold`}>{recipe.category}</Text>
                <View style={tw`mt-1`}>
                    <Text style={tw`text-xl font-bold`}>Ingredients</Text>
                    {recipe.ingredients ? 
                    recipe.ingredients.map((ingredient,index) => {
                        return (<Text key={index}
                        style={tw`text-amber-500 my-1`}
                        >{ingredient}</Text>)
                    }) : <Text>No ingredients</Text>}
                </View>
                <View style={tw`mt-1`}>
                    <Text style={tw`text-xl font-bold`}>Chef</Text>
                    <View style={tw`flex flex-row justify-content items-center gap-2`}>
                        <Image
                            style={tw`w-20 h-20 rounded-full bg-slate-300`}
                            source={{uri : chefImage(recipe.chef.id)}}
                        />
                        <Text style={tw`text-3xl text-lime-500 font-bold`}>{recipe.chef.name}</Text>
                    </View>
                    <Text>{recipe.chef.description}</Text>
                </View>
            </View>
        </ScrollView>
    )
    
};

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : 450,
        borderRadius : 20,
        borderTopRightRadius : 10,
        borderTopLeftRadius : 10,
        backgroundColor : 'silver'
    }
})
