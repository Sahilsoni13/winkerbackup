import Button from '@/component/Button'
import HeaderBack from '@/component/HeaderBack'
import NotificationToggle from '@/component/NotificationToggle'
import { getGlobalStyles } from '@/styles/globaltheme'
import React, { useState } from 'react'
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

    const [notification, setNotification] = useState(false)
    const [sound, setSound] = useState(false)
    const [wink, setWink] = useState(false)
    const [message, setMessage] = useState(false)

    const globalstyle = getGlobalStyles();

    return (
        <View style={[style.container, globalstyle.container]}>
            <HeaderBack
                title={"Notification"}
                onRightPress={() => console.log("onRightPress")}
            />
            <View style={[style.notificationParent]}>
                <NotificationToggle
                    description="Enable or disable all notifications from the app."
                    iconSource={require("../assets/icons/notificationicon.png")}
                    title={"Notification"}
                    isEnabled={notification}
                    onToggle={() => {
                        setNotification(!notification)
                    }}
                />
                <NotificationToggle
                    description="Turn notification sounds on or off."
                    iconSource={require("../assets/icons/sound.png")}
                    title={"Sound"}
                    isEnabled={sound}
                    onToggle={() => {
                        setSound(!sound)
                    }}
                />
                <NotificationToggle
                    description="Enable vibration alerts when someone winks at you."
                    iconSource={require("../assets/icons/vibration.png")}
                    title={"Vibrate on Wink"}
                    isEnabled={wink}
                    onToggle={() => {
                        setWink(!wink)
                    }}
                />
                <NotificationToggle
                    description="Enable vibration alerts for new messages."
                    iconSource={require("../assets/icons/vibration.png")}
                    title={"Vibrate on Message"}
                    isEnabled={message}
                    onToggle={() => {
                        setMessage(!message)
                    }}
                />
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
    container: { flex: 1 },
    notificationParent: { display: "flex", flexDirection: "column", gap: 32, marginTop: 32 },
    button: { position: "absolute", bottom: 20, width: "100%", alignSelf: "center" }
})

export default Notification


