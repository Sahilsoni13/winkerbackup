import { globalstyle } from "@/styles/global";
import { colors } from "@/styles/globaltheme";
import { DropdownProps } from "@/types/type";
import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Animated } from "react-native";


/**
 * @function Dropdown
 * @description A React component that renders a dropdown menu with selectable options and an animated toggle icon.
 * @param {DropdownProps} props - The props for the Dropdown component
 * @param {string[]} props.options - Array of options to display in the dropdown
 * @param {string} [props.defaultValue="Select"] - Default value to display when no option is selected
 * @param {(option: string) => void} [props.onSelect] - Callback function triggered when an option is selected
 * @returns {JSX.Element} The dropdown component
 */
const Dropdown: React.FC<DropdownProps> = ({ options, defaultValue = "Select", onSelect }) => {

    // State to track whether the dropdown menu is open or closed
    const [isOpen, setIsOpen] = useState(false);

    // State to store the currently selected option
    const [selected, setSelected] = useState(defaultValue);

    // Animated value for controlling the rotation of the dropdown icon
    const rotateAnim = useRef(new Animated.Value(0)).current; // Animation reference


    /**
     * Toggles the dropdown menu open or closed and animates the icon rotation
     */
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
        Animated.timing(rotateAnim, {
            toValue: isOpen ? 0 : 1, // Rotate between 0 and 1
            duration: 200, // Smooth transition duration
            useNativeDriver: true,
        }).start();
    };


    /**
     * Handles the selection of an option from the dropdown
     * @param {string} option - The selected option
     */
    const handleSelect = (option: string) => {
        setSelected(option);
        setIsOpen(false);
        Animated.timing(rotateAnim, {
            toValue: 0, // Reset rotation
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    /**
     * Interpolates the rotation animation for the dropdown icon
     * @type {Animated.AnimatedInterpolation<string>}
     */
    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });
    return (


        <View style={styles.container}>
            <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
                <Text style={[globalstyle.text_12_med_90, { textTransform: "capitalize" }]}>{selected}</Text>
                <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
                    <Image source={require("@/assets/icons/dropdownicon.png")} style={[{ width: 18, height: 18, }]} />
                </Animated.View>
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdownMenu}>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
                                <Text style={[globalstyle.text_12_med_90, { textTransform: "capitalize" }]}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};


/**
 * @constant {Object} styles - Defines the styles for the Dropdown component
 */
const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "auto",
    },
    dropdownButton: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.charcol30,
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        gap: 4
    },
    dropdownMenu: {
        position: "absolute",
        top: 30,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#B0B0B0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    option: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        textTransform: "capitalize"
    },
});

export default Dropdown;
