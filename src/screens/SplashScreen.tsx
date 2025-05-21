import { useAuth } from '@/context/AuthContext';
import { getGlobalStyles } from '@/styles/globaltheme';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';

const SplashScreen = () => {
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const globalstyle = getGlobalStyles();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoggedIn) {
                navigation.navigate('MainTab');
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [isLoggedIn, navigation]);
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
