

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Alert
} from "react-native";
import Dropdown from "./Dropdown";
import { DropdownFeatureProps } from "@/types/type";
import { colors, getGlobalStyles } from "@/styles/globaltheme";
import { useTheme } from "@/ThemeContext";

/**
 * @function DropdownFeature
 * @description A React component that renders a feature section with an icon, title, description, and a dropdown menu for selecting options.
 * @param {DropdownFeatureProps} props - The props for the DropdownFeature component
 * @param {ImageSourcePropType} props.iconSource - The source of the icon to display
 * @param {string} props.description - The description text for the feature
 * @param {string} props.title - The title of the feature
 * @param {string[]} props.option - Array of options for the dropdown menu
 * @param {string} props.defaultvalue - Default value for the dropdown menu
 * @returns {JSX.Element} The dropdown feature component
 */
const DropdownFeature: React.FC<DropdownFeatureProps> = ({ iconSource, description, title, option, defaultvalue }) => {

    const globalstyle = getGlobalStyles();
    const { isDarkMode } = useTheme();


    /**
     * Handles the selection of an option from the dropdown and displays an alert with the selected value
     * @param {string} value - The selected option value
     */
    const handleSelect = (value: string) => {
        Alert.alert("Selected", value);
    };
    return (
        <View style={styles.container}>
            <Image source={iconSource} style={[styles.icon, { tintColor: isDarkMode ? colors.white : colors.black }]} />
            <View style={styles.textContainer}>
                <Text style={[globalstyle.text_16_bold_100]}>{title}</Text>
                <Text style={[styles.description, globalstyle.text_14_reg_50]}>{description}</Text>
            </View>
            <Dropdown options={option} defaultValue={defaultvalue} onSelect={handleSelect} />
        </View>
    );
};

/**
 * @constant {Object} styles - Defines the styles for the DropdownFeature component
 */

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        position: "relative",
        zIndex: 20
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
        backgroundColor: colors.charcol30,
        justifyContent: "center",
        padding: 2,
    },
    toggleContainerActive: {
        backgroundColor: colors.charcol90,
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

export default DropdownFeature;

