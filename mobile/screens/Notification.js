import { FlatList, Text, TouchableOpacity, View,Image } from 'react-native';
import { BellIcon, TrashIcon, TruckIcon } from 'react-native-heroicons/outline';
import { notifications } from '../helpers/notifs';
import tw from 'twrnc';
import { Swipeable } from 'react-native-gesture-handler';
import { useState } from 'react';

export default function Notification() {

    
    // let data = notifications;
    const [data, setData] = useState(notifications);

    const deleteNotif = (id) => (
        <TouchableOpacity
            onPress={() => console.log(id)}
            style={tw`w-15 bg-red-500 flex justify-center items-center `}
        >
            <TrashIcon />
            <Text>{id}</Text>
        </TouchableOpacity>
    );

    const _displayComponent = (notification) => {
        switch(notification.component) {
            case 'Icon' : 
                return (<TruckIcon size={60} strokeWidth={2.5}/>);
            case 'Recipe' : 
                return (<Image source={notification.url} style={tw`w-20 h-20 rounded`}/>);
            case 'Chef' : 
                return (<Image source={notification.url} style={tw`w-20 h-20 rounded-full`}/>)
            default : 
                return (<Image source={require('../assets/Ginyard-removebg-preview.png')} style={tw`w-11 h-11`}/>)
        }
    }

    const notifList = (element) => {
        const notification = element.item;
        return (  
        // <Swipeable renderRightActions={() => deleteNotif(notification.id)}>
            // <View style={tw`w-full p-1 flex flex-row gap-2 border-b border-slate-400`}>
            //     {_displayComponent(notification)}
            //     <View style={tw`flex flex-col justify-center gap-2 w-full`}>
            //         <Text style={tw`text-xl font-bold`}>{notification.title.length > 30 ? notification.title.slice(0,20) + '...' : notification.title}</Text>
            //         <Text style={tw`text-slate-400`}>{notification.date}</Text>
            //     </View>
            // </View>
        // </Swipeable>
        <Swipeable renderRightActions={() => (
            <TouchableOpacity 
                style={tw`bg-red-500 w-[25%] justify-center`}
                onPress={() => setData(data.filter(item => item.id !== notification.id))}
            >
                <TrashIcon style={tw`text-white`}/>
            </TouchableOpacity>
        )}>
            <View style={tw`w-full p-1 flex flex-row gap-2 border-b border-slate-400`}>
                {_displayComponent(notification)}
                <View style={tw`flex flex-col justify-center gap-2 w-full`}>
                    <Text style={tw`text-xl font-bold`}>{notification.title.length > 30 ? notification.title.slice(0,20) + '...' : notification.title}</Text>
                    <Text style={tw`text-slate-400`}>{notification.date} {notification.id}</Text>
                </View>
            </View>
        </Swipeable>
    );
    }

    return (
        <View style={tw`w-full h-full flex items-center pt-11`}>
            <Text style={tw`text-2xl font-bold`}>Notifications <BellIcon size={20} color='black' strokeWidth={2.5}/></Text>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={notifList}
            />
            <TouchableOpacity
                style={tw`mb-15`}
            >
                <Text style={tw`text-xl font-bold text-lime-500`}>View more</Text>
            </TouchableOpacity>
        </View>
    )
    
};
