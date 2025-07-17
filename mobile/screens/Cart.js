import { View, Text, TouchableOpacity, FlatList} from 'react-native';
import tw from 'twrnc';
import Header from '../components/Header';
import { TruckIcon } from 'react-native-heroicons/outline';
import { useSelector } from 'react-redux';

export default function Cart() {
    const cartItems = useSelector(state => state.cart.cart);

    const renderItem = ({item}) => (
        <View style={tw`p-1 border-b`}>
            <Text>{item.name} - Quantity : {item.quantity}</Text>
        </View>
    );
    return (
        <View style={tw`mt-10 px-2`}>
            <Header />
            <Text style={tw`mt-2 text-2xl font-bold`}>Cart</Text>
            <View style={tw`relative w-full h-[76%]`}>
                {cartItems ? <View style={tw`flex p-2`}>
                    <FlatList 
                        data={cartItems}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />
                </View> : 
                <View style={tw`w-full h-full flex justify-center items-center`}>
                    <Text>None contained in the cart for the moment</Text>
                </View>}
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