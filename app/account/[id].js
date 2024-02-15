import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Dimensions, View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native'
import { Stack, useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';

import { AccountTabs, Transaction, AccountFooter, SlidingMenuModal } from '../../components'
import commonStyles from '../../components/common/common.style';
import { COLORS, icons, SIZES, FONT, SHADOWS } from '../../constants'
import { getAccount, updateTransaction, deleteTransaction } from '../../utils/RequestHelper'
import { useAuth } from '../../utils/AuthContext'
import { TouchableOpacity } from 'react-native-gesture-handler';

const tabs = ["Income", "Expense", "Transfer"];

const ContentView = ({ item, index, refreshing, onRefresh }) => {
    const scrollViewRef = useRef(null);

    return (
        <View>
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
    const { id = -1 } = useLocalSearchParams();

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

    const [SLIDER_WIDTH, setSliderWidth] = useState(Dimensions.get('window').width);
    const [ITEM_WIDTH, setItemWidth] = useState(Math.round(Dimensions.get('window').width));

    const { isAuthenticated } = useAuth();

    const onOrientationChange = () => {
        const { width, height } = Dimensions.get('window');
        if (width < height) {
            setSliderWidth(Dimensions.get('window').width);
        setItemWidth(Math.round(Dimensions.get('window').width));
        } else {
            setSliderWidth(Dimensions.get('window').width * 0.9);
        setItemWidth(Math.round(Dimensions.get('window').width * 0.9));
        }
        
    };

    useEffect(() => {
        if (!isAuthenticated()) {
            router.replace("");
        }
        if (!account) setIsLoading(true);
        getAccountInfo();
        if (isCarousel && isCarousel.current && isCarousel.current.currentIndex !== activeTab) {
            isCarousel.current.snapToItem(activeTab, animated = true, fireCallback = true)
        }
        Dimensions.addEventListener('change', onOrientationChange);
        // return () => {
        //   Dimensions.removeEventListener('change', onOrientationChange);
        // };
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (!account) setIsLoading(true);
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
            setIsLoading(false);
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        if (!account) setIsLoading(true);
        getAccountInfo();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    });

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity style={styles.headerBtn} onPress={() => { router.back() }}>
                            <Ionicons name="chevron-back" size={20} color={COLORS.white} />
                            <Text style={styles.headerBtnText}>back</Text>
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => {
                            router.push({pathname: `UpdateAccountDetails`, params: {
                                id: id,
                                name: account.account_name,
                                balance: account.balance,
                            }})
                        }}>
                            <Ionicons name="create-outline" size={24} color={"black"} />
                        </TouchableOpacity>

                    ),
                    headerTitle: account ? account.account_name : '',
                    headerTitleStyle: commonStyles.headerText,
                }}
            />


            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.black} />
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
                        onBeforeSnapToItem={(index) => setActiveTab(index)}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        inactiveSlideShift={0}
                    // useScrollView={true}
                    />
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 15,
                    }}>
                        <Pagination
                            dotsLength={3}
                            activeDotIndex={activeTab}
                            carouselRef={isCarousel}
                            containerStyle={{
                                height: 20,
                                width: 80,
                            }}
                            dotStyle={{
                                width: 20,
                                height: 15,
                                borderRadius: 8,
                                backgroundColor: 'rgba(0, 0, 0, 0.92)'
                            }}
                            inactiveDotStyle={{
                                width: 15,
                                height: 15,
                                borderRadius: 8,
                                backgroundColor: 'rgba(0, 0, 0, 0.92)'
                            }}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            tappableDots={true}
                        />
                    </View>
                    <SlidingMenuModal accountId={id} />
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    headText: {
        fontSize: SIZES.large,
        color: COLORS.primary,
        fontFamily: FONT.bold,
    },
    headerBtn: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        color: COLORS.white,
        padding: 10,
        borderRadius: 10,
    },
    headerBtnText: {
        fontSize: SIZES.medium,
        color: COLORS.white,
        fontFamily: FONT.bold,
    },
});

export default AccountDetails;