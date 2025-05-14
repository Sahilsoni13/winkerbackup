import CircularProgressAnimation from '@/component/animations/CircularProgressAnimation';
import color, { globalstyle } from '@/styles/global';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * @function Settings
 * @description Renders the Settings screen, which allows users to navigate to different settings options and view their profile details.
 */

const Settings = () => {



    // navigation 
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

    //    profile tabs data
    const profileTabs = [
        {
            Icon: require("../assets/icons/premiumicon.png"),
            title: "Upgrade to Premium",
            route: "PremiumPlans",
        },
        {
            Icon: require("../assets/icons/notificationicon.png"),
            title: "Notification/Sounds",
            route: "Notification",
        },
        {
            Icon: require("../assets/icons/privacy.png"),
            title: "Privacy/Security",
            route: "PrivacySecurity",
        },
        {
            Icon: require("../assets/icons/generalsetting.png"),
            title: "General Setting",
            route: "GeneralSetting",
        },
    ];

    /**
 * User data object containing profile details.
 * @typedef {Object} UserData
 * @property {string} name - The name of the user.
 * @property {any} profileImage - The user's profile image, imported using `require`.
 * @property {number} progress - The user's progress percentage.
 */

    /** @type {UserData} */

    const userdata = {
        name: "John Doe",
        profileImage: require("../assets/images/userimage.png"),
        progress: 100,
    }

    return (
        <View style={[styles.container, { backgroundColor: color.white }]}>
            {/* User Profile Section */}
            <View style={styles.profileSection}>
                <View style={styles.profileImageWrapper}>
                    {/* Profile Image */}
                    <Image
                        source={userdata.profileImage}
                        style={styles.profileImage}
                    />
                    {/* Circular Progress Animation Overlay */}
                    <View style={styles.progressOverlay}>
                        <CircularProgressAnimation
                            clockwise={true}
                            progressValue={userdata.progress}
                            duration={3000}
                        />
                    </View>
                    <View style={styles.progressBadge}>
                        <Text style={globalstyle.text_14_reg_white}>{userdata.progress}%</Text>
                    </View>
                </View>
                <Text style={[styles.profileName, globalstyle.text_18_reg_90]}>{userdata.name}</Text>
                <TouchableOpacity style={styles.editProfileButton}>
                    <Text style={globalstyle.text_16_med_90}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            {/* Settings Options */}
            <View style={styles.settingsSection}>
                <Text style={[styles.settingsHeader, globalstyle.text_16_bold_100]}>Settings</Text>
                <View style={styles.tabsContainer}>
                    {profileTabs?.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate(item.route)}
                            style={[
                                styles.settingsItem,
                                index === 0
                                    ? { backgroundColor: color.purple10, borderColor: color.purple10 }
                                    : { backgroundColor: color.white, borderColor: color.charcol10 },
                            ]}
                        >
                            <Image style={{ width: 24, height: 24 }} source={item.Icon} />
                            <Text
                                style={
                                    index === 0
                                        ? [styles.premiumText, globalstyle.text_14_reg_pur50]
                                        : [styles.settingsText, globalstyle.text_14_reg_90]
                                }
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton}>
                <Text style={[styles.logoutText, globalstyle.text_14_bold_90]}>Logout</Text>
                <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../assets/icons/logout.png")}
                />
            </TouchableOpacity>
        </View>
    );
};

/**
 * @constant {Object} styles - Defines the styles for the Settings screen components.
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 16,
    },
    profileSection: {
        alignItems: "center",
    },
    profileImageWrapper: {
        position: "relative",
        alignItems: "center",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    progressOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        transform: [{ rotate: "-90deg" }],
    },
    progressBadge: {
        position: "absolute",
        top: -10,
        zIndex: 9,
        backgroundColor: color.charcol100,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 28,
    },
    profileName: {
        marginTop: 14,
    },
    editProfileButton: {
        backgroundColor: color.charcol05,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 28,
        marginTop: 16,
    },
    settingsSection: {
        width: "90%",
        marginTop: 32,
    },
    settingsHeader: {
        marginBottom: 16,
    },
    settingsItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
    },
    settingsText: {
        marginLeft: 10,
    },
    premiumText: {
        marginLeft: 10,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 32,
    },
    logoutText: {
        marginRight: 5,
    },
    tabsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 16,
    },
});

export default Settings;