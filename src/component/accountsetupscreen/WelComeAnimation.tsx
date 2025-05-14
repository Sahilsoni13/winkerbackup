

import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import ConfettiCannon from 'react-native-confetti-cannon';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import color, { globalstyle } from '@/styles/global';
/**
 * A welcome animation component featuring a checkmark and confetti to celebrate profile setup
 * @returns {JSX.Element} The rendered WelComeAnimation component
 */
const WelComeAnimation = () => {

    // Animated value for the circle's drawing animation 
    const circleAnimation = useRef(new Animated.Value(0)).current;

    // Animated value for the checkmark's drawing animation 
    const checkAnimation = useRef(new Animated.Value(0)).current;

    // State to control the confetti cannon trigger 
    const [canon, setCanon] = useState(false);

    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

    // Runs the animation sequence for the circle and checkmark, triggering confetti at the end
    useEffect(() => {
        Animated.sequence([
            Animated.timing(circleAnimation, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
            Animated.timing(checkAnimation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            requestAnimationFrame(() => setCanon(true));
        });
    }, []);
    /** Interpolated value for the circle's stroke dash offset */
    const circlePathLength = circleAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [283, 0], // Full stroke visible after animation
    });
    /** Interpolated value for the checkmark's stroke dash offset */
    const checkPathLength = checkAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0], // Full check visible after animation
    });

    /** Interpolated opacity for the checkmark */
    const checkOpacity = checkAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    /** Interpolated opacity for the circle */
    const circleOpacity = circleAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    /** Screen width for positioning the confetti origin */
    const { width } = Dimensions.get('window');
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("MainTab")
        }, 5000);
    }, [])
    return (
        <>
            <View style={styles.container}>
                {/* SVG Animation */}
                <Svg width="100%" height={100} viewBox="0 0 100 100" style={{ marginBottom: 20 }}>
                    <AnimatedSvgCircle
                        cx={50}
                        cy={50}
                        r={45}
                        fill="none"
                        stroke={color.purple}
                        strokeWidth={8}
                        strokeDasharray={283}
                        strokeDashoffset={circlePathLength}
                        opacity={circleOpacity}
                    />
                    <AnimatedSvgPath
                        d="M30 50 L45 65 L70 40"
                        fill="none"
                        stroke={color.purple}
                        strokeWidth={8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray={50}
                        strokeDashoffset={checkPathLength}
                        opacity={checkOpacity}
                    />
                </Svg>

                <Text style={[globalstyle.text_32_bold_90, { textAlign: 'center' }]}>You are set! Start Exploring</Text>
                <Text style={[styles.description, globalstyle.text_16_reg_50]}>Your profile is ready—let the connections begin!</Text>

            </View>
            {/* Confetti Effect */}
            {canon && (
                <ConfettiCannon
                    count={100}
                    origin={{ x: width / 2, y: -50 }}
                    autoStart={true}
                    explosionSpeed={700}
                    autoStartDelay={0}
                    fadeOut={true}
                    colors={[color.purple]}
                />
            )}
        </>
    );
};

// Animated version of the SVG Circle component for the circle animation
const AnimatedSvgCircle = Animated.createAnimatedComponent(Circle);

// Animated version of the SVG Path component for the checkmark animation
const AnimatedSvgPath = Animated.createAnimatedComponent(Path);
/**
 * Styles for the WelComeAnimation component
 * @type {Object}
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        paddingTop: 12,
        paddingHorizontal: 27,
        textAlign: 'center',
    },
});

export default WelComeAnimation;
