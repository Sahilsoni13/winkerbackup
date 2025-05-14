

import color, { globalstyle } from "@/styles/global";
import { SecurityToggleProps } from "@/types/type";
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";


/**
 * @function SecurityToggle
 * @description A React component that renders a security feature section with an icon, title, description, and a toggle button.
 * @param {SecurityToggleProps} props - The props for the SecurityToggle component
 * @param {ImageSourcePropType} props.iconSource - The source of the icon to display
 * @param {string} props.description - The description text for the security feature
 * @param {string} props.title - The title of the security feature
 * @param {string} props.buttonText - The text to display on the toggle button
 * @param {() => void} props.onPress - Callback function triggered when the toggle button is pressed
 * @returns {JSX.Element} The security toggle component
 */
const SecurityToggle: React.FC<SecurityToggleProps> = ({ iconSource, description, title, buttonText, onPress }) => {
    
    return (
        <View style={styles.container}>
            <Image source={iconSource} style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={[globalstyle.text_16_bold_100]}>{title}</Text>
                <Text style={[styles.description, globalstyle.text_14_reg_50]}>{description}</Text>
            </View>
            <TouchableOpacity onPress={onPress}>
                <View style={{ paddingVertical: 4, paddingHorizontal: 12, backgroundColor: color.charcol10, borderRadius: 28 }}>
                    <Text style={[globalstyle.text_12_med_90]}>{buttonText}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

/**
 * @constant {Object} styles - Defines the styles for the SecurityToggle component
 */
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start"
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    textContainer: {
        flex: 1,
        marginLeft: 8,
    },
    description: {
        marginTop: 8.5,
        maxWidth: 215
    },
    toggleContainer: {
        width: 40,
        height: 20,
        borderRadius: 20,
        backgroundColor: color.charcol30,
        justifyContent: "center",
        padding: 2,
    },
    toggleContainerActive: {
        backgroundColor: color.charcol90,
    },
    toggleThumb: {
        width: 16,
        height: 16,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        position: "absolute",
        left: 2,
    },
});

export default SecurityToggle;

