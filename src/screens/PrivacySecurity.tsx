import Button from '@/component/Button'
import HeaderBack from '@/component/HeaderBack'
import SecurityToggle from '@/component/SecurityToggle'
import color, { globalstyle } from '@/styles/global'
import { getGlobalStyles } from '@/styles/globaltheme'
import { useTheme } from '@/ThemeContext'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


/**
 * Component for managing privacy and security settings
 * @returns {JSX.Element} The rendered PrivacySecurity component
 */
const PrivacySecurity = () => {
    const globalstyle = getGlobalStyles();
    const { isDarkMode } = useTheme();

    return (
        <>
            <View style={[style.container, globalstyle.container]}>
                <HeaderBack
                    title={"Privacy/Security"}
                    onRightPress={() => console.log("onRightPress")}
                />
                <View style={[style.securities]}>
                    <SecurityToggle
                        onPress={() => console.log("hello")}
                        buttonText='View Blocked Users'
                        description="Manage the list of people you've blocked."
                        iconSource={require("@/assets/icons/blocked.png")}
                        title='Blocked Users'
                    />
                    <SecurityToggle
                        onPress={() => console.log("hello")}
                        buttonText='Change Password'
                        description="Change your current password."
                        iconSource={require("@/assets/icons/privacy.png")}
                        title='Password Management'
                    />
                </View>
                <TouchableOpacity style={style.deleteButton}>
                    <Image style={style.deleteIcon} source={require('@/assets/icons/deleteicon.png')} />
                    <Text style={[globalstyle.text_14_bold_orange]}>
                        Delete Account
                    </Text>
                </TouchableOpacity>
                <Button style={[style.button]} variant='outlined' title="Save Update" />
            </View>
        </>
    )
}


/**
 * Styles for the PrivacySecurity component
 * @type {Object}
 */
const style = StyleSheet.create({
    container: { backgroundColor: color.white, flex: 1 },
    securities: {
        marginTop: 32,
        display: "flex",
        flexDirection: "column",
        gap: 32
    },
    button: { position: "absolute", bottom: 20, width: "100%", alignSelf: "center" },
    deleteButton: { alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8, marginTop: 33 },
    deleteIcon: { width: 20, height: 20 }
})

export default PrivacySecurity
