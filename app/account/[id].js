import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Dimensions, View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native'
import { Stack, useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';

import { AccountTabs, Transaction, AccountFooter, SlidingMenuModal } from '../../components'
import commonStyles from '../../components/common/common.style';
import { COLORS, icons, SIZES, FONT } from '../../constants'
import { getAccount, updateTransaction, deleteTransaction } from '../../utils/RequestHelper'
import { useAuth } from '../../utils/AuthContext'
import { TouchableOpacity } from 'react-native-gesture-handler';

const tabs = ["Income", "Expense", "Transfer"];
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);

const ContentView = ({ item, index, refreshing, onRefresh }) => {
    const scrollViewRef = useRef(null);

    return (
        <View style={{
            height: Dimensions.get('window').height * 0.6,
            backgroundColor: COLORS.white,
            borderRadius: 10,
            margin: 8,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
        }}>
            <Transaction
                data={item}
                scrollViewRef={scrollViewRef}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onUpdate={updateTransaction}
                onDelete={deleteTransaction}
            />
        </View>
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
        if (isCarousel && isCarousel.current && isCarousel.current.currentIndex !== activeTab) {
            isCarousel.current.snapToItem(activeTab, animated = true, fireCallback = true)
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            getAccountInfo();
            if (isCarousel && isCarousel.current && isCarousel.current.currentIndex !== activeTab) {
                isCarousel.current.snapToItem(activeTab, animated = true, fireCallback = true)
            }
            return () => { };
        }, [])
    );

    useEffect(() => {
        if (isCarousel && isCarousel.current && isCarousel.current.currentIndex !== activeTab) {
            isCarousel.current.snapToItem(activeTab, animated = true, fireCallback = true)
        }
    }, [activeTab]);

    const setupItem = (list, account, type) => {
        let tempList = [];
        for (let i = 0; i < list.length; i++) {
            let tempItem = {
                id: list[i].transaction.id,
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
            setExpenses(setupItem(data.data.expenses, data.data.account, "Expense"));
            setIncomes(setupItem(data.data.incomes, data.data.account, "Income"));
            setExpCategories(data.data.expense_categories);
            setIncCategories(data.data.income_categories);
            setTrnCategories(data.data.transfer_categories);
            setAccounts(data.data.accounts);
            if (!account) setIsLoading(false);
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAccountInfo();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerRight: () => (
                        <TouchableOpacity>
                            <Ionicons name="create-outline" size={24} color={"black"} />
                        </TouchableOpacity>
                        
                    ),
                    headerTitle: account ? account.account_name : '',
                    headerTitleStyle: commonStyles.headerText,
                }}
            />


            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : error ? (
                <Text>Something went wrong</Text>
            ) : (
                <>
                    <Text style={{ ...styles.headText, textAlign: 'center', }}>{account?.balance}</Text>
                    <AccountTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    {/* <Text style={{ ...styles.headText, textAlign: 'center', }}>Transaction history</Text> */}
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
                    <SlidingMenuModal accountId={id} />
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