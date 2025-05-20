import { getGlobalStyles } from '@/styles/globaltheme';
import React from 'react';
import { Image, View } from 'react-native';

const SplashScreen = () => {
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
<<<<<<< HEAD

=======
>>>>>>> 83904b9e2ccf9b43e40dba9386f70a8f82c60f8c
