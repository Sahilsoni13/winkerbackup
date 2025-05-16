import Button from '@/component/Button';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Onboarding component for account creation with multiple sign-up options
 * @returns {JSX.Element} The rendered OnboardingAccounts component
 */
const OnboardingAccounts = () => {
    const globalstyle = getGlobalStyles();

    /** Navigation object to handle screen transitions */
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    return (
        <View style={[globalstyle.container, styles.mainContainer]}>
            {/* Logo and Title Section */}
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require("../../assets/images/logo.png")} // Ensure this path matches your logo file
                />
                <Text style={[globalstyle.text_24_bold_90_popins]}>
                    Create an Account
                </Text>
            </View>

            {/* Buttons Section */}
            <View style={styles.buttonContainer}>
                <Button
                    titleStyle={[globalstyle.text_16_med_90]}
                    leftIconStyle={{ width: 24, height: 24, marginRight: 12, marginLeft: 0 }}
                    title="Continue with Apple"
                    variant="outlined"
                    leftIcon={require("../../assets/icons/apple.png")}
                    style={styles.button}
                />
                <Button
                    titleStyle={[globalstyle.text_16_med_90]}
                    leftIconStyle={{ width: 24, height: 24, marginRight: 12, marginLeft: 0 }}
                    title="Continue with Google"
                    variant="outlined"
                    leftIcon={require("../../assets/icons/goggle.png")}
                    style={styles.button}
                />
                <Button
                    titleStyle={[globalstyle.text_16_med_90]}
                    leftIconStyle={{ width: 24, height: 24, marginRight: 12, marginLeft: 0 }}
                    title="Continue with Facebook"
                    variant="outlined"
                    leftIcon={require("../../assets/icons/facebook.png")}
                    style={styles.button}
                />
                <Button
                    titleStyle={[globalstyle.text_16_med_90]}
                    leftIconStyle={{ width: 24, height: 24, marginRight: 12, marginLeft: 0 }}
                    title="Continue with Email"
                    variant="outlined"
                    leftIcon={require("../../assets/icons/email.png")}
                    style={styles.button}
                />

            </View>
            {/* Log in Link Section */}
            <View style={styles.accountInfoContainer}>
                <Text style={[globalstyle.text_14_reg_40]}>
                    Already have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
                    <Text style={[globalstyle.text_14_bold_pur50, { marginLeft: 2 }]}>
                        Log in
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 16,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        flexDirection: "column",
        gap: 16
    },
    button: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.charcol10,
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    accountInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        gap: 1
    },
});

export default OnboardingAccounts;