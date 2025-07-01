import Animated from "react-native-reanimated";

export default function Cached({decorator, url}) {
    return (
        <Animated.Image source={url} style={decorator} />
    )
};
