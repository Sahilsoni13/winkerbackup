import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";

/**
 * A React component that renders an animated radar wave effect using SVG circles
 * @returns {JSX.Element} The radar wave animation component
 */
const RadarWaveAnimation: React.FC = () => {

    // State to store array of animated values representing wave radii
    const [waves, setWaves] = useState<Animated.Value[]>([]);


    /**
       * Effect hook to create and animate radar waves at regular intervals
       */
    useEffect(() => {
        const interval = setInterval(() => {
            // Create a new Animated.Value for the wave's radius
            const newWave = new Animated.Value(0);

            // Add the new wave to the state
            setWaves((prev) => {
                const newWaves = [...prev, newWave];
                if (newWaves.length > 5) {
                    return newWaves.slice(-5); // Keep only the last 5 waves
                }
                return newWaves;
            });

            // Start the animation for the new wave
            Animated.timing(newWave, {
                toValue: 100, // Final radius
                duration: 3000, // 3 seconds
                useNativeDriver: true, // Use native driver for better performance
            }).start();
        }, 1000); // New wave every 1.5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Svg width={200} height={200} viewBox="0 0 200 200">
                {/* Radar waves */}
                {waves.map((wave, index) => (
                    <AnimatedCircle
                        key={index}
                        cx="100"
                        cy="100"
                        fill="none"
                        stroke="#8B5CF6"
                        strokeWidth="2"
                        opacity={wave.interpolate({
                            inputRange: [0, 100],
                            outputRange: [0.7, 0], // Fade out from 0.7 to 0
                        })}
                        r={wave} // Animated radius
                    />
                ))}

                {/* Center dot */}
                <Circle cx="100" cy="100" r="4" fill="#8B5CF6" />
            </Svg>
        </View>
    );
};

/**
 * Custom animated circle component created from SVG Circle
 * @type {Animated.AnimatedComponent<typeof Circle>}
 */
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * Stylesheet for the radar wave animation component
 * @type {StyleSheet.NamedStyles}
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default RadarWaveAnimation;