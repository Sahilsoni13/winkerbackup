import { OnboardingStepProps } from '@/types/type';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../Button';
import AnimatedCircle from '../animations/AnimatedCircle';
import PulseView from '../animations/PulseView';
import { colors, getGlobalStyles } from '@/styles/globaltheme';

/**
 * Onboarding step component introducing a social messaging feature with limited messages
 * @param {OnboardingStepProps} props - Component props
 * @param {() => void} props.onNext - Callback function to navigate to the next onboarding step
 * @returns {JSX.Element} The rendered KeepItSocial onboarding step component
 */
const KeepItSocial: React.FC<OnboardingStepProps> = ({ onNext }) => {
    const globalstyle = getGlobalStyles();

    return (
        <View style={[styles.container, globalstyle.container]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 16 }} showsVerticalScrollIndicator={false} >
                <View style={{ flexGrow: 1, justifyContent: "space-between", flexDirection: "column", height: "100%", gap: 20 }} >
                    {/* Top Section: Chat UI */}
                    <Text style={[styles.headerText, globalstyle.text_24_bold_100_popins]}>Keep it Social</Text>
                    {/* Chat Bubbles */}
                    <View style={styles.chatContainer}>
                        <View style={styles.chatBubbleContainerleft}>
                            <View style={[styles.chatBubble, styles.chatBubbleRight]}>
                                <PulseView style={styles.messageLineLong} />
                                <PulseView style={styles.messageLineShort} />
                                <PulseView style={styles.messageLineShort2} />
                                <PulseView style={styles.messageLineShort3} />
                            </View>
                            <Image
                                source={require("../../assets/images/onboardinguser6.png")}
                                style={[styles.avatar, styles.avatarRight]}
                            />
                            <View style={[styles.badge, styles.badgeRight]}>
                                <AnimatedCircle number="9" />
                            </View>
                            <View style={[styles.tip, { left: 25 }]}></View>
                        </View>

                        {/* Second Chat Bubble (Left Side) */}
                        <View style={styles.chatBubbleContainerright}>
                            <Image
                                source={require("../../assets/images/onboardinguser5.png")}
                                style={[styles.avatar, styles.avatarLeft]}
                            />
                            <View style={[styles.chatBubble, styles.chatBubbleLeft]}>
                                <PulseView style={styles.messageLineLong} />
                                <PulseView style={styles.messageLineShort} />
                                <PulseView style={styles.messageLineShort2} />
                                <PulseView style={styles.messageLineShort3} />
                            </View>
                            <View style={[styles.badge, styles.badgeLeft]}>
                                <AnimatedCircle number="8" /> {/* Number 8 ke liye */}
                            </View>
                            <View style={[styles.tip, { right: 20 }]}></View>
                        </View>
                    </View>

                    {/* Bottom Section: Text */}
                    <View>
                        <Text style={[styles.titleText, globalstyle.text_28_bold_90_popins]}>
                            Here's the twist You only got 10 messages—make them count!
                        </Text>
                        <Text style={[styles.subtitleText, globalstyle.text_16_reg_50]}>
                            Every word matters when building a connection. Break out of small talk and dive into meaningful conversations.
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                onPress={onNext}
                                title="Next"
                                variant="outlined"
                                rightIcon={require("../../assets/icons/rightarrow.png")}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
/**
 * Styles for the KeepItSocial component
 * @type {Object}
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
    },
    headerText: {
        textAlign: "center"
    },
    chatContainer: {
        width: "100%",
        flexDirection: "column",
    },
    chatBubbleContainerleft: {
        flexDirection: "row",
        marginVertical: 20,
        position: "relative",
        maxWidth: 203,
        width: "100%",
        alignContent: "flex-end",
    },
    chatBubbleContainerright: {
        flexDirection: "row",
        margin: 20,
        position: "relative",
        maxWidth: 203,
        width: "100%",
        alignSelf: "flex-end",
    },
    chatBubble: {
        backgroundColor: colors.lightPurple2,
        borderRadius: 20,
        padding: 16,
        width: 200,
        height: 121,
        justifyContent: "center",
    },
    tip: {
        width: 20,
        backgroundColor: colors.lightPurple2,
        height: 20,
        position: "absolute",
        bottom: -8,
        transform: [{ rotate: "45deg" }],
        borderRadius: 4,
    },
    chatBubbleRight: {
        borderBottomRightRadius: 0,
        marginRight: 20,
    },
    chatBubbleLeft: {
        borderBottomLeftRadius: 0,
        marginLeft: 20,
    },
    messageLineLong: {
        backgroundColor: colors.purple60,
        height: 10,
        width: 139,
        borderRadius: 5,
        marginBottom: 8,
    },
    messageLineShort: {
        backgroundColor: colors.lightPurple,
        height: 10,
        width: 124,
        borderRadius: 5,
        marginBottom: 8,
    },
    messageLineShort2: {
        backgroundColor: colors.lightPurple,
        height: 10,
        width: 98,
        borderRadius: 5,
    },
    messageLineShort3: {
        backgroundColor: colors.lightPurple,
        height: 10,
        width: 21,
        borderRadius: 5,
        marginTop: 34,
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 25,
        position: "absolute",
        bottom: -10,
        zIndex: 9,
    },
    avatarRight: {
        right: 0,
    },
    avatarLeft: {
        left: 0,
    },
    badge: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "absolute",
        top: -10,
        overflow: 'hidden',
    },
    badgeRight: {
        right: 10,
    },
    badgeLeft: {
        left: 10,
    },
    titleText: {
        marginBottom: 10,
    },
    subtitleText: {
        marginBottom: 30,
    },
    buttonContainer: {
        width: "100%",
    },
});

export default KeepItSocial;