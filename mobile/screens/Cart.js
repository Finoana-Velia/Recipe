import { View, Text, TouchableOpacity, FlatList} from 'react-native';
import tw from 'twrnc';
import Header from '../components/Header';
import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon, TruckIcon } from 'react-native-heroicons/outline';
import { useDispatch, useSelector } from 'react-redux';
import Cached from '../helpers/Image';
import { recipeImage } from '../API/RecipeAPI';
import { addToCart, decrement, removeToCart } from '../reducer/CartActions';
import { Swipeable } from 'react-native-gesture-handler';

export default function Cart() {
    const cartItems = useSelector(state => state.cart.cart);

    const dispatcher = useDispatch();
    
    const deleteFromCart = (id) => (
        <TouchableOpacity 
            style={tw`w-15 bg-red-500 flex justify-center items-center`}
            onPress={() => dispatcher(removeToCart(id))}
        >
            <TrashIcon style={tw`text-white`}/>
        </TouchableOpacity>
    )

    const renderItem = ({item}) => (
        <Swipeable renderRightActions={() => deleteFromCart(item.id)}>
            <View style={tw`p-1 border-b border-slate-200 flex flex-row justify-between`}>
                <Cached
                    decorator={{
                        width : 90,
                        height : 90,
                        borderRadius : 10
                    }}
                    url={{ uri : recipeImage(item.id) }}
                />
                <View style={tw`w-[50%] flex flex-col gap-2 pl-1`}>
                    <Text style={tw`text-lime-500 text-md font-bold`}>{item.name}</Text>
                    <Text style={tw`text-slate-400 font-bold`}>{item.category}</Text>
                    <Text style={tw`text-lime-400 font-bold`}>$ {item.price}</Text>
                </View>
                <View style={tw`flex flex-row justify-center items-center gap-2`}>
                    <TouchableOpacity 
                        style={tw`flex bg-white justify-center items-center shadow-sm rounded-full`}
                        onPress={() => dispatcher(decrement(item.id))}    
                    >
                        <MinusIcon size={30}/>
                    </TouchableOpacity>
                    <Text>{item.quantity}</Text>
                    <TouchableOpacity
                        onPress={() => dispatcher(addToCart(item))} 
                        style={tw`flex bg-white justify-center items-center shadow rounded-full`}
                    >
                        <PlusIcon size={30}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Swipeable>
    );
    return (
        <View style={tw`mt-10 px-2`}>
            <Header />
            <Text style={tw`flex jsustify-center items-center mt-2 text-2xl font-bold`}><ShoppingCartIcon strokeWidth={2.5}/> Cart</Text>
            <View style={tw`relative w-full h-[80%] pb-25`}>
                {cartItems.length !== 0 ? <View style={tw`flex p-2`}>
                    <FlatList 
                        data={cartItems}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />
                </View> : 
                <View style={tw`w-full h-full flex justify-center items-center h-[76%]`}>
                    <Text>None contained in the cart for the moment</Text>
                </View>}
                <View style={tw`flex flex-row justify-between`}>
                    <View>
                        <Text>Subtotal : 5 $</Text>
                        <Text>Discount : 5 $</Text>
                        <Text>Total : 10 $</Text>
                    </View>
                    <TouchableOpacity
                        style={tw`flex justify-center items-center bg-lime-500 rounded-full w-11 h-11 shadow`}
                    >
                        <TruckIcon size={30} style={tw`text-white`}/>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    );
};