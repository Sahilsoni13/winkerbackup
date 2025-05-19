import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';
import { ChatHeaderProps } from '@/types/type';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';


const ChatHeader: React.FC<ChatHeaderProps> = ({ title, isGroup, status, peopleCount, onOptions }) => {
    /**
     * @constant {NavigationProp} navigation - Navigation object to handle screen transitions.
     */
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const { isDarkMode } = useTheme();
    const globalstyle = getGlobalStyles();

    return (
        <View style={[styles.container,{backgroundColor:isDarkMode ? colors.charcol100 : colors.white}]}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <Image style={{ width: 24, height: 24,tintColor:isDarkMode?colors.white:colors.charcol90 }} source={require("@/assets/icons/backarrow.png")} />
            </TouchableOpacity>

            {/* Chat Info */}
            <View style={styles.info}>
                <Text style={[globalstyle.text_16_bold_90]}>{title}</Text>
                <Text style={[globalstyle.text_12_reg_40, { marginTop: 4 }]}>
                    {isGroup ? `${status} Active • ${peopleCount} people` : status}
                </Text>
            </View>

            {/* Options Button */}
            <TouchableOpacity onPress={onOptions} >
                <Image style={{ width: 24, height: 24,tintColor:isDarkMode?colors.white:colors.charcol90 }} source={require("@/assets/icons/threedots.png")} />
            </TouchableOpacity>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    info: {
        flex: 1,
        alignItems: 'center',
    },
});

export default ChatHeader;
