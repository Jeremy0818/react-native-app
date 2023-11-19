import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { AccountTabs, Transaction, AccountFooter, SlidingMenu } from '../../components'
import { COLORS, icons, SIZES, FONT } from '../../constants'
import { getAccount } from '../../utils/RequestHelper'
import { useAuth } from '../../utils/AuthContext'

const tabs = ["Income", "Expense", "Transfer"];

const AccountDetails = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { id = -1 } = params;

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [account, setAccount] = useState();
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [expCategories, setExpCategories] = useState([]);
    const [incCategories, setIncCategories] = useState([]);
    const [trnCategories, setTrnCategories] = useState([]);
    const [accounts, setAccounts] = useState([]);

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        getAccountInfo();
    }, []);

    const setupItem = (list, account, type) => {
        let tempList = [];
        for (let i = 0; i < list.length; i++) {
            let tempItem = {
                title: list[i].transaction.title,
                total_amount: list[i].transaction.total_amount,
                date: list[i].transaction.date,
                category: list[i].category.category_name,
                account: account.account_name,
                type: type,
            }
            tempList.push(tempItem)
        }
        return tempList;
    }

    const getAccountInfo = async () => {
        setIsLoading(true);
        console.log(id);
        const { data, error } = await getAccount(id);
        if (error) {
            console.log(error);
            setError(error);
        } else {
            console.log(data.data);
            setAccount(data.data.account);
            setExpenses(setupItem(data.data.expenses, data.data.account, "expense"));
            setIncomes(setupItem(data.data.incomes, data.data.account, "income"));
            setExpCategories(data.data.expense_categories);
            setIncCategories(data.data.income_categories);
            setTrnCategories(data.data.transfer_categories);
            setAccounts(data.data.accounts);
            setIsLoading(false);
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAccountInfo();
        setRefreshing(false);
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    // headerRight: () => (
                    //     <ScreenHeaderBtn
                    //         iconUrl={icons.share} // edit
                    //         dimension="60%"
                    //     />
                    // ),
                    headerTitle: account ? account.account_name : ''
                }}
            />


            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : error ? (
                <Text>Something went wrong</Text>
            ) : (
                <>
                    <Text style={styles.headText}>{account.balance}</Text>
                    <AccountTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        {
                            activeTab == "Expense" ?
                                <Transaction
                                    title={activeTab}
                                    data={expenses}
                                />
                                : activeTab == "Income" ?
                                    <Transaction
                                        title={activeTab}
                                        data={incomes}
                                    />
                                    :
                                    <Transaction
                                        title={activeTab}
                                        data={[]}
                                    />
                        }
                    </ScrollView>
                    <SlidingMenu />
                </>
            )}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headText: {
        fontSize: SIZES.large,
        color: COLORS.primary,
        fontFamily: FONT.bold,
    },
});

export default AccountDetails;