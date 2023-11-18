import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { AccountTabs, Transaction, AccountFooter, SlidingMenu } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
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

    const displayTabContent = () => {
        switch (activeTab) {
            case "Income":
                return <Transaction
                    title={"Income"}
                    data={"No data provided"}
                />
            case "Expense":
                return <Transaction
                    title={"Income"}
                    data={"No data provided"}
                />
            case "Transfer":
                return <Transaction
                    title={"Income"}
                    data={"No data provided"}
                />
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
                    // header: { backgroundColor: COLORS.lightWhite },
                    // headerShadowVisible: false,
                    // headerBackVisible: false,
                    // headerLeft: () => (
                    //     <ScreenHeaderBtn
                    //         iconUrl={icons.left}
                    //         dimension="60%"
                    //         handlePress={() => router.back()}
                    //     />
                    // ),
                    // headerRight: () => (
                    //     <ScreenHeaderBtn
                    //         iconUrl={icons.share}
                    //         dimension="60%"
                    //     />
                    // ),
                    // headerTitle: ''
                }}
            />

            <>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : error ? (
                        <Text>Something went wrong</Text>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                            {/* <Company
                                companyLogo={data[0].employer_logo}
                                jobTitle={data[0].job_title}
                                companyName={data[0].employer_name}
                                location={data[0].job_country}
                            />
                            <JobTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            /> */}
                            <Text>{account.account_name}</Text>
                            <Text>{account.balance}</Text>
                            <AccountTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />

                            {displayTabContent()}
                        </View>
                    )}
                </ScrollView>
                <SlidingMenu />

                {/* <JobFooter url={data[0]?.job_google_link ?? 'https://careers.gogole.com/jobs/results'}/> */}
                {/* <AccountFooter url={''} /> */}
            </>
        </SafeAreaView>
    )
}

export default AccountDetails;