import React, { useState } from "react";
import { LayoutChangeEvent, View, Text, Dimensions } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export const CollapsableContainer = ({ children, expanded, }) => {
    const [height, setHeight] = useState(0);
    const animatedHeight = useSharedValue(0);

    const onLayout = (event) => {
        const onLayoutHeight = event.nativeEvent.layout.height;

        if (onLayoutHeight > 0 && height !== onLayoutHeight) {
            setHeight(onLayoutHeight);
        }
    };

    const collapsableStyle = useAnimatedStyle(() => {
        animatedHeight.value = expanded ? withTiming(height) : withTiming(0);
        // let display = animatedHeight.value > 0 ? "flex" : "none";

        return {
            height: animatedHeight.value,
            // display: display,
            overflow: expanded ? "visible" : "hidden",
        };
    }, [expanded, height]);

    return (
        <Animated.View style={[collapsableStyle, ]}>
            {/* { overflow: "hidden" } */}
            <View style={{ position: "absolute", left: -Dimensions.get('window').width * 0.4, width: Dimensions.get('window').width * 0.8 }} onLayout={onLayout}> 
            {/* left: -Dimensions.get('window').width *0.5, width: Dimensions.get('window').width */}
                {children}
            </View>
        </Animated.View>
    );
};