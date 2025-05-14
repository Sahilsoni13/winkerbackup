import color, { globalstyle } from '@/styles/global';
import { ChatHeaderProps } from '@/types/type';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';


const ChatHeader: React.FC<ChatHeaderProps> = ({ title, isGroup, status, peopleCount, onOptions }) => {
    /**
     * @constant {NavigationProp} navigation - Navigation object to handle screen transitions.
     */
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();


    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <Image style={{ width: 24, height: 24 }} source={require("@/assets/icons/backarrow.png")} />
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
                <Image style={{ width: 24, height: 24 }} source={require("@/assets/icons/threedots.png")} />
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
        backgroundColor: color.white,
    },
    info: {
        flex: 1,
        alignItems: 'center',
    },
});

export default ChatHeader;
