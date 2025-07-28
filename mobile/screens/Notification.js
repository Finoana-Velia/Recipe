import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { BellIcon, TrashIcon } from 'react-native-heroicons/outline';
import { notifications } from '../helpers/notifs';
import tw from 'twrnc';
import { Swipeable } from 'react-native-gesture-handler';

export default function Notification() {

    const deleteNotif = (id) => (
        <TouchableOpacity
            style={tw`w-11 bg-red-500 justify-center items-center`}
        >
            <TrashIcon style={tw`text-white`} />
        </TouchableOpacity>
    );


    const notifList = ({notification}) => (
        <Swipeable renderRightActions={() => deleteNotif(notification.id)}>
            <View style={tw`p-1 flex flex-row gap-2`}>
                (notification.component)
                <View style={tw`flex flex-col justify-center items-center gap-2`}>
                    <Text style={tw`text-xl font-bold`}>{notification.title}</Text>
                    <Text style={tw`text-slate-400`}>{notification.date}</Text>
                </View>
            </View>
        </Swipeable>
    );

    return (
        <View style={tw`w-full h-full flex items-center pt-11`}>
            <Text style={tw`text-2xl font-bold`}>Notifications <BellIcon size={20} color='black' strokeWidth={2.5}/></Text>
            <FlatList
                data={notifications}
                keyExtractor={item => item.id}
                renderItem={notifList}
            />
        </View>
    )
    
};
