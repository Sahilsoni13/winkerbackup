import { PulseViewProps } from '@/types/type';
import React, { useEffect, useRef } from 'react';
import { Animated} from 'react-native';

/**
 * A pulsing animated view that fades in and out continuously.
 * @param {PulseViewProps} props - The props for the PulseView component.
 * @param {StyleProp<ViewStyle>} [props.style] - Custom style for the animated view
 * @returns {JSX.Element} The rendered PulseView component
 */
const PulseView: React.FC<PulseViewProps> = ({ style }) => {

    /** Animation value for controlling opacity */
    const opacity = useRef(new Animated.Value(1)).current;

    /**
     * Sets up and starts a looping pulse animation on mount, cleaning up on unmount
     */
    useEffect(() => {
        /**
                 * Creates a looping animation that alternates opacity between 1 and 0.5
                 * @type {Animated.CompositeAnimation}
                 */
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.5, // Fade to 50% opacity
                    duration: 1000, // 1 second to fade out
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1, // Fade back to 100% opacity
                    duration: 1000, // 1 second to fade in
                    useNativeDriver: true,
                }),
            ])
        );
        pulseAnimation.start();
        return () => pulseAnimation.stop(); 
    }, [opacity]);

    return <Animated.View style={[style, { opacity }]} />;
};



export default PulseView;