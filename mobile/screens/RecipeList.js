import { View, Text,Image, TextInput} from 'react-native';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import tw from 'twrnc';
import CategoryComponent from '../components/Recipe/CategoryComponent';

export default function RecipeList() {
    return (
        <View style={tw`mt-10 px-2`}>
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
            <CategoryComponent />
        </View>
    );
};
