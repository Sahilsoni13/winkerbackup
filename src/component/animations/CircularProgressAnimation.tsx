import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
} from "react-native-reanimated";
import { CircularProgressProps } from "@/types/type";

/**
 * Animated version of the SVG Circle component for progress animation
 * @type {Animated.AnimatedComponent<typeof Circle>}
 */

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * Circular progress animation component using React Native SVG and Reanimated.
 * @param {CircularProgressProps} props - Component props
 * @param {number} [props.strokeWidth=4] - Width of the background circle stroke
 * @param {number} [props.progressWidth=4] - Width of the progress circle stroke
 * @param {number} [props.progressValue=80] - Progress value (0-100)
 * @param {number} [props.duration=2000] - Animation duration in milliseconds
 * @param {boolean} [props.clockwise=true] - Direction of progress (true for clockwise, false for counterclockwise)
 * @returns {JSX.Element} The rendered circular progress animation component
 */
export default function CircularProgressAnimation({
    strokeWidth = 4,
    progressWidth = 4,
    progressValue = 80,
    duration = 2000,
    clockwise = true
}: CircularProgressProps) {

    /** Shared value for animating the progress */
    const progress = useSharedValue(0);

    /** Radius of the circle */
    const radius = 45;

    /** Circumference of the circle (2 * π * radius) */
    const circumference = 2 * Math.PI * radius;

    /** Direction multiplier (1 for clockwise, -1 for counterclockwise) */
    const direction = clockwise ? 1 : -1;
    /**
         * Starts the progress animation after a 500ms delay
         */
    useEffect(() => {
        setTimeout(() => {
            progress.value = withTiming(progressValue, { duration });
        }, 500);
    }, [progressValue, duration]);

    /**
     * Animated properties for the progress circle
     * @returns {Object} Animated props including strokeDashoffset
     */

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: direction * (circumference - (progress.value / 100) * circumference),
    }));

    return (
        <View style={styles.container}>
            <Svg width={100} height={100} viewBox="0 0 100 100">
                {/* Background Circle */}
                <Circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#e6e6e6"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Animated Progress Circle */}
                <AnimatedCircle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#AB80FF"
                    strokeWidth={progressWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    animatedProps={animatedProps}
                    strokeLinecap="round"
                />
            </Svg>
        </View>
    );
}

/**
 * Styles for the CircularProgressAnimation component
 * @type {Object}
 */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
