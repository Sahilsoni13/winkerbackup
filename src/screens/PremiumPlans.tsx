// src/screens/PremiumPlans.tsx
import Button from "@/component/Button";
import FeatureTable from "@/component/FeatureTable";
import HeaderBack from "@/component/HeaderBack";
import color, { globalstyle } from "@/styles/global";
import { Feature } from "@/types/type";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

/**
 * Component displaying the Premium Plans screen with current plan, upgrade option, and feature list
 * @returns {JSX.Element} The rendered PremiumPlans component
 */
const PremiumPlans: React.FC = () => {
    /** Safe area insets for handling device-specific padding */

    /** Array of features comparing free and premium plans */
    const features: Feature[] = [
        { name: "Unlimited Messaging", free: "—", premium: true },
        { name: "See Who Viewed You", free: "—", premium: true },
        { name: "Profile Boost", free: "—", premium: true },
        { name: "Ad-Free Experience", free: "—", premium: true },
        { name: "Priority Support", free: "—", premium: true },
    ];


    return (
        <View style={[styles.container, { backgroundColor: color.white, flex: 1 }, globalstyle.container]}>
            <HeaderBack
                title={"Premium Plans"}
                onRightPress={() => console.log("onRightPress")}
            />
            <View style={styles.plansContainer}>
                <View style={[styles.selectedPlanBox]}>
                    <View style={{ padding: 12, backgroundColor: color.charcol05, borderRadius: 12 }}>
                        <Image style={{ width: 20, height: 20 }} source={require("../assets/icons/Ticket.png")} />
                    </View>
                    <Text style={[styles.CurrentPlan, globalstyle.text_14_bold_40]}>Current Plan</Text>
                    <Text style={[globalstyle.text_24_bold_90]}>Free</Text>
                </View>
                <View style={[styles.selectedPlanBoxPremium]}>
                    <View style={{ padding: 12, backgroundColor: color.purple05, borderRadius: 12 }}>
                        <Image style={{ width: 20, height: 20 }} source={require("../assets/icons/premiumicon.png")} />
                    </View>
                    <Text style={[styles.CurrentPlan, globalstyle.text_14_bold_40]}>Premium Plan</Text>
                    <Text style={[globalstyle.text_24_bold_90]}>
                        $9.99/<Text style={[globalstyle.text_12_reg_30]}>Monthly</Text>
                    </Text>
                </View>
            </View>
            <Text style={[styles.featuresTitle, globalstyle.text_16_med_40]}>Features Info</Text>
            <FeatureTable data={features} /> {/* Pass dynamic data */}
            <Button
                leftIconStyle={{ tintColor: color.white, marginRight: 16 }}
                leftIcon={require('@/assets/icons/premiumicon.png')}
                style={{ position: "absolute", bottom: 20, width: "100%", alignSelf: "center" }}
                title="Upgrade to Premium"
            />
        </View>
    );
};

/**
 * Styles for the PremiumPlans component
 * @type {Object}
 */
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: color.white },
    plansContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        gap: 16,
        marginTop: 32
    },
    selectedPlanBox: {
        backgroundColor: color.white,
        borderWidth: 1,
        borderColor: color.charcol10,
        borderStyle: "solid",
        padding: 16,
        borderRadius: 16,
        flex: 1,
        alignItems: "flex-start",
    },
    selectedPlanBoxPremium: {
        backgroundColor: color.white,
        borderWidth: 1,
        borderColor: color.purple60,
        borderStyle: "solid",
        padding: 16,
        borderRadius: 16,
        flex: 1,
        alignItems: "flex-start",
    },
    featuresTitle: {
        marginBottom: 9,
    },
    CurrentPlan: {
        marginVertical: 8
    }
});

export default PremiumPlans;