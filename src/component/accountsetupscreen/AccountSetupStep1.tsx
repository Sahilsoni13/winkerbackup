import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DateOfBirthInput from '../DateOfBirthInput';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';

/**
 * Component for the first step of account setup, handling date of birth and gender selection
 * @returns {JSX.Element} The rendered account setup step 1 component
 */
const AccountSetupStep1 = () => {

    /** User's selected gender */
    const [gender, setGender] = useState<string>('Male');

    const { isDarkMode } = useTheme();
    const globalstyle = getGlobalStyles();


    return (
        <>
            <View style={styles.content}>
                {/* date component */}
                <DateOfBirthInput />
                <Text style={[styles.label, globalstyle.text_16_reg_100]}>Gender</Text>
                <View style={styles.genderContainer}>
                    <TouchableOpacity
                        style={[styles.genderButton, gender === 'Male' && { backgroundColor: isDarkMode ? colors.charcol100 : colors.charcol05, borderWidth: 1, borderColor: colors.white }]}
                        onPress={() => setGender('Male')}
                    >
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: gender === 'Male'
                                    ? colors.white
                                    : isDarkMode
                                        ? colors.white
                                        : colors.black,
                            }}
                            source={require("../../assets/icons/male.png")}
                        />
                        <Text
                            style={[
                                isDarkMode
                                    ? globalstyle.text_16_med_white
                                    : globalstyle.text_16_med_90,
                                gender === 'Male' && globalstyle.text_16_med_white,

                            ]}
                        >
                            Male
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.genderButton, gender === 'Female' && { backgroundColor: isDarkMode ? colors.black : colors.white, borderWidth: 1, borderColor: colors.white }]}
                        onPress={() => setGender('Female')}
                    >
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: gender === 'Female'
                                    ? colors.white
                                    : isDarkMode
                                        ? colors.white
                                        : colors.black,
                            }}
                            source={require("../../assets/icons/female.png")}
                        />
                        <Text
                            style={[
                                isDarkMode
                                    ? globalstyle.text_16_med_white
                                    : globalstyle.text_16_med_90,
                                gender === 'Female' && globalstyle.text_16_med_white,
                            ]}
                        >
                            Female
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.genderButton, gender === 'Non Binary' && { backgroundColor: isDarkMode ? colors.black : colors.white, borderWidth: 1, borderColor: colors.white }]}
                        onPress={() => setGender('Non Binary')}
                    >
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: gender === 'Non Binary'
                                    ? colors.white
                                    : isDarkMode
                                        ? colors.white
                                        : colors.black,
                            }}
                            source={require("../../assets/icons/nonbinary.png")}
                        />
                        <Text
                            style={[
                                isDarkMode
                                    ? globalstyle.text_16_med_white
                                    : globalstyle.text_16_med_90,
                                gender === 'Non Binary' && globalstyle.text_16_med_white,
                            ]}
                        >
                            Non Binary
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    label: {
        marginBottom: 8.5,
    },
    dateContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    input: {
        borderRadius: 8,
        padding: 18,
        textAlign: 'center',
        width: "100%"
    },
    genderContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    genderButton: {
        flexDirection: 'row',
        borderRadius: 28,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.charcol80,
    },
    selectedGender: {
        backgroundColor: colors.charcol100,
    },
});
export default AccountSetupStep1