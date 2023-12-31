import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter, useFocusEffect } from 'expo-router'
import styles from './groups.style'
import { COLORS, SIZES } from '../../../constants'
import AccountCard from '../../common/cards/account/AccountCard'
import { getAllAccount } from '../../../utils/RequestHelper'

const Groups = () => {
    const router = useRouter();
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAccount, setSelectedAccount] = useState();

    const getAccountsInfo = async () => {
        setIsLoading(true);
        const { data, error } = await getAllAccount();
        if (error) {
            console.log(error);
            setError(error);
        } else {
            console.log(data.data);
            setAccounts(data.data);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAccountsInfo();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getAccountsInfo();
            return () => {};
        }, [])
    );

    const handleCardPress = (account) => {
        router.push(`/account/${account.id}`);
        setSelectedAccount(account.id);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Groups</Text>
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
                        contentContainerStyle={{ columnGap: SIZES.medium }}
                        horizontal
                    />
                )}
            </View>
        </View>
    )
}

export default Groups