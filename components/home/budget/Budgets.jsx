import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Animated, Dimensions } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import styles from '../../common/card.style';
import { COLORS, SIZES } from '../../../constants';
import BudgetCard from '../../common/cards/budget/BudgetCard';
import { getAllBudget } from '../../../utils/RequestHelper';
import { Ionicons } from '@expo/vector-icons';

const Budgets = () => {
    const router = useRouter();
    const [budgets, setBudgets] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const flatListRef = useRef(null);

    const getBudgetsInfo = async () => {

        const { data, error } = await getAllBudget();
        if (error) {
            console.log(error);
            setError(error);
        } else {
            console.log(data.data);
            setBudgets(data.data);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getBudgetsInfo();
        setIsLoading(false);
    }, []);

    useFocusEffect(
        useCallback(() => {
            setIsLoading(true);
            getBudgetsInfo();
            setIsLoading(false);
            return () => { };
        }, [])
    );

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

    const handleCardPress = (budget) => {
        router.push(`/budget/${budget.id}`);
        setSelectedBudget(budget.id);
    }

    return (
        <Animated.View style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }]
        }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Budgets</Text>
                    <TouchableOpacity onPress={() => {
                        router.push('NewBudget')
                    }}>
                        <Ionicons name="add-circle" size={32} color={"black"} />
                    </TouchableOpacity>
                </View>

                <View>
                    {isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : error ? (
                        <Text>Something went wrong</Text>
                    ) : budgets.length == 0 ? (
                        <Text>No budget yet</Text>
                    ) : (
                        <View>
                            < FlatList
                                data={budgets}
                                renderItem={({ item }) => (
                                    <BudgetCard
                                        budget={item}
                                        selectedBudget={selectedBudget}
                                        handleCardPress={handleCardPress}
                                    />
                                )}
                                keyExtractor={item => item?.id}
                            />
                        </View>
                    )}
                </View>
            </View>
        </Animated.View>
    )
}

export default Budgets