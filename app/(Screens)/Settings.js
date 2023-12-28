import { useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Button, Text, StyleSheet, TouchableOpacity, SectionList } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

import { COLORS, SIZES } from '../../constants';
import { ScreenHeaderBtn, BottomTabs } from '../../components';
import { useAuth } from '../../utils/AuthContext';

const settingsData = [
    {
        title: 'Profile & Groups',
        data: [
            { key: 'profile', title: 'Profile', iconName: 'person-outline' },
            { key: 'groups', title: 'Groups', iconName: 'people-outline' },
        ],
    },
    {
        title: 'Theme, Budgets & Categories',
        data: [
            { key: 'theme', title: 'Theme', iconName: 'color-palette-outline' },
            { key: 'budgets', title: 'Budgets', iconName: 'wallet-outline' },
            { key: 'categories', title: 'Categories', iconName: 'list-outline' },
        ],
    },
    {
        title: 'Reports & Contact',
        data: [
            { key: 'reports', title: 'Reports', iconName: 'pie-chart-outline' },
            { key: 'contact', title: 'Contact', iconName: 'mail-outline' },
        ],
    },
];

const Item = ({ title, iconName, isFirst, isLast }) => {
    const itemStyles = [
      styles.item,
      isFirst && styles.firstItem, // apply rounded top corners to the first item
      isLast && styles.lastItem,  // apply rounded bottom corners to the last item
    ];
  
    return (
      <TouchableOpacity style={itemStyles}>
        <Icon name={iconName} size={24} color="#000" />
        <Text style={styles.title}>{title}</Text>
        <Icon name="chevron-forward-outline" size={24} color="grey" />
      </TouchableOpacity>
    );
  };

export default function Settings() {
    const router = useRouter();
    const { isAuthenticated, clearToken } = useAuth();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.replace("");
        }
    }, []);

    const renderItem = ({ item, index, section }) => {
        // Determine if the item is the first or the last in the section
        const isFirst = index === 0;
        const isLast = index === section.data.length - 1;
    
        return <Item title={item.title} iconName={item.iconName} isFirst={isFirst} isLast={isLast} />;
      };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <View style={{
                flex: 1,
                padding: SIZES.medium
            }}>
                
                <SectionList
                    sections={settingsData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={renderItem}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    style={styles.container}
                    stickySectionHeadersEnabled={false}
                />
                <Button
                    title="Logout"
                    onPress={() => {
                        clearToken();
                        router.replace('');
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite, // Color for the background of the screen
    },
    item: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
      },
      firstItem: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
      lastItem: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomWidth: 0, // you might want to remove the border for the last item
      },
    title: {
        flex: 1,
        marginLeft: 12,
        fontSize: SIZES.medium,
    },
    sectionHeader: {
        fontWeight: '600',
        fontSize: SIZES.medium,
        padding: 10,
        color: '#000',
        paddingTop: SIZES.xxLarge,
        backgroundColor: COLORS.lightWhite,
    },
});