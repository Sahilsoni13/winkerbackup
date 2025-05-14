import { CustomIconProps, IconName } from '@/types/type';
import React from 'react';
import { Image, StyleSheet, ImageSourcePropType } from 'react-native';

/**
 * @typedef {'Explore' | 'Chats' | 'Winks' | 'Games' | 'Settings'} IconName
 * Represents the possible icon names for the bottom navigation.
 */


/**
 * Light theme icons mapping.
 * @type {Record<IconName, ImageSourcePropType>}
 */

const lightIcons: Record<IconName, ImageSourcePropType> = {
    Explore: require('../assets/icons/Explorelight.png'),
    Chats: require('../assets/icons/Chatlight.png'),
    Winks: require('../assets/icons/Winkslight.png'),
    Games: require('../assets/icons/gamelight.png'),
    Settings: require('../assets/icons/Settinglight.png'),
};

/**
 * Dark theme icons mapping.
 * @type {Record<IconName, ImageSourcePropType>}
 */

const darkIcons: Record<IconName, ImageSourcePropType> = {
    Explore: require('../assets/icons/Exploredark.png'),
    Chats: require('../assets/icons/Chatdark.png'),
    Winks: require('../assets/icons/Winksdark.png'),
    Games: require('../assets/icons/gamedark.png'),
    Settings: require('../assets/icons/Settingdark.png'),
};



/**
 * CustomIcon component renders an icon based on the selected state (focused or not).
 * @param {CustomIconProps} props - The properties for the icon.
 * @returns {JSX.Element} - The rendered Image component.
 */

const CustomIcon: React.FC<CustomIconProps> = ({ name, size, focused }) => {
    const iconSource = focused ? darkIcons[name] : lightIcons[name];
    return <Image source={iconSource} style={[styles.icon, { width: size, height: size }]} />;
};

const styles = StyleSheet.create({
    icon: {
        resizeMode: 'contain',
    },
});

export default CustomIcon;
