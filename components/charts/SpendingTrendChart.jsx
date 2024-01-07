import React, { useState, useEffect, useRef } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, SHADOWS, SIZES } from '../../constants';
import {default as cardStyles} from '../common/card.style';

const SpendingTrendChart = () => {
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity value of 0
    const [translateYAnim] = useState(new Animated.Value(30));
    const [selectedData, setSelectedData] = useState(null);
    const hideOverlayTimeout = useRef(null);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                translateYAnim,
                {
                    toValue: 0,  // Final position is 0, which means no translation
                    duration: 1000,
                    useNativeDriver: true
                }
            )
        ]).start();
    }, [fadeAnim, translateYAnim]);

    const screenWidth = Dimensions.get('window').width * 0.8;
    const spendingData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            data: [300, 600, 800, 750, 1000, 1200]
        }]
    };

    const chartConfig = {
        backgroundColor: COLORS.white,
        backgroundGradientFrom: COLORS.white,
        backgroundGradientTo: COLORS.white,
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
        }
    };

    const handleDataPointClick = ({ value, dataIndex }) => {
        // Clear the existing timeout to reset the timer
        if (hideOverlayTimeout.current) {
            clearTimeout(hideOverlayTimeout.current);
        }

        const dataPoint = {
            value: value,
            label: spendingData.labels[dataIndex]
        };
        setSelectedData(dataPoint);

        // Hide the overlay after 2 seconds
        hideOverlayTimeout.current = setTimeout(() => {
            setSelectedData(null);
        }, 2000); // Adjust time as needed
    };

    return (
        <Animated.View style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }]
        }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Monthly Spending Trend</Text>
                    <TouchableOpacity>
                    <Ionicons name='ios-expand' size={SIZES.large} color={styles.headerBtn.color}/>
                    </TouchableOpacity>
                </View>

                <View>
                {selectedData && (
                    <View style={styles.overlay}>
                        <Text style={styles.overlayText}>{`Month: ${selectedData.label}`}</Text>
                        <Text style={styles.overlayText}>{`Spending: $${selectedData.value}`}</Text>
                    </View>
                )}
                <LineChart
                    data={spendingData}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                    withVerticalLabels
                    withHorizontalLabels
                    withDots
                    withShadow
                    withInnerLines
                    withOuterLines
                    withVerticalLines
                    withHorizontalLines
                    fromZero
                    // yAxisLabel="$"
                    // yAxisSuffix="k"
                    // yAxisInterval={1} // optional, defaults to 1
                    // formatYLabel={(y) => `${y}k`}
                    // formatXLabel={(x, index) => spendingData.labels[index]}
                    onDataPointClick={handleDataPointClick}
                />
            </View>
            </View>
        </Animated.View>
    );
};

export default SpendingTrendChart;

const styles = StyleSheet.create({
    ...cardStyles,
    overlay: {
        position: 'absolute',
        top: 10, // Adjust as needed
        left: 300,
        transform: [{ translateX: -Dimensions.get('window').width / 2 + 20 }], // Adjust as needed
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
        zIndex: 1,
        // Add other styling as needed
    },
    overlayText: {
        fontSize: 16,
        textAlign: 'center',
        color: COLORS.white,
        // Add other styling as needed
    }
});
