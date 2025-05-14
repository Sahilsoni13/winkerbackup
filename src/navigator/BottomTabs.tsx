
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import color, { globalstyle } from '@/styles/global';
import { useTheme } from '@/ThemeContext';
/** Screen width for calculating tab sizes */
const { width: SCREEN_WIDTH } = Dimensions.get('window');
/** Dark-themed icons for tabs */
const darkIcons = {
    Explore: require('../assets/icons/Exploredark.png'),
    Chats: require('../assets/icons/Chatdark.png'),
    Winks: require('../assets/icons/Winksdark.png'),
    Games: require('../assets/icons/gamedark.png'),
    Settings: require('../assets/icons/Settingdark.png'),
};
/** Light-themed icons for tabs */
const lightIcons = {
    Explore: require('../assets/icons/Explorelight.png'),
    Chats: require('../assets/icons/Chatlight.png'),
    Winks: require('../assets/icons/Winkslight.png'),
    Games: require('../assets/icons/gamelight.png'),
    Settings: require('../assets/icons/Settinglight.png'),
};
/**
 * Custom bottom tab bar component with animated active tab background and notifications
 * @param {BottomTabBarProps} props - Navigation props for the bottom tab bar
 * @param {BottomTabNavigationProp} props.navigation - Navigation object for tab navigation
 * @returns {JSX.Element} The rendered NewBottomTabs component
 */
const NewBottomTabs: React.FC<BottomTabBarProps> = ({ navigation }) => {
    /** State to track the currently active tab index */
    const [activeTab, setActiveTab] = useState<number>(0);
    /** State to manage notification dots for each tab */
    const [notifications, setNotifications] = useState<{ [key: string]: boolean }>({
        Explore: false,
        Chats: false,
        Winks: true,
        Games: false,
        Settings: false,
    });
    /** Array of tab configurations */
    const tabs = [
        { label: 'Explore', darkIcon: darkIcons.Explore, lightIcon: lightIcons.Explore },
        { label: 'Chats', darkIcon: darkIcons.Chats, lightIcon: lightIcons.Chats },
        { label: 'Winks', darkIcon: darkIcons.Winks, lightIcon: lightIcons.Winks },
        { label: 'Games', darkIcon: darkIcons.Games, lightIcon: lightIcons.Games },
        { label: 'Settings', darkIcon: darkIcons.Settings, lightIcon: lightIcons.Settings },
    ];

    /** Total number of tabs */
    const totalTabs = tabs.length;

    /** Width of the active tab */
    const activeTabWidth = SCREEN_WIDTH / totalTabs * 1.4;

    /** Width of inactive tabs */
    const inactiveTabWidth = (SCREEN_WIDTH - activeTabWidth) / (totalTabs - 0.4);

    /** Shared value for animating the background position */
    const backgroundPosition = useSharedValue(0);

    /** Animated style for the active tab background */
    const backgroundStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: withSpring(backgroundPosition.value, { damping: 20, stiffness: 150 }) },
        ],
    }));
    /**
     * Calculates the position of the active tab background based on the tab index
     * @param {number} index - The index of the tab
     * @returns {number} The calculated position for the active tab background
     */
    const calculateTabPosition = (index: number): number => {
        let position = 0;
        for (let i = 0; i < index; i++) {
            position += inactiveTabWidth;
        }
        const maxPosition = SCREEN_WIDTH - activeTabWidth - 8;
        const finalPosition = Math.min(Math.max(position, 8), maxPosition);
        return finalPosition;
    };
    /**
     * Changes the active tab and updates the background position and notifications
     * @param {number} index - The index of the tab to activate
     */
    const changeTab = (index: number): void => {
        setActiveTab(index);
        backgroundPosition.value = calculateTabPosition(index);
        setNotifications((prev) => ({
            ...prev,
            [tabs[index].label]: false,
        }));
    };
    /**
     * Updates the background position when the active tab or tab widths change
     */
    useEffect(() => {
        backgroundPosition.value = calculateTabPosition(activeTab);
    }, [activeTabWidth, inactiveTabWidth, activeTab]);



    const { isDarkMode } = useTheme();
    return (
        <>
            <View style={{ position: "relative" }}>
                {
                    !isDarkMode &&
                    <LinearGradient
                        pointerEvents="none"
                        colors={['rgba(255, 255, 255, 0.00)', 'rgba(255, 255, 255, 0.55)', '#FFFFFF',]}
                        locations={[0.0108, 0.5479, 0.9274]} // Percentages ko 0-1 scale mein convert kiya
                        angle={359} // 359 degrees direction
                        style={{ flexDirection: "column", justifyContent: "flex-end", position: "absolute", bottom: 0, left: 0, right: 0, height: 180, }}
                    />
                }
                <GestureHandlerRootView style={styles.container}>
                    <View style={styles.navBar}>
                        <Animated.View style={[styles.activeTabBackground, { width: activeTabWidth }, backgroundStyle]} />
                        {tabs && tabs?.map((tab, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.tab,
                                    { width: index === activeTab ? activeTabWidth : inactiveTabWidth },
                                    index === 0 && { paddingLeft: 20 },
                                ]}
                                onPress={() => { changeTab(index), navigation.navigate(tab.label) }}
                            >
                                <View style={styles.tabContent}>
                                    <View style={styles.iconContainer}>
                                        <Image
                                            source={activeTab === index ? tab.darkIcon : tab.lightIcon}
                                            style={[styles.icon, activeTab === index && styles.activeIcon]}
                                        />
                                        {notifications[tab.label] && (
                                            <View style={styles.notificationDotContainer}>
                                                {Platform.OS === 'android' && (
                                                    <>
                                                        <View style={[styles.glowEffect, styles.glowLayer1]} />
                                                    </>
                                                )}
                                                <View style={styles.notificationDot} />
                                            </View>
                                        )}
                                    </View>
                                    {activeTab === index && (
                                        <Text style={[globalstyle.text_16_med_90, activeTab === index && styles.activeTabText]}>
                                            {tab.label}
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </GestureHandlerRootView>
            </View>
        </>
    );
};

/**
 * Styles for the NewBottomTabs component
 * @type {Object}
 */
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginBottom: 17,
        position: "relative",
        zIndex: 3
    },
    navBar: {
        flexDirection: 'row',
        backgroundColor: color.charcol100,
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
        position: 'relative',
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingVertical: 8,
        paddingLeft: 8,
        borderRadius: 20,
    },
    activeTabBackground: {
        position: 'absolute',
        top: 8,
        bottom: 8,
        left: 2,
        backgroundColor: '#fff',
        borderRadius: 40,
        alignSelf: "center"
    },
    tabContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    iconContainer: {
        position: 'relative',
        overflow: 'visible',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    activeIcon: {
        width: 16,
        height: 16,
    },
    notificationDotContainer: {
        position: 'absolute',
        top: -3,
        left: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    glowEffect: {
        position: 'absolute',
        top: -8,
        left: -2,
        borderRadius: 12,
        backgroundColor: color.purple60,
        elevation: 10,
    },
    glowLayer1: {
        width: 18,
        height: 18,
        opacity: 0.22,
    },
    glowLayer2: {
        width: 15,
        height: 15,
        opacity: 0.3,
    },
    glowLayer3: {
        width: 10,
        height: 10,
        opacity: 0.4,
    },
    notificationDot: {
        position: 'absolute',
        top: -3,
        left: 4,
        width: 6,
        height: 6,
        backgroundColor: color.purple60,
        borderRadius: 5,
        zIndex: 10,
        ...Platform.select({
            ios: {
                shadowColor: color.purple60,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 12,
            },
            android: {
                elevation: 10,
                shadowColor: color.purple60,
            },
        }),
    },
    activeTabText: {
        color: color.black,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default NewBottomTabs;






