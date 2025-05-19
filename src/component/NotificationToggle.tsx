

// import color, { globalstyle } from "@/styles/global";
// import { NotificationToggleProps } from "@/types/type";
// import React, { useState, useRef, useEffect } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     ImageSourcePropType,
//     TouchableOpacity,
//     Animated
// } from "react-native";

// /**
//  * A toggle switch component for enabling/disabling notifications with an icon and description
//  * @param {NotificationToggleProps} props - Component props
//  * @param {ImageSourcePropType} props.iconSource - Source for the icon displayed next to the title
//  * @param {string} props.description - Descriptive text explaining the toggle's purpose
//  * @param {string} props.title - Title of the toggle
//  * @returns {JSX.Element} The rendered NotificationToggle component
//  */
// const NotificationToggle: React.FC<NotificationToggleProps> = ({
//     iconSource,
//     description,
//     title,
//     onToggle, // 👈 Accept prop
// }) => {
//     const [isEnabled, setIsEnabled] = useState(false);
//     const translateX = useRef(new Animated.Value(0)).current;

//     useEffect(() => {
//         Animated.timing(translateX, {
//             toValue: isEnabled ? 20 : 0,
//             duration: 200,
//             useNativeDriver: false,
//         }).start();

//         onToggle?.(isEnabled); // 👈 Call callback with new state
//     }, [isEnabled]);

//     const toggleSwitch = () => setIsEnabled((prev) => !prev);

//     return (
//         <View style={styles.container}>
//             <Image source={iconSource} style={styles.icon} />
//             <View style={styles.textContainer}>
//                 <Text style={[globalstyle.text_16_bold_100]}>{title}</Text>
//                 <Text style={[styles.description, globalstyle.text_14_reg_50]}>{description}</Text>
//             </View>
//             <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
//                 <View style={[styles.toggleContainer, isEnabled ? styles.toggleContainerActive : null]}>
//                     <Animated.View style={[styles.toggleThumb, { transform: [{ translateX }] }]} />
//                 </View>
//             </TouchableOpacity>
//         </View>
//     );
// };

// /**
//  * Styles for the NotificationToggle component
//  * @type {Object}
//  */
// const styles = StyleSheet.create({
//     container: {
//         flexDirection: "row",
//         alignItems: "flex-start",
//         backgroundColor: "#FFFFFF",
//         justifyContent: "flex-start"
//     },
//     icon: {
//         width: 20,
//         height: 20,
//         resizeMode: "contain",
//     },
//     textContainer: {
//         flex: 1,
//         marginLeft: 8,
//     },
//     description: {
//         marginTop: 8.5,
//         maxWidth: 215
//     },
//     toggleContainer: {
//         width: 40,
//         height: 20,
//         borderRadius: 20,
//         backgroundColor: color.charcol30,
//         justifyContent: "center",
//         padding: 2,
//     },
//     toggleContainerActive: {
//         backgroundColor: color.charcol90,
//     },
//     toggleThumb: {
//         width: 16,
//         height: 16,
//         borderRadius: 10,
//         backgroundColor: "#FFFFFF",
//         position: "absolute",
//         left: 2,
//     },
// });

// export default NotificationToggle;


import { colors, getGlobalStyles } from "@/styles/globaltheme";
import { useTheme } from "@/ThemeContext";
import { NotificationToggleProps } from "@/types/type";
import React, { useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Animated,
    TouchableOpacity,
} from "react-native";

/**
 * A toggle switch component for enabling/disabling notifications with an icon and description
 */
const NotificationToggle: React.FC<NotificationToggleProps> = ({
    iconSource,
    description,
    title,
    onToggle,
    isEnabled, // ✅ Controlled state
}) => {
    const translateX = useRef(new Animated.Value(isEnabled ? 20 : 0)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: isEnabled ? 20 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isEnabled]);

    const toggleSwitch = () => {
        onToggle?.(!isEnabled); // ✅ Notify parent to toggle
    };
    const globalstyle = getGlobalStyles();
    const { isDarkMode } = useTheme();

    return (
        <View style={styles.container}>
            <Image source={iconSource} style={[styles.icon, { tintColor: isDarkMode ? colors.white : colors.black }]} />
            <View style={styles.textContainer}>
                <Text style={[globalstyle.text_16_bold_100]}>{title}</Text>
                <Text style={[styles.description, globalstyle.text_14_reg_50]}>
                    {description}
                </Text>
            </View>
            <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
                <View
                    style={[
                        styles.toggleContainer,
                        isEnabled ? styles.toggleContainerActive : null,
                    ]}
                >
                    <Animated.View
                        style={[
                            styles.toggleThumb,
                            { transform: [{ translateX }] },
                        ]}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    textContainer: {
        flex: 1,
        marginLeft: 8,
    },
    description: {
        marginTop: 8.5,
        maxWidth: 215,
    },
    toggleContainer: {
        width: 40,
        height: 20,
        borderRadius: 20,
        backgroundColor: colors.charcol30,
        justifyContent: "center",
        padding: 2,
    },
    toggleContainerActive: {
        backgroundColor: colors.charcol90,
    },
    toggleThumb: {
        width: 16,
        height: 16,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        position: "absolute",
        left: 2,
    },
});

export default NotificationToggle;
