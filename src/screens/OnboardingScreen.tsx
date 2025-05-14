import BreakTheIce from "@/component/onboardingSetupscreen/BreakTheIce";
import ConnectNearby from "@/component/onboardingSetupscreen/ConnectNearby";
import KeepItSocial from "@/component/onboardingSetupscreen/KeepItSocial";
import OnboardingAccounts from "@/component/onboardingSetupscreen/OnboardingAccounts";
import color from "@/styles/global";
import React, { useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    useColorScheme,
} from "react-native";

/**
 * @component OnboardingScreen
 * @description The main component for the onboarding screen that renders the onboarding steps.
 * @returns {JSX.Element} The OnboardingScreen component
 */
const OnboardingScreen: React.FC = () => {

    //    State to track the current step in the onboarding process
    const [step, setStep] = useState<number>(1);



    //  Handles navigation to the next step in the onboarding process

    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
    };


    /**
     * Renders the appropriate onboarding step component based on the current step
     * @returns {JSX.Element} The component for the current onboarding step
     */
    const renderStep = () => {
        switch (step) {
            case 1:
                return <ConnectNearby onNext={handleNext} />;
            case 2:
                return <BreakTheIce onNext={handleNext} />;
            case 3:
                return <KeepItSocial onNext={handleNext} />;
            case 4:
                return <OnboardingAccounts />;
            default:
                return <ConnectNearby onNext={handleNext} />;
        }
    };

    return <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>{renderStep()}</SafeAreaView>;
};

export default OnboardingScreen;
