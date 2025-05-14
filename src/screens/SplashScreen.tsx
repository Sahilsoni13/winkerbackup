import color from '@/styles/global';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Image, Text, View } from 'react-native'

const SplashScreen = () => {



    /** Navigation object to handle screen transitions */
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate("OnboardingScreen"); // Navigate to the main screen
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigation]);
    return (
        <View style={[{ flex: 1, backgroundColor: color.white, flexDirection: "column", alignItems: "center", justifyContent: "center" }]}>
            <Image source={require("../assets/icons/splashLogo.png")} style={[{ width: 120, height: 120, alignSelf: "center" }]} />
        </View>
    )
}

export default SplashScreen