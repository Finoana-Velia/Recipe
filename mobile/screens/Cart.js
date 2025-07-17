import { View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import Header from '../components/Header';
import { TruckIcon } from 'react-native-heroicons/outline';

export default function Cart() {
    return (
        <View style={tw`mt-10 px-2`}>
            <Header />
            <View style={tw`relative w-full h-[82%]`}>
                <Text style={tw`mt-2 text-2xl font-bold`}>Cart</Text>
                <View style={tw`absolute bottom-0 flex w-full justify-center`}>
                    <Text>Subtotal : 5 $</Text>
                    <Text>Discount : 5 $</Text>
                    <Text>Total : 10 $</Text>
                    <TouchableOpacity
                        style={tw`absolute right-0 flex justify-center items-center bg-lime-500 rounded-full w-11 h-11 shadow`}
                    >
                        <TruckIcon size={30} style={tw`text-white`}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};