import React, { useState, useEffect, useCallback, useRef } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Animated, Dimensions } from 'react-native'
import { useRouter, useFocusEffect } from 'expo-router'
import styles from '../../common/card.style'
import { COLORS, SIZES } from '../../../constants'
import AccountCard from '../../common/cards/account/AccountCard'
import { getAllAccount } from '../../../utils/RequestHelper'

const Accounts = () => {
    const router = useRouter();
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAccount, setSelectedAccount] = useState();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const flatListRef = useRef(null);

    const getIndicatorPosition = () => {
        if (flatListRef.current && containerWidth) {
            const percentage = scrollPosition / (flatListRef.current.props.data.length * containerWidth);
            return percentage * (Dimensions.get('window').width - containerWidth);
        }
        return 0;
    };


    const getAccountsInfo = async () => {

        const { data, error } = await getAllAccount();
        if (error) {
            console.log(error);
            setError(error);
        } else {
            console.log(data.data);
            setAccounts(data.data);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getAccountsInfo();
        setIsLoading(false);
    }, []);

    useFocusEffect(
        useCallback(() => {
            setIsLoading(true);
            getAccountsInfo();
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

    const handleCardPress = (account) => {
        router.push(`/account/${account.id}`);
        setSelectedAccount(account.id);
    }

    return (
        <Animated.View style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }]
        }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Accounts</Text>
                    <TouchableOpacity>
                        <Text style={styles.headerBtn}>Show all</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    {isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : error ? (
                        <Text>Something went wrong</Text>
                    ) : (
                        <View>
                            < FlatList
                                data={accounts}
                                renderItem={({ item }) => (
                                    <AccountCard
                                        account={item}
                                        selectedAccount={selectedAccount}
                                        handleCardPress={handleCardPress}
                                    />
                                )}
                                keyExtractor={item => item?.id}
                                contentContainerStyle={{ columnGap: SIZES.medium, padding: SIZES.medium }}
                                horizontal
                                ref={flatListRef}
                                onScroll={(event) => {
                                    const position = event.nativeEvent.contentOffset.x;
                                    setScrollPosition(position);
                                }}
                                onLayout={(event) => {
                                    const width = event.nativeEvent.layout.width;
                                    setContainerWidth(width);
                                }}
                                scrollEventThrottle={16}
                            />
                            <View style={[styles.indicator, { left: getIndicatorPosition() || 0 }]} />
                        </View>
                    )}
                </View>
            </View>
        </Animated.View>
    )
}

export default Accounts