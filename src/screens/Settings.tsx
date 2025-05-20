// import CircularProgressAnimation from '@/component/animations/CircularProgressAnimation';
// import { useApi } from '@/hook/useApi';
// import color, { globalstyle } from '@/styles/global';
// import { colors, getGlobalStyles } from '@/styles/globaltheme';
// import { useTheme } from '@/ThemeContext';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import React, { useEffect } from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { G } from 'react-native-svg';

// /**
//  * @function Settings
//  * @description Renders the Settings screen, which allows users to navigate to different settings options and view their profile details.
//  */

// const Settings = () => {

//     // navigation 
//     const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

//     //    profile tabs data
//     const profileTabs = [
//         {
//             Icon: require("../assets/icons/premiumicon.png"),
//             title: "Upgrade to Premium",
//             route: "PremiumPlans",
//         },
//         {
//             Icon: require("../assets/icons/notificationicon.png"),
//             title: "Notification/Sounds",
//             route: "Notification",
//         },
//         {
//             Icon: require("../assets/icons/privacy.png"),
//             title: "Privacy/Security",
//             route: "PrivacySecurity",
//         },
//         {
//             Icon: require("../assets/icons/generalsetting.png"),
//             title: "General Setting",
//             route: "GeneralSetting",
//         },
//     ];

//     /**
//  * User data object containing profile details.
//  * @typedef {Object} UserData
//  * @property {string} name - The name of the user.
//  * @property {any} profileImage - The user's profile image, imported using `require`.
//  * @property {number} progress - The user's progress percentage.
//  */

//     /** @type {UserData} */

//     const userdata = {
//         name: "John Doe",
//         profileImage: require("../assets/images/userimage.png"),
//         progress: 100,
//     }
//     const globalstyle = getGlobalStyles();
//     const { isDarkMode } = useTheme();

//     const { mutate: fetchUser } = useApi();
//     useEffect(() => {
//         fetchUser({
//             url: '/users/profile',
//             method: 'GET',
//             showToast: true,
//             successMessage: 'User fetched successfully!',
//         },
//             {
//                 onSuccess: (response) => {
//                     console.log(response.data)
//                 }
//             }
//         );
//     }, [])
//     return (
//         <View style={[styles.container, globalstyle.container, {}]}>
//             {/* User Profile Section */}
//             <View style={styles.profileSection}>
//                 <View style={styles.profileImageWrapper}>
//                     {/* Profile Image */}
//                     <Image
//                         source={userdata.profileImage}
//                         style={styles.profileImage}
//                     />
//                     {/* Circular Progress Animation Overlay */}
//                     <View style={styles.progressOverlay}>
//                         <CircularProgressAnimation
//                             clockwise={true}
//                             progressValue={userdata.progress}
//                             duration={3000}
//                         />
//                     </View>
//                     <View style={styles.progressBadge}>
//                         <Text style={globalstyle.text_14_reg_white}>{userdata.progress}%</Text>
//                     </View>
//                 </View>
//                 <Text style={[styles.profileName, globalstyle.text_18_reg_90]}>{userdata.name}</Text>
//                 <TouchableOpacity style={[styles.editProfileButton, { backgroundColor: isDarkMode ? colors.charcol80 : colors.charcol05 }]}>
//                     <Text style={globalstyle.text_16_med_90}>Edit Profile</Text>
//                 </TouchableOpacity>
//             </View>
//             {/* Settings Options */}
//             <View style={styles.settingsSection}>
//                 <Text style={[styles.settingsHeader, globalstyle.text_16_bold_100]}>Settings</Text>
//                 <View style={styles.tabsContainer}>
//                     {profileTabs?.map((item, index) => (
//                         <TouchableOpacity
//                             key={index}
//                             onPress={() => navigation.navigate(item.route)}
//                             style={[
//                                 styles.settingsItem,
//                                 index === 0
//                                     ? { backgroundColor: color.purple10, borderColor: color.purple10 }
//                                     : { backgroundColor: isDarkMode ? color.charcol80 : color.white, borderColor: isDarkMode ? color.charcol80 : color.charcol10 },
//                             ]}
//                         >
//                             <Image style={{ width: 24, height: 24, tintColor: index === 0 ? color.purple50 : isDarkMode ? color.white : color.black }} source={item.Icon} />
//                             <Text
//                                 style={
//                                     index === 0
//                                         ? [styles.premiumText, globalstyle.text_14_reg_pur50]
//                                         : [styles.settingsText, globalstyle.text_14_reg_90]
//                                 }
//                             >
//                                 {item.title}
//                             </Text>
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//             </View>
//             {/* Logout Button */}
//             <TouchableOpacity style={styles.logoutButton}>
//                 <Text style={[styles.logoutText, globalstyle.text_14_bold_90]}>Logout</Text>
//                 <Image
//                     style={{ width: 20, height: 20, tintColor: isDarkMode ? colors.white : colors.black }}
//                     source={require("../assets/icons/logout.png")}
//                 />
//             </TouchableOpacity>
//         </View>
//     );
// };

// /**
//  * @constant {Object} styles - Defines the styles for the Settings screen components.
//  */
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         paddingTop: 16,
//     },
//     profileSection: {
//         alignItems: "center",
//     },
//     profileImageWrapper: {
//         position: "relative",
//         alignItems: "center",
//     },
//     profileImage: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//     },
//     progressOverlay: {
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: 100,
//         height: 100,
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 1,
//         transform: [{ rotate: "-90deg" }],
//     },
//     progressBadge: {
//         position: "absolute",
//         top: -10,
//         zIndex: 9,
//         backgroundColor: color.charcol100,
//         paddingHorizontal: 12,
//         paddingVertical: 4,
//         borderRadius: 28,
//     },
//     profileName: {
//         marginTop: 14,
//     },
//     editProfileButton: {
//         paddingHorizontal: 16,
//         paddingVertical: 8,
//         borderRadius: 28,
//         marginTop: 16,
//     },
//     settingsSection: {
//         width: "90%",
//         marginTop: 32,
//     },
//     settingsHeader: {
//         marginBottom: 16,
//     },
//     settingsItem: {
//         flexDirection: "row",
//         alignItems: "center",
//         padding: 14,
//         borderRadius: 10,
//         borderWidth: 1,
//         borderStyle: "solid",
//     },
//     settingsText: {
//         marginLeft: 10,
//     },
//     premiumText: {
//         marginLeft: 10,
//     },
//     logoutButton: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginTop: 32,
//     },
//     logoutText: {
//         marginRight: 5,
//     },
//     tabsContainer: {
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         gap: 16,
//     },
// });

// export default Settings;

import CircularProgressAnimation from '@/component/animations/CircularProgressAnimation';
import { useAuth } from '@/context/AuthContext';
import { useApi } from '@/hook/useApi';
import color, { globalstyle } from '@/styles/global';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Define the Profile interface based on API response
interface Profile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePictureUrl: string;
    profilePictureUrls: string[];
    location: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}

// Calculate profile completion percentage with null/undefined handling
const calculateProfileCompletion = (profile: Profile | null): number => {
    if (!profile) return 0; // Return 0% if profile is null

    const fillableFields = [
        {
            key: 'email',
            isFilled: (value: string | null | undefined) => !!value && value.trim() !== '',
        },
        {
            key: 'firstName',
            isFilled: (value: string | null | undefined) => !!value && value.trim() !== '',
        },
        {
            key: 'lastName',
            isFilled: (value: string | null | undefined) => !!value && value.trim() !== '',
        },
        {
            key: 'profilePictureUrl',
            isFilled: (value: string | null | undefined) => !!value && value.trim() !== '',
        },
        {
            key: 'profilePictureUrls',
            isFilled: (value: string[] | null | undefined) => Array.isArray(value) && value.length > 0,
        },
        {
            key: 'location',
            isFilled: (value: Record<string, any> | null | undefined) => value != null && Object.keys(value).length > 0,
        },
    ];

    const filledFields = fillableFields.reduce((count, field) => {
        const value = profile[field.key as keyof Profile];
        return count + (field.isFilled(value as any) ? 1 : 0);
    }, 0);

    return Math.round((filledFields / fillableFields.length) * 100);
};

const Settings = () => {
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const { isDarkMode } = useTheme();
    const globalstyle = getGlobalStyles();

    // State to store fetched profile data
    const [profile, setProfile] = useState<Profile | null>(null);

    // API hook for fetching user profile
    const { mutate: fetchUser, isPending: loading, error } = useApi();

    const checkToken = async () => {
        const token = await AsyncStorage.getItem("idToken");
        console.log(token)
    }




    useEffect(() => {
        checkToken()
        fetchUser(
            {
                url: '/users/profile',
                method: 'GET',
                showToast: false,
            },
            {
                onSuccess: (response) => {
                    setProfile(response.data);
                    console.log(response, "new resonse")
                },
                onError: (err) => {
                    console.log('Error fetching profile:', err.message);
                },
            },
        );
    }, [fetchUser]);

    // Profile tabs data
    const profileTabs = [
        {
            Icon: require('../assets/icons/premiumicon.png'),
            title: 'Upgrade to Premium',
            route: 'PremiumPlans',
        },
        {
            Icon: require('../assets/icons/notificationicon.png'),
            title: 'Notification/Sounds',
            route: 'Notification',
        },
        {
            Icon: require('../assets/icons/privacy.png'),
            title: 'Privacy/Security',
            route: 'PrivacySecurity',
        },
        {
            Icon: require('../assets/icons/generalsetting.png'),
            title: 'General Setting',
            route: 'GeneralSetting',
        },
    ];

    // Fallback data for initial render or error state
    const fallbackUserdata = {
        name: 'John Doe',
        profileImage: require('../assets/images/userimage.png'),
        progress: 0,
    };

    console.log(profile?.firstName, "firstname")

    // Calculate display values with null checks
    const displayName = profile
        ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'User'
        : fallbackUserdata.name;
    const displayImage = profile?.profilePictureUrl
        ? { uri: profile.profilePictureUrl }
        : fallbackUserdata.profileImage;
    const progress = calculateProfileCompletion(profile);

    const { isLoggedIn, logout } = useAuth();

    // Call logout on button press
    const handleLogout = async () => {
        await logout();
    };
    return (
        <View style={[styles.container, globalstyle.container]}>
            {/* User Profile Section */}
            <View style={styles.profileSection}>
                <View style={styles.profileImageWrapper}>
                    {/* Profile Image */}
                    <Image source={displayImage} style={styles.profileImage} />
                    {/* Circular Progress Animation Overlay */}
                    <View style={styles.progressOverlay}>
                        <CircularProgressAnimation clockwise={true} progressValue={progress} duration={3000} />
                    </View>
                    <View style={styles.progressBadge}>
                        <Text style={globalstyle.text_14_reg_white}>{progress}%</Text>
                    </View>
                </View>
                <Text style={[styles.profileName, globalstyle.text_18_reg_90]}>{displayName}</Text>
                <TouchableOpacity
                    style={[styles.editProfileButton, { backgroundColor: isDarkMode ? colors.charcol80 : colors.charcol05 }]}
                    onPress={() => navigation.navigate('EditProfile')}
                >
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
                                    : {
                                        backgroundColor: isDarkMode ? color.charcol80 : color.white,
                                        borderColor: isDarkMode ? color.charcol80 : color.charcol10,
                                    },
                            ]}
                        >
                            <Image
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: index === 0 ? color.purple50 : isDarkMode ? color.white : color.black,
                                }}
                                source={item.Icon}
                            />
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
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={[styles.logoutText, globalstyle.text_14_bold_90]}>Logout</Text>
                <Image
                    style={{ width: 20, height: 20, tintColor: isDarkMode ? colors.white : colors.black }}
                    source={require('../assets/icons/logout.png')}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 16,
    },
    profileSection: {
        alignItems: 'center',
    },
    profileImageWrapper: {
        position: 'relative',
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    progressOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        transform: [{ rotate: '-90deg' }],
    },
    progressBadge: {
        position: 'absolute',
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
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 28,
        marginTop: 16,
    },
    settingsSection: {
        width: '90%',
        marginTop: 32,
    },
    settingsHeader: {
        marginBottom: 16,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: 'solid',
    },
    settingsText: {
        marginLeft: 10,
    },
    premiumText: {
        marginLeft: 10,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 32,
    },
    logoutText: {
        marginRight: 5,
    },
    tabsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 16,
    },
});

export default Settings;