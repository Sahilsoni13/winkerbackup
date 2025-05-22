import Button from '@/component/Button'
import HeaderBack from '@/component/HeaderBack'
import SecurityToggle from '@/component/SecurityToggle'
import { useApi } from '@/hook/useApi'
import color, { globalstyle } from '@/styles/global'
import { colors, getGlobalStyles } from '@/styles/globaltheme'
import { useTheme } from '@/ThemeContext'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


/**
 * Component for managing privacy and security settings
 * @returns {JSX.Element} The rendered PrivacySecurity component
 */
const PrivacySecurity = () => {
    const globalstyle = getGlobalStyles();
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const { mutate: deleteUser, isPending: loading } = useApi();
    const handleDelete = () => {
        deleteUser(
            {
                url: '/users/profile', // 123 is user id
                method: 'DELETE',
                showToast: true,
            }, {
            onSuccess: () => (
                navigation.navigate("OnboardingScreen")
            )
        }
        );
    };

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
                <TouchableOpacity style={style.deleteButton} onPress={handleDelete}>
                    {loading ?
                        <ActivityIndicator color={colors.orange} />
                        :
                        <Image style={style.deleteIcon} source={require('@/assets/icons/deleteicon.png')} />
                    }
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
