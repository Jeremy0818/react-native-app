import { Animated, Easing } from 'react-native';
import { images } from '../../constants';

export default function AppLogo() {
    const spinValue = new Animated.Value(0);

    Animated.loop(
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: true,
        })
    ).start();

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.Image
            source={images.appLogo}
            style={{ transform: [{ rotate: spin }] }}
        />
    );
}
