import React, { useState } from "react";
import {
    Text,
    StyleSheet,
    View,
    Image,
    Pressable,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { ButtonProps } from "@/types/type";
import color from "@/styles/global";
import { getGlobalStyles } from "@/styles/globaltheme";

/**
 * A customizable button component with support for variants, icons, and press states
 * @param {ButtonProps} props - Component props
 * @param {string} props.title - The text displayed on the button
 * @param {(() => void) | undefined} props.onPress - Callback function executed on button press
 * @param {StyleProp<ViewStyle>} [props.style] - Custom style for the button container
 * @param {ImageSourcePropType} [props.leftIcon] - Source for the left icon image
 * @param {ImageSourcePropType} [props.rightIcon] - Source for the right icon image
 * @param {boolean} [props.isLoading=false] - Indicates if the button is in a loading state 
 * @param {"primary" | "outlined" | "ghost"} [props.variant="primary"] - Button style variant
 * @param {StyleProp<ImageStyle>} [props.leftIconStyle] - Custom style for the left icon
 * @param {StyleProp<TextStyle>} [props.titleStyle] - Custom style for the button text
 * @returns {JSX.Element} The rendered Button component
 */

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    style,
    leftIcon,
    rightIcon,
    isLoading = false,
    variant = "primary",
    leftIconStyle,
    titleStyle
}) => {
    /** State to track if the button is currently pressed */
    const [isPressed, setIsPressed] = useState(false);

    const globalstyle = getGlobalStyles();
    return (
        <>
            {
                variant === "primary" ? (
                    <Pressable
                        disabled={isLoading} // 🔥 Button disable when loading
                        style={[
                            styles.button,
                            variantStyles[variant],
                            isPressed && variant === "primary" && !isLoading && styles.pressedButton, // Pressed state only if not loading
                            style,
                        ]}
                        onPressIn={() => setIsPressed(true)}
                        onPressOut={() => {
                            setIsPressed(false);
                            onPress?.();
                        }}
                    >
                        <View style={styles.content}>
                            {/* Left Icon */}
                            {leftIcon && <Image source={leftIcon} style={[styles.icon, leftIconStyle]} />}

                            <View style={{ flexDirection: "row", gap: 8 }} >
                                {
                                    isLoading && <ActivityIndicator size="small" color="#fff" />
                                }
                                {/* Button Title */}
                                <Text
                                    style={[
                                        styles.text,
                                        globalstyle.text_16_med_white,
                                        variant === "primary" && isPressed && !isLoading ? styles.pressedText : textStyles[variant], // Text change only if not loading
                                        titleStyle,
                                    ]}
                                >
                                    {title}
                                </Text>
                            </View>

                            {/* Right Icon */}
                            {rightIcon && <Image source={rightIcon} style={styles.icon} />}
                        </View>
                    </Pressable>
                ) : (<TouchableOpacity
                    disabled={isLoading} // 🔥 Button disable when loading
                    style={[
                        styles.button,
                        variantStyles[variant],
                        style,
                    ]}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => {
                        setIsPressed(false);
                        onPress?.();
                    }}
                >
                    <View style={styles.content}>
                        {/* Left Icon */}
                        {leftIcon && <Image source={leftIcon} style={[styles.icon, leftIconStyle]} />}

                        {/* Button Title */}
                        <Text
                            style={[
                                styles.text,
                                globalstyle.text_16_med_white,
                                titleStyle,
                                textStyles[variant]
                            ]}
                        >
                            {title}
                        </Text>

                        {/* Right Icon */}
                        {rightIcon && <Image source={rightIcon} style={styles.icon} />}
                    </View>
                </TouchableOpacity>)
            }
        </>
    );
};
/**
 * Base styles for the Button component
 * @type {Object}
 */
const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        marginHorizontal: 5,
    },
    pressedButton: {
        backgroundColor: color.purple10, // 🔹 Light Purple shade for pressed state
        color: color.black
    },
    pressedText: {
        color: color.purple50, // 🔹 Purple text color on Pressed State
    },
});

/**
 * Variant-specific styles for the button
 * @type {{ [key in "primary" | "outlined" | "ghost"]: Object }}
 */
const variantStyles = {
    primary: {
        backgroundColor: "#934DFF", // Original purple button
    },
    outlined: {
        backgroundColor: color.white,
        borderColor: color.charcol10,
        borderWidth: 1,
    },
    ghost: {
        backgroundColor: "transparent",
        borderColor: "transparent",
    },
};

/**
 * Text styles for different button variants
 * @type {{ [key in "primary" | "outlined" | "ghost"]: Object }}
 */
const textStyles = {
    primary: { color: "#FFF" },
    outlined: { color: color.charcol100 },
    ghost: { color: "#333" },
};

export default Button;