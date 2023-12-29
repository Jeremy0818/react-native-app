import React, { useState, useEffect } from 'react';
import { StackedBarChart, BarChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, Animated, TouchableOpacity } from 'react-native';

import styles from '../common/card.style';
import { COLORS } from '../../constants';

const screenWidth = Dimensions.get('window').width * 0.9;

const IncomeVsExpensesChart = () => {
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity value of 0
    const [translateYAnim] = useState(new Animated.Value(30));

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

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        legend: ['Income', 'Expense'],
        data: [
            [8000, 5000], // Data for Jan
            [9500, 3000], // Data for Feb
            [10000, 4000], // Data for Mar
            [11000, 4500], // Data for Apr
            [12000, 5000], // Data for May
            [13000, 6000], // Data for Jun
        ],
        barColors: ['#4caf50', '#f44336'],
    };

    const chartConfig = {
        backgroundColor: COLORS.white,
        backgroundGradientFrom: COLORS.white,
        backgroundGradientTo: COLORS.white,
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
    };

    return (
        <Animated.View style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }]
        }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Income vs Expenses</Text>
                    <TouchableOpacity>
                        <Text style={styles.headerBtn}>details</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <StackedBarChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        decimalPlaces={0}
                        percentile={true}
                        formatYLabel={(yLabel) => yLabel + "%"}
                    />
                </View>
            </View>
        </Animated.View>
    );
};

export default IncomeVsExpensesChart;
