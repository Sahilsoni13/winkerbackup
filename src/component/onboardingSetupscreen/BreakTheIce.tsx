import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Button from "../Button";
import { OnboardingStepProps } from "@/types/type";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, getGlobalStyles } from "@/styles/globaltheme";
/**
 * Onboarding step component encouraging users to interact with others
 * @param {OnboardingStepProps} props - Component props
 * @param {() => void} props.onNext - Callback function to proceed to the next step
 * @returns {JSX.Element} The rendered BreakTheIce component
 */

const BreakTheIce: React.FC<OnboardingStepProps> = ({ onNext }) => {
    const globalstyle = getGlobalStyles();

    /** Safe area insets for handling device-specific padding */
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, globalstyle.container]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 16 }} showsVerticalScrollIndicator={false}>
                <View style={{ flexGrow: 1, justifyContent: "space-between", flexDirection: "column", height: "100%", gap: 30 }} >
                    <Text style={[styles.headerText, globalstyle.text_24_bold_100_popins]}>
                        Break The Ice
                    </Text>
                    <View style={styles.circleContainer}>
                        <View style={styles.centerCircle}>
                            <Image
                                source={require("../../assets/images/lightimage.png")}
                                style={styles.lightningIcon}
                            />
                        </View>

                        <Image
                            source={require("../../assets/images/onboardinguser4.png")}
                            style={[styles.avatar, styles.avatarLeft]}
                        />
                        <Image
                            source={require("../../assets/images/onboardinguser5.png")}
                            style={[styles.avatar, styles.avatarRight]}
                        />

                        {/* Hand Icons - Top */}
                        <View style={styles.handContainerTop}>
                            <View style={styles.handCircleTop}>
                                <Image
                                    source={require("../../assets/images/Rock.png")}
                                    style={[styles.handIcon, styles.handIconRotated]}
                                />
                            </View>
                            <Image
                                source={require("../../assets/images/roundtop1.png")}
                                style={styles.roundImage}
                            />
                        </View>

                        {/* Hand Icons - Bottom */}
                        <View style={styles.handContainerBottom}>
                            <View style={styles.handCircleBottom}>
                                <Image
                                    source={require("../../assets/images/Scissors.png")}
                                    style={[styles.handIcon]}
                                />
                            </View>
                            <Image
                                source={require("../../assets/images/roundbottom1.png")}
                                style={styles.roundImage}
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={[styles.titleText, globalstyle.text_28_bold_90_popins]}>
                            Wink and invite someone to play.
                        </Text>
                        <Text style={[styles.subtitleText, globalstyle.text_16_reg_50]}>
                            A little spark is all it takes! Send a wink or challenge someone to a fun game.
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                // onPress={()=>navigation.navigate("CreateAccount")}
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
 * Styles for the BreakTheIce component
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
    circleContainer: {
        width: 316,
        height: 346,
        borderRadius: 100,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
    },
    centerCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.purple,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 9,
    },
    lightningIcon: {
        maxWidth: 66,
        height: 66,
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 100,
        position: "absolute",
    },
    avatarLeft: {
        left: 20,
    },
    avatarRight: {
        right: 20,
    },
    handContainerTop: {
        position: "absolute",
        top: 25,
    },
    handContainerBottom: {
        position: "absolute",
        bottom: 20,
    },
    handCircleTop: {
        backgroundColor: colors.purple05,
        width: 61,
        height: 61,
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 100,
        position: "absolute",
        top: -20,
        alignSelf: "center",
        zIndex: 9,
    },
    handCircleBottom: {
        backgroundColor: colors.purple05,
        width: 61,
        height: 61,
        justifyContent: "flex-end",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 100,
        position: "absolute",
        alignSelf: "center",
        zIndex: 9,
    },
    handIcon: {
        width: 50,
        height: 54.5,
    },
    handIconRotated: {
        transform: [{ rotate: "180deg" }],
    },
    roundImage: {
        maxWidth: 180,
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

export default BreakTheIce;