import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import RadarWaveAnimation from "../animations/RadarWaveAnimation";
import Button from "../Button";
import { OnboardingStepProps } from "@/types/type";
import { colors, getGlobalStyles } from "@/styles/globaltheme";

/**
 * Onboarding step component introducing the "Connect Nearby" feature with a radar animation
 * @param {OnboardingStepProps} props - Component props
 * @param {() => void} props.onNext - Callback function to navigate to the next onboarding step
 * @returns {JSX.Element} The rendered ConnectNearby onboarding step component
 */
const ConnectNearby: React.FC<OnboardingStepProps> = ({ onNext }) => {

    const globalstyle = getGlobalStyles();


    return (
        <View style={[styles.container, globalstyle.container]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 16 }} showsVerticalScrollIndicator={false} >
                <View style={{ flexGrow: 1, justifyContent: "space-between", flexDirection: "column", height: "100%", gap: 30 }} >
                    <Text style={[styles.header, globalstyle.text_24_bold_100_popins]}>Connect Nearby</Text>
                    <View style={styles.circleContainer}>
                        <View style={styles.circleLayer1}>
                            <Image
                                source={require("../../assets/images/layer2.png")}
                                style={styles.circleLayer3}
                            />
                            <RadarWaveAnimation />
                            <Image
                                source={require("../../assets/images/mainuser.png")}
                                style={[styles.mainAvatar, { position: "absolute" }]}
                            />
                        </View>
                        <Image
                            source={require("../../assets/images/onboardinguser1.png")}
                            style={[styles.avatar, { top: 20, left: 20 }]}
                        />
                        <Image
                            source={require("../../assets/images/onboardinguser2.png")}
                            style={[styles.avatar, { top: 100, right: 20 }]}
                        />
                        <Image
                            source={require("../../assets/images/onboardinguser3.png")}
                            style={[styles.avatar, { bottom: 20, left: 20 }]}
                        />
                    </View>
                    <View>
                        <Text style={[styles.title, globalstyle.text_28_bold_90_popins]}>You Only See the People Close to You.</Text>
                        <Text style={[styles.subtitle, globalstyle.text_16_reg_50]}>
                            Find meaningful connections within your area. Whether you're looking for fun, friendship, or more.
                        </Text>
                        <View style={{ width: "100%" }} >
                            <Button onPress={onNext} title='Next' variant='outlined' rightIcon={require("../../assets/icons/rightarrow.png")} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
/**
 * Styles for the ConnectNearby component
 * @type {Object}
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        marginBottom: 20,
        textAlign: "center"
    },
    circleContainer: {
        maxWidth: 308,
        width: "100%",
        margin: "auto",
        height: 308,
        borderRadius: 154,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
    },
    circleLayer1: {
        width: 308,
        height: 308,
        borderRadius: 154,
        backgroundColor: "#D9BAFE",
        justifyContent: "center",
        alignItems: "center",
    },
    circleLayer3: {
        width: 240,
        height: 240,
        borderRadius: 120,
        resizeMode: "cover",
        position: "absolute",
    },
    avatar: {
        maxWidth: 50,
        width: "100%",
        height: 50,
        borderRadius: 25,
        position: "absolute",
        borderColor: colors.white,
        objectFit: "cover",
    },
    mainAvatar: {
        width: 160,
        height: 160,
        borderRadius: 80,
    },
    title: {
        marginBottom: 10,
    },
    subtitle: {
        marginBottom: 30,
        paddingHorizontal: 2,
    },
});

export default ConnectNearby;