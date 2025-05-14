

import React, { useRef, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
/**
 * A component that displays a confetti animation to celebrate success
 * @returns {JSX.Element} The rendered SuccessAnimation component with confetti effect
 */
export default function SuccessAnimation() {

    /** Reference to the ConfettiCannon component for manual triggering */
    const confettiRef = useRef<ConfettiCannon | null>(null);
    
    /** Screen dimensions for positioning the confetti origin */
    const { width, height } = Dimensions.get('window');
    /**
         * Triggers the confetti animation when the component mounts
         */
    useEffect(() => {
        if (confettiRef.current) {
            confettiRef.current.start(); // Manually trigger the confetti
        }
    }, []);

    


    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', width: 375 }}>
            <ConfettiCannon
                ref={confettiRef}
                count={150}
                origin={{ x: width / 2, y: -50 }}
                fadeOut={true}
                autoStart={false} // Set to false since we trigger manually
            />
        </View>
    );
}