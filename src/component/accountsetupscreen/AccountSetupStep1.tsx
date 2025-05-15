import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DateOfBirthInput from '../DateOfBirthInput';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';
import color from '@/styles/global';

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
                        style={[styles.genderButton, gender === 'Male' ? isDarkMode ? { backgroundColor: colors.white, borderColor: colors.white } : { backgroundColor: colors.black, borderColor: colors.white } : isDarkMode ? { backgroundColor: color.charcol90, borderColor: colors.white } : { backgroundColor: colors.charcol05, borderColor: "transparent" }]}
                        onPress={() => setGender('Male')}
                    >
                        <Image
                            style={[
                                gender === 'Male' ? isDarkMode ? { tintColor: colors.charcol90 } : { tintColor: colors.white } : isDarkMode ? { tintColor: colors.white } : { tintColor: colors.charcol90 }, {
                                    width: 20,
                                    height: 20,
                                }]}
                            source={require("../../assets/icons/male.png")}
                        />
                        <Text
                            style={[
                                globalstyle.text_16_med_white,
                                gender === 'Male' ? isDarkMode ? { color: colors.charcol90 } : { color: colors.white } : isDarkMode ? { color: colors.white } : { color: colors.charcol90 }

                            ]}
                        >
                            Male
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.genderButton, gender === 'Female' ? isDarkMode ? { backgroundColor: colors.white, borderColor: colors.white } : { backgroundColor: colors.black, borderColor: colors.white } : isDarkMode ? { backgroundColor: color.charcol90, borderColor: colors.white } : { backgroundColor: colors.charcol05, borderColor: "transparent" }]}
                        onPress={() => setGender('Female')}
                    >
                        <Image
                            style={[
                                gender === 'Female' ? isDarkMode ? { tintColor: colors.charcol90 } : { tintColor: colors.white } : isDarkMode ? { tintColor: colors.white } : { tintColor: colors.charcol90 }, {
                                    width: 20,
                                    height: 20,

                                }]}
                            source={require("../../assets/icons/female.png")}
                        />
                        <Text
                            style={[

                                globalstyle.text_16_med_white,
                                gender === 'Female' ? isDarkMode ? { color: colors.charcol90 } : { color: colors.white } : isDarkMode ? { color: colors.white } : { color: colors.charcol90 }

                            ]}
                        >
                            Female
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.genderButton, gender === 'Non Binary' ? isDarkMode ? { backgroundColor: colors.white, borderColor: colors.white } : { backgroundColor: colors.black, borderColor: colors.white } : isDarkMode ? { backgroundColor: color.charcol90, borderColor: colors.white } : { backgroundColor: colors.charcol05, borderColor: "transparent" }]}
                        onPress={() => setGender('Non Binary')}
                    >
                        <Image
                            style={[
                                gender === 'Non Binary' ? isDarkMode ? { tintColor: colors.charcol90 } : { tintColor: colors.white } : isDarkMode ? { tintColor: colors.white } : { tintColor: colors.charcol90 },
                                {
                                    width: 20,
                                    height: 20,
                                    // tintColor: gender === 'Non Binary'
                                    //     ? colors.white
                                    //     : isDarkMode
                                    //         ? colors.white
                                    //         : colors.black,


                                }]}
                            source={require("../../assets/icons/nonbinary.png")}
                        />
                        <Text
                            style={[
                                globalstyle.text_16_med_white,
                                gender === 'Non Binary' ? isDarkMode ? { color: colors.charcol90 } : { color: colors.white } : isDarkMode ? { color: colors.white } : { color: colors.charcol90 }

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
        // backgroundColor: colors.charcol80,
        gap: 8,
        borderWidth: 1
    },
    selectedGender: {
        backgroundColor: colors.charcol100,
    },
});
export default AccountSetupStep1