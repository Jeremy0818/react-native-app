import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { View, Text, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, SHADOWS, SIZES } from '../../constants';
import styles from '../common/card.style';

const screenWidth = Dimensions.get('window').width * 0.9;

const ExpenseBreakdownChart = () => {
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

    const expenseData = [
        { name: "Rent", amount: 500, color: 'tomato', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: "Groceries", amount: 200, color: 'orange', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: "Entertainment", amount: 100, color: 'gold', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: "Utilities", amount: 150, color: 'cyan', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: "Transport", amount: 75, color: 'navy', legendFontColor: '#7F7F7F', legendFontSize: 15 }
    ];

    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    };

    const data = expenseData.map((item) => ({
        name: item.name,
        amount: item.amount,
        color: item.color,
        legendFontColor: item.legendFontColor,
        legendFontSize: item.legendFontSize
    }));

    return (
        <Animated.View style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }]
        }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Expense Breakdown</Text>
                    <TouchableOpacity>
                        <Ionicons name='ios-expand' size={SIZES.large} color={styles.headerBtn.color}/>
                    </TouchableOpacity>
                </View>

                <View>
                    <PieChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        accessor={"amount"}
                        backgroundColor={"transparent"}
                        center={[10, 0]}
                    // absolute // for absolute values instead of percentages
                    />
                </View>
            </View>
        </Animated.View>
    );
}

export default ExpenseBreakdownChart;