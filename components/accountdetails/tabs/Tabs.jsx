import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, Animated, Dimensions } from 'react-native'

import { COLORS, SIZES } from '../../../constants'

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
    const [xTabOne, setXTabOne] = useState(0);
    const [xTabTwo, setXTabTwo] = useState(0);
    const [xTabThree, setXTabThree] = useState(0);
    const [translateX, setTranslateX] = useState(new Animated.Value(0));

    var xTabs = [xTabOne, xTabTwo, xTabThree];
    var setXTabs = [setXTabOne, setXTabTwo, setXTabThree];
    var translateXTabs = Array.from({length: tabs.length}, (x, i) => new Animated.Value(0));

    const { width } = Dimensions.get("window");

    useEffect(() => {
        if (activeTab == 0) handleSlide(xTabOne);
        else if (activeTab == 1) handleSlide(xTabTwo);
        else if (activeTab == 2) handleSlide(xTabThree);

    }, [activeTab]);

    const handleSlide = (type) => {
        Animated.spring(translateX, {
            toValue: type,
            duration: 100,
            useNativeDriver: true,
        }).start();
        if (activeTab === 0) {
            Animated.parallel(Array.from({length: tabs.length}, (x, i) =>
                Animated.spring(translateXTabs[i], {
                    toValue: width * i,
                    duration: 100,
                    useNativeDriver: true,
                }).start()
            ));
        } else {
            Animated.parallel(Array.from({length: tabs.length}, (x, i) =>
                Animated.spring(translateXTabs[i], {
                    toValue: -width * 1,
                    duration: 100,
                    useNativeDriver: true,
                }).start()
            ));
        }
    };

    return (
        <View
            style={{
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto"
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    marginTop: 10,
                    height: 40,
                    position: "relative",
                    backgroundColor: COLORS.gray,
                    borderRadius: SIZES.xxLarge,
                }}
            >
                <Animated.View
                    style={{
                        position: "absolute",
                        width: (1 / tabs.length * 100).toString() + "%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.xxLarge,
                        transform: [
                            {
                                translateX
                            }
                        ]
                    }}
                />
                {tabs.map((item, index) => <TouchableOpacity
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onLayout={event =>
                        setXTabs[index](event.nativeEvent.layout.x)
                    }
                    onPress={() => {
                        setActiveTab(index);
                    }}
                >
                    <Text
                        style={{
                            fontSize: SIZES.medium,
                            color: activeTab === index ? "#fff" : COLORS.gray2
                        }}
                    >
                        {item}
                    </Text>
                </TouchableOpacity>)}
            </View>
        </View>
    )
}

export default Tabs