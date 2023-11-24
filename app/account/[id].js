import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Dimensions, View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { AccountTabs, Transaction, AccountFooter, SlidingMenu } from '../../components'
import { COLORS, icons, SIZES, FONT } from '../../constants'
import { getAccount } from '../../utils/RequestHelper'
import { useAuth } from '../../utils/AuthContext'

const tabs = ["Income", "Expense", "Transfer"];
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);

const ContentView = ({ item, index, refreshing, onRefresh, setActiveTab }) => {
    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Transaction
                    data={item}
                />
            </ScrollView>
        </>
    )
}

const AccountDetails = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { id = -1 } = params;

    const isCarousel = useRef(null);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [account, setAccount] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [transfers, setTransfers] = useState([]);
    const [expCategories, setExpCategories] = useState([]);
    const [incCategories, setIncCategories] = useState([]);
    const [trnCategories, setTrnCategories] = useState([]);
    const [accounts, setAccounts] = useState([]);

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.replace("");
        }
        getAccountInfo();
    }, []);

    useEffect(() => {
        if (isCarousel && isCarousel.current && isCarousel.current.currentIndex !== activeTab) {
            isCarousel.current.snapToItem (activeTab, animated = true, fireCallback = true)
        }
    }, [activeTab]);

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
        if (!account) setIsLoading(true);
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
            if (!account) setIsLoading(false);
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            getAccountInfo();
            setRefreshing(false);
        }, 1000);

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
                    <Text style={styles.headText}>{account?.balance}</Text>
                    <AccountTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <Carousel
                        layout="default"
                        layoutCardOffset={9}
                        ref={isCarousel}
                        data={[incomes, expenses, transfers]}
                        renderItem={({ item, index }) => (
                            <ContentView
                                item={item}
                                index={index}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                setActiveTab={setActiveTab}
                            />
                        )}
                        setIndex={setActiveTab}
                        onSnapToItem={(index) => setActiveTab(index)}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        inactiveSlideShift={0}
                        useScrollView={true}
                    />
                    <Pagination
                        dotsLength={3}
                        activeDotIndex={activeTab}
                        carouselRef={isCarousel}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.92)'
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        tappableDots={true}
                    />
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