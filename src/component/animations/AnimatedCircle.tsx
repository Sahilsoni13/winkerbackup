import { colors } from '@/styles/globaltheme';
import { AnimatedCircleProps } from '@/types/type';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

/**
 * A circular animated progress indicator with a number inside.
 * @param {AnimatedCircleProps} props - The props for the AnimatedCircle component.
 * @returns {JSX.Element} The rendered AnimatedCircle component.
 */
const AnimatedCircle: React.FC<AnimatedCircleProps> = ({ number }) => {

  /** Animation value for the progress */
    const progress = useRef(new Animated.Value(0)).current;


    /**
       * Starts the animation after a 1-second delay.
       * The progress animates from 0 to 90% over 2 seconds.
       */
    useEffect(() => {
        setTimeout(() => {
            Animated.timing(progress, {
                toValue: 0.9, // Animate to 90% progress
                duration: 2000, // 2 seconds duration
                useNativeDriver: true, // Use native driver for better performance
            }).start();
        }, 1000); // 1 seconds delay
    }, [progress]);

    /**
         * Interpolates the strokeDashoffset to create the progress bar effect.
         */
    const strokeDashoffset = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [125.6, 0], // From full circle (125.6) to 0
    });

    return (
        <View style={styles.circleContainer}>
            <Svg height="50" width="50" viewBox="0 0 50 50">
                {/* Background Circle */}
                <Circle
                    cx="25"
                    cy="25"
                    r="20"
                    stroke="#ddd"
                    strokeWidth="4"
                    fill="none"
                />
                {/* Progress Circle */}
                <AnimatedCircleComponent
                    cx="25"
                    cy="25"
                    r="20"
                    stroke={colors.charcol80}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="125.6" // Circumference of the circle (2 * π * 20)
                    strokeDashoffset={strokeDashoffset} // Animated value
                    strokeLinecap="round"
                />
            </Svg>
            {/* Number in the center */}
            <Text style={styles.number}>{number}</Text>
        </View>
    );
};

// Animated version of the SVG Circle component for progress animation
const AnimatedCircleComponent = Animated.createAnimatedComponent(Circle);

/**
 * Styles for the AnimatedCircle component
 * @type {Object}
 */
const styles = StyleSheet.create({
    circleContainer: {
        width: 50,
        height: 50,
        position: 'relative',
        transform: [{ scale: 0.6 }], // Scale down to fit inside the badge
    },
    number: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -5 }, { translateY: -11 }],
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.charcol80,
        alignSelf: 'center',
    },
});

export default AnimatedCircle;