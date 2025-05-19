// import { getGlobalStyles } from '@/styles/globaltheme';
// import { useTheme } from '@/ThemeContext';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import React, { useEffect } from 'react'
// import { Image, Text, View } from 'react-native'

// const SplashScreen = () => {



//     /** Navigation object to handle screen transitions */
//     const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             navigation.navigate("OnboardingScreen"); // Navigate to the main screen
//         }, 3000);
//         return () => clearTimeout(timer);
//     }, [navigation]);
//     const globalstyle = getGlobalStyles();
//     return (
//         <View style={[globalstyle.container,{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center" }]}>
//             <Image source={require("../assets/icons/splashLogo.png")} style={[{ width: 120, height: 120, alignSelf: "center" ,}]} />
//         </View>
//     )
// }

// export default SplashScreen



import { getGlobalStyles } from '@/styles/globaltheme';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, View, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('idToken');

                if (token) {
                    // ✅ User is already logged in, navigate to Explore screen
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'MainTab' }],
                    });
                } else {
                    // ❌ Not logged in, go to Onboarding screen
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'OnboardingScreen' }],
                    });
                }
            } catch (error) {
                console.error('Error checking login status:', error);
                // fallback in case of error
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'OnboardingScreen' }],
                });
            }
        };

        checkLoginStatus();
    }, [navigation]);

    const globalstyle = getGlobalStyles();

    return (
        <View
            style={[
                globalstyle.container,
                {
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            ]}
        >
            <Image
                source={require('../assets/icons/splashLogo.png')}
                style={{ width: 120, height: 120, alignSelf: 'center' }}
            />
        </View>
    );
};

export default SplashScreen;
    