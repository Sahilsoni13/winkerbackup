import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions,
} from 'react-native';
import Input from '@/component/Input';
import ChatCard from '@/component/ChatCard';
import { ChatItem } from '@/types/type';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';

const { width } = Dimensions.get('window');
const tabWidth = width * 0.29; // Dynamic tab width based on screen size
const tabs = ['All', 'Direct', 'Party'];

/**
 * @component Chats
 * @description Renders the chat screen with a search bar, animated tab navigation, and chat list.
 * @returns {JSX.Element} The chat screen.
 */

const Chats = () => {
    const [activeTab, setActiveTab] = useState<'All' | 'Direct' | 'Party'>('All');

    const translateX = useRef(new Animated.Value(0)).current; // Animation state for tab background

    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

    // all chat data
    const chatData: ChatItem[] = [
        {
            id: '1',
            name: 'Emma',
            message: 'Sounds Good!',
            timestamp: '9:45 am',
            profileImage: require('../assets/images/cardimg1.png'),
            notificationCount: 2,
        },
        {
            id: '2',
            name: 'Tyler',
            message: 'Sounds Good!',
            timestamp: '9:45 am',
            profileImage: require('../assets/images/cardimg2.png'),
        },
        {
            id: '3',
            name: 'Chess Group',
            message: 'Lets meet tomorrow',
            timestamp: '9:45 am',
            profileImage: require('../assets/images/cardimg3.png'),
            isGroup: true,
            memberCount: 20,
        },
        {
            id: '4',
            name: 'Emma',
            message: 'Sounds Good!',
            timestamp: '9:45 am',
            profileImage: require('../assets/images/cardimg1.png'),
            notificationCount: 4,
        },
        {
            id: '5',
            name: 'Emma',
            message: 'Sounds Good!',
            timestamp: '9:45 am',
            profileImage: require('../assets/images/cardimg1.png'),
            notificationCount: 2,
        },
        {
            id: '6',
            name: 'Tyler',
            message: 'Sounds Good!',
            timestamp: '9:45 am',
            profileImage: require('../assets/images/cardimg2.png'),
        },
        {
            id: '7',
            name: 'Chess Group',
            message: 'Lets meet tomorrow',
            timestamp: '9:45 am',
            profileImage: require('../assets/images/cardimg3.png'),
            isGroup: true,
            memberCount: 20,
        },
        {
            id: '8',
            name: 'Emma',
            message: 'Sounds Good!',
            timestamp: '9:45 am',
            profileImage: require('../assets/images/cardimg1.png'),
            notificationCount: 4,
        },
    ];

    // Direct chat data
    const DirectData: ChatItem[] = [
        {
            id: '1',
            name: 'Tyler',
            message: 'Sounds Good!',
            timestamp: '9:45 am',
            profileImage: require('../assets/images/cardimg2.png'),
        },
        {
            id: '2',
            name: 'Emma',
            message: 'Sounds Good!',
            timestamp: '9:45 am',
            profileImage: require('../assets/images/cardimg1.png'),
            notificationCount: 4,
        },
        {
            id: '3',
            name: 'Emma',
            message: 'Sounds Good!',
            timestamp: '9:45 am',
            profileImage: require('../assets/images/cardimg1.png'),
            notificationCount: 2,
        },
        {
            id: '4',
            name: 'Chess Group',
            message: 'Lets meet tomorrow',
            timestamp: '9:45 am',
            profileImage: require('../assets/images/cardimg3.png'),
            isGroup: true,
            memberCount: 20,
        },

    ];

    // Party chat data
    const PartyData: ChatItem[] = [
        {
            id: '1',
            name: 'Emma',
            message: 'Sounds Good!',
            timestamp: '9:45 am',
            profileImage: require('../assets/images/cardimg1.png'),
            notificationCount: 2,
        },
        {
            id: '2',
            name: 'Tyler',
            message: 'Sounds Good!',
            timestamp: '9:45 am',
            profileImage: require('../assets/images/cardimg2.png'),
        },
        {
            id: '3',
            name: 'Chess Group',
            message: 'Lets meet tomorrow',
            timestamp: '9:45 am',
            profileImage: require('../assets/images/cardimg3.png'),
            isGroup: true,
            memberCount: 20,
        },
        {
            id: '4',
            name: 'Emma',
            message: 'Sounds Good!',
            timestamp: '9:45 am',
            profileImage: require('../assets/images/cardimg1.png'),
            notificationCount: 4,
        },
    ];

    const handlePress = (tab: 'All' | 'Direct' | 'Party', index: number) => {
        setActiveTab(tab);
        Animated.spring(translateX, {
            toValue: index * tabWidth,
            speed: 10,
            bounciness: 5,
            useNativeDriver: true,
        }).start();
    };
    const globalstyle = getGlobalStyles();
    const { isDarkMode } = useTheme();
    return (
        <View style={[styles.container, globalstyle.container]}>
            <View style={{ paddingTop: 16 }} >
                <Input
                    placeholder="Search"
                    rightIcon={require('../assets/icons/searchicon.png')}
                    onChangeText={(text) => console.log(text)}
                />
            </View>

            <View style={[styles.tabbox, globalstyle.border, { backgroundColor: isDarkMode ? colors.charcol90 : "#EAEAEA" }]}>
                <Animated.View
                    style={[
                        styles.activeTabBackground,
                        { transform: [{ translateX }],backgroundColor:isDarkMode?colors.white:colors.charcol90 },
                    ]}
                />
                {tabs?.map((tab, index) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => handlePress(tab as 'All' | 'Direct' | 'Party', index)}
                        style={styles.tabButton}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                globalstyle.text_16_med_90,
                                activeTab === tab && {color:isDarkMode?colors.black:colors.white},
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}

            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {activeTab === "All" &&
                    <>
                        {chatData?.map((item) => (
                            <ChatCard
                                key={item.id + Date.now()}
                                item={item}
                                onPress={() => navigation.navigate('ChatBubble')}
                            />
                        ))}
                    </>
                }

                {activeTab === "Direct" &&
                    <>
                        {DirectData?.map((item) => (
                            <ChatCard
                                key={item.id + Date.now()}
                                item={item}
                                onPress={() => navigation.navigate('ChatBubble')}
                            />
                        ))}
                    </>
                }

                {activeTab === "Party" &&
                    <>
                        {PartyData?.map((item) => (
                            <ChatCard
                                key={item.id + Date.now()}
                                item={item}
                                onPress={() => navigation.navigate('ChatBubble')}
                            />
                        ))}
                    </>
                }

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabbox: {
        flexDirection: 'row',
        marginTop: 16,
        width: tabWidth * tabs.length,
        borderRadius: 28,
        padding: 8,
        // backgroundColor: '#EAEAEA',
        position: 'relative',
        overflow: 'hidden',
        gap: 16
    },
    tabButton: {
        flex: 1,
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        zIndex: 2,
        width: 80

    },
    activeTabBackground: {
        position: 'absolute',
        width: tabWidth - 18,
        height: '100%',
        // backgroundColor: colors.charcol90,
        borderRadius: 20,
        left: 8,
        zIndex: 1,
        top: 8, right: -8,
    },
    activeText: {
        color: colors.white,
    },
    chatListContainer: {
        flex: 1,
    },
});

export default Chats;