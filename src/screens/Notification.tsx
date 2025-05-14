import Button from '@/component/Button'
import HeaderBack from '@/component/HeaderBack'
import NotificationToggle from '@/component/NotificationToggle'
import color, { globalstyle } from '@/styles/global'
import React from 'react'
import { StyleSheet, View } from 'react-native'

/**
 * Component for managing notification settings with toggle switches
 * @returns {JSX.Element} The rendered Notification component
 */
const Notification = () => {


    /** Array of notification settings data */
    const notifications = [
        {
            icon: require("../assets/icons/notificationicon.png"),
            title: "Notification",
            description: "Enable or disable all notifications from the app."
        },
        {
            icon: require("../assets/icons/sound.png"),
            title: "Sound",
            description: "Turn notification sounds on or off."
        },
        {
            icon: require("../assets/icons/vibration.png"),
            title: "Vibrate on Wink",
            description: "Enable vibration alerts when someone winks at you."
        },
        {
            icon: require("../assets/icons/vibration.png"),
            title: "Vibrate on Message",
            description: "Enable vibration alerts for new messages."
        },
    ]

    return (
        <View style={[style.container, globalstyle.container]}>
            <HeaderBack
                title={"Notification"}
                onRightPress={() => console.log("onRightPress")}
            />
            <View style={[style.notificationParent]}>
                {
                    notifications?.map((item, index) => (
                        <NotificationToggle key={index} description={item.description} iconSource={item.icon} title={item.title} />
                    ))
                }
            </View>
            <Button style={[style.button]} variant='outlined' title="Save Update" />
        </View>
    )
}
/**
 * Styles for the Notification component
 * @type {Object}
 */
const style = StyleSheet.create({
    container: { backgroundColor: color.white, flex: 1 },
    notificationParent: { display: "flex", flexDirection: "column", gap: 32, marginTop: 32 },
    button: { position: "absolute", bottom: 20, width: "100%", alignSelf: "center" }
})

export default Notification


