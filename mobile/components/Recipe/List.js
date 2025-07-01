import {View, Text, FlatList} from 'react-native';

import tw from 'twrnc';
import Loading from '../Loading';
import Card from './Card';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MasonryList from '@react-native-seoul/masonry-list';

export default function List({recipes}) {

    const navigation = useNavigation();

    return (
        // <View style={tw`flex justify-center items-center`}>
        // <View >
        //     <Card item={recipe} index={1} navigation={navigation} />
        //     <Card item={recipe} index={1} navigation={navigation} />
        //     <Card item={recipe} index={1} navigation={navigation} />
        // </View>
        <MasonryList
            data={recipes}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            renderItem={(item, index) => <Card item={item} inedex={index} navigation={navigation}/>}
            onEndReachedThreshold={0.1}
            style={tw`pb-30`}
        />   
    )
};
