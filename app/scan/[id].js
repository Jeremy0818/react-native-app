import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Dimensions, View, Text, Image, TouchableOpacity, Linking, SafeAreaView, ActivityIndicator, StyleSheet, Modal } from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from 'react-native-image-zoom-viewer';

import { COLORS, icons, SIZES, FONT } from '../../constants'
import { getAccount, uploadImage, saveNewTransactions } from '../../utils/RequestHelper'
import { useAuth } from '../../utils/AuthContext'
import { SlidingMenu, Transaction } from '../../components';

const ImageView = ({ image, handleChoosePhoto, handleTakePhoto }) => {
    const [visible, setVisible] = useState(false);

    const handleOpen = () => {
        setVisible(true); // show the modal when the image is pressed
    };

    const handleClose = () => {
        setVisible(false); // hide the modal when the modal is closed
    };

    return (
        <View style={styles.imgContainer}>
            <View style={styles.imgHeader}>
                <Text style={styles.imgHeaderTitle}>Image</Text>
                {/* {
                        image ?
                            <TouchableOpacity>
                                <Text style={styles.imgHeaderBtn}>Edit</Text>
                            </TouchableOpacity>
                            :
                            null
                    } */}
            </View>

            {
                image ?
                    <View style={styles.imgContent} >
                        <TouchableOpacity
                            onPress={handleOpen}
                        >
                            <Image source={{ uri: image }} style={styles.image} />
                        </TouchableOpacity>
                    </View>
                    :
                    <Text style={styles.imageText} >No Image</Text>
            }


            <View style={styles.imgBtnContainer} >
                <TouchableOpacity
                    style={styles.imgButton}
                    onPress={handleChoosePhoto}
                >
                    <Ionicons name="images" size={20} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.imgButton}
                    onPress={handleTakePhoto}
                >
                    <Ionicons name="camera" size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>
            <Modal visible={visible} transparent={true}>
                <ImageViewer
                    imageUrls={[{ url: image }]} // pass the image url in an array
                    enableSwipeDown={true} // enable swipe down to close the modal
                    onSwipeDown={handleClose} // call the handleClose function when swiped down
                    renderFooter={() => (
                        <TouchableOpacity
                            style={{ ...styles.imgButton, width: Dimensions.get('window').width * 0.95, marginBottom: 30, }}
                            onPress={handleClose}
                        >
                            <Text>Close</Text>
                        </TouchableOpacity>
                    )}
                />

            </Modal>
        </View>
    );
}

const ScanView = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { id = -1 } = params;

    const [image, setImage] = useState(null);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [account, setAccount] = useState(null);
    const [itemList, setItemList] = useState([]);
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
            setExpCategories(data.data.expense_categories);
            setIncCategories(data.data.income_categories);
            setTrnCategories(data.data.transfer_categories);
            setAccounts(data.data.accounts);
            if (!account) setIsLoading(false);
        }
    }

    const setupItem = (list) => {
        let tempList = [];
        for (let i = 0; i < list.length; i++) {
            let tempItem = {
                id: i,
                title: list[i].title,
                total_amount: list[i].total_amount,
                date: list[i].date,
                category: list[i].category,
                account: list[i].account,
                type: list[i].type,
            }
            tempList.push(tempItem)
        }
        return tempList;
    }

    async function handleImage(image) {
        if (image) {
            // Set the selected image in the state
            setIsLoading(true);
            setError(null);
            const { data, error } = await uploadImage(image);
            setIsLoading(false);
            if (error == null) {
                console.log(data.data);
                setItemList(setupItem(data.data));
                setExpCategories(data.expense_categories);
                setIncCategories(data.income_categories);
                setTrnCategories(data.transfer_categories);
                setAccounts(data.accounts);
            } else {
                setError(error);
            }
        }
    }

    async function handleDone() {
        const { data, error } = await saveNewTransactions(itemList);
        if (error) {
            alert(error);
        } else {
            console.log(data.status);
            router.back();
        }
    }

    const convertToImageObject = (data) => {
        return {
            uri: data.uri,
            name: 'image.jpg',
            type: 'image/jpeg',
        }
    }

    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            handleImage(convertToImageObject(result.assets[0]));
        } else {
            alert('You did not select any image.');
        }
    };

    const handleTakePhoto = async () => {
        await openSettings();
        let result = await ImagePicker.launchCameraAsync({ mediaType: 'photo' });
        if (result.canceled) {
            alert('You did not take any photo.');
        } else if (result.error) {
            console.log('ImagePicker Error: ', result.error);
        } else {
            setImage(result.assets[0].uri);
            handleImage(convertToImageObject(result.assets[0]));
        }
    };

    const openSettings = async () => {
        const { status, canAskAgain } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === 'denied' && !canAskAgain) {
            // The user has denied the permission and cannot be asked again. Open the app settings.
            Linking.openSettings();
        }
    };

    const updateItemList = async (id, updatedItem) => {
        let tempList = itemList;
        let index = tempList.findIndex(obj => obj.id === id);
        itemList[index] = updatedItem;
        setItemList(tempList);
        return {
            data: {
                status: 'success',
            },
            error: null
        }
    }

    const deleteItemList = async (id, deletedItem) => {
        let tempList = itemList;
        let index = tempList.findIndex(obj => obj.id === id);
        tempList.splice(index, 1);
        setItemList(tempList);
        return {
            data: {
                status: 'success',
            },
            error: null
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,

                    headerLeft: () => (
                        <TouchableOpacity style={styles.headerBtn} onPress={() => { router.back() }}>
                            <Ionicons name="chevron-back" size={20} color={COLORS.white} />
                            <Text style={styles.headerBtnText} >cancel</Text>
                        </TouchableOpacity>
                    ),
                    headerRight: () => {
                        if (itemList.length > 0) {
                            return (
                                <TouchableOpacity style={styles.headerBtn} onPress={handleDone} >
                                    <Text style={styles.headerBtnText} >done</Text>
                                    <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
                                </TouchableOpacity>
                            )
                        } else {
                            return null
                        }
                    },
                    headerTitle: ''
                }}
            />
            <ImageView
                image={image}
                handleChoosePhoto={handleChoosePhoto}
                handleTakePhoto={handleTakePhoto}
            />

            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : error ? (
                <Text>Something went wrong</Text>
            ) : (
                <>
                    {
                        image ?
                            <SlidingMenu renderComponent={() => {
                                return (
                                    <Transaction
                                        data={itemList}
                                        onUpdate={updateItemList}
                                        onDelete={deleteItemList} />
                                )
                            }} />
                            :
                            null
                    }
                </>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerBtnText: {
        fontSize: SIZES.medium,
        color: COLORS.white,
        fontFamily: FONT.bold,
    },
    headerBtn: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        color: COLORS.white,
        padding: 10,
        borderRadius: 10,
    },
    imageText: {
        textAlign: 'center',
    },
    image: {
        width: 270,
        height: 270,
        resizeMode: 'contain',
    },
    imgContainer: {
        margin: SIZES.medium,
        paddingHorizontal: SIZES.xLarge,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    imgContent: {
        // width: 300,
        // height: 300,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightWhite,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    imgBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgButton: {
        backgroundColor: COLORS.tertiary,
        height: 40,
        // width: 100,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: SIZES.medium,
        borderRadius: SIZES.medium,
        margin: 10,
    },
    imgHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: SIZES.small,
    },
    imgHeaderTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: COLORS.primary,
    },
    imgHeaderBtn: {
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        color: COLORS.gray,
    },
});

export default ScanView;