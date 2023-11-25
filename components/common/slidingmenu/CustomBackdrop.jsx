import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";

const CustomBackdrop = ({ animatedIndex, style, onPress }) => {
    // animated variables
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [-1, 0],
            [0, 0.8],
            Extrapolate.CLAMP
        ),
    }));

    // styles
    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: "#a8b5eb",
            },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle]
    );

    return <Animated.View style={containerStyle} onStartShouldSetResponder={onPress} />;
};

export default CustomBackdrop;