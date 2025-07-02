import tw from 'twrnc';
import Card from './Card';
import { useNavigation } from '@react-navigation/native';
import MasonryList from '@react-native-seoul/masonry-list';

export default function List({recipes}) {

    const navigation = useNavigation();

    return (
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
