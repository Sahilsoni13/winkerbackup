import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Button from '../Button';
import { HousePartyFilterModalProps } from '@/types/type';
import color, { globalstyle } from '@/styles/global';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';

/**
 * @function HousePartyFilterModal
 * @description A modal component for filtering house party categories with multiple selection capability.
 * @param {HousePartyFilterModalProps} props - The props for the modal component.
 * @returns {JSX.Element} The rendered modal component.
 */

const HousePartyFilterModal = ({ onClose, options }: HousePartyFilterModalProps) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Multiple selection state


    /**
     * @function handleSelect
     * @description Handles the selection or deselection of a filter option.
     * @param {string} option - The option to select or deselect.
     */
    const handleSelect = (option: string) => {
        setSelectedOptions(prev =>
            prev.includes(option)
                ? prev.filter(item => item !== option) // Deselect if already selected
                : [...prev, option] // Select if not selected
        );
    };

    /**
     * @function clearSelection
     * @description Clears all selected filter options.
     */
    const clearSelection = () => {
        setSelectedOptions([]); // Reset selection
    };
 const globalstyle = getGlobalStyles();
const { isDarkMode } = useTheme();
    return (
        <Modal transparent visible animationType="fade" onRequestClose={onClose}>
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={onClose} // Close only when clicking outside
            >
                <TouchableOpacity
                    activeOpacity={1} // Prevents closing when clicking inside modal content
                    style={[styles.modalContent,globalstyle.container]}
                    onPress={(e) => e.stopPropagation()} // Stop propagation to overlay
                >
                    <View style={{
                        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                        marginBottom: 16,
                    }}>

                        <Text style={[styles.modalTitle, globalstyle.text_20_bold_90]}>Filter</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Image source={require("@/assets/icons/close.png")} style={{ width: 20, height: 20,tintColor: isDarkMode ? colors.white : colors.black }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.filterOptions}>
                        {options?.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.optionButton,
                                    selectedOptions.includes(option) ? isDarkMode? {backgroundColor:color.purple50}:{backgroundColor:colors.purple50}:isDarkMode?{backgroundColor:colors.charcol90}:{backgroundColor:colors.charcol05},
                                ]}
                                onPress={() => handleSelect(option)}
                            >
                                <Text
                                    style={[
                                        globalstyle.text_16_med_90,
                                        selectedOptions.includes(option) && styles.selectedText,
                                    ]}
                                >
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={{ flexDirection: "column", gap: 8 }}>
                        <Button title='Apply' />
                        <Button onPress={clearSelection} title="Clear All" variant="outlined" />
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        // backgroundColor: color.white,
        borderRadius: 20,
        padding: 24,
    },
    modalTitle: {
        textAlign: "left",
    },
    filterOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 36,
    },
    optionButton: {
        backgroundColor: color.charcol05,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        margin: 5,
    },
    selectedButton: {
        backgroundColor: color.purple50, // Purple for selection
    },
    selectedText: {
        color: color.white, // White text for selected button
    },
});

export default HousePartyFilterModal;
