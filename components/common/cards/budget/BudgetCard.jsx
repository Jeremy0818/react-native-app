import React, {useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SIZES, SHADOWS } from '../../../../constants';

const BudgetCard = ({ budget }) => {
    const percentage = Math.min(1, budget.budget !== 0 ? budget.balance / budget.budget : 0);
    const animatedValue = useRef(new Animated.Value(0)).current;
    console.log(percentage);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: percentage,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [percentage, animatedValue]);

    const progressWidth = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '106%'],
    });

    const progressColor = animatedValue.interpolate({
        inputRange: [0, 0.25, 0.5, 0.75, 1],
        outputRange: ['#5cb85c', '#aaff00', '#ffcc00', '#ff6600', '#ff0000'],
    });    

    return (
        <View style={styles.amountContainer}>
            <Animated.View style={[styles.progressContainer, { width: progressWidth, backgroundColor: progressColor }]} />
            <View style={styles.textContainer}>
                <Ionicons name='wallet' size={22} style={styles.icon} />
                <Text style={styles.category}>{budget.expense_category.category_name}</Text>
                <View style={styles.amountText}>
                    <Text style={styles.amount}>RM {budget.balance}</Text>
                    <Text style={styles.total}>Total: RM {budget.budget}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    amountContainer: {
        position: 'relative',
        borderRadius: SIZES.large,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 4,
        // elevation: 4,
        ...SHADOWS.small,
    },
    progressContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        borderRadius: SIZES.large,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        marginRight: 10,
        color: 'black',
    },
    category: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    amountText: {
        alignItems: 'flex-end',
    },
    amount: {
        fontSize: 20,
        color: 'black',
    },
    total: {
        fontSize: 14,
        color: 'black',
    },
});

export default BudgetCard;
