// import React from "react";
// import {
//     View,
//     StatusBar,
//     Platform,
//     StyleSheet,
//     ViewProps,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// interface SafeAreaWrapperProps extends ViewProps {
//     children: React.ReactNode;
//     statusBarColor?: string;
//     bottomInsetColor?: string;
// }

// const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
//     children,
//     statusBarColor = "#000", // Default purple
//     bottomInsetColor = "#fff", // Default purple
//     style,
//     ...props
// }) => {
//     const insets = useSafeAreaInsets();

//     return (
//         <>
//             <StatusBar
//                 backgroundColor={statusBarColor}
//                 barStyle="light-content" // White icons/text for dark background
//             />
//             {/* Top inset background */}
//             <View
//                 style={{
//                     height: insets.top,
//                     backgroundColor: statusBarColor, // Explicitly set top inset color
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                 }}
//             />
//             <View
//                 style={[
//                     styles.container,
//                     {
//                         backgroundColor: "#fff",
//                     },
//                     style,
//                 ]}
//                 {...props}
//             >
//                 {children}
//                 {/* Bottom inset background for Android */}
//                 {Platform.OS === "android" && (
//                     <View
//                         style={{
//                             height: insets.bottom,
//                             backgroundColor: bottomInsetColor,
//                             position: "absolute",
//                             bottom: 0,
//                             left: 0,
//                             right: 0,
//                         }}
//                     />
//                 )}
//             </View>
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
// });

// export default SafeAreaWrapper;

import color from "@/styles/global";
import { colors, getGlobalStyles } from "@/styles/globaltheme";
import { useTheme } from "@/ThemeContext";
import React from "react";
import {
    View,
    StatusBar,
    Platform,
    StyleSheet,
    ViewProps,
    Dimensions,
    useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeAreaWrapperProps extends ViewProps {
    children: React.ReactNode;
    statusBarColor?: string;
    bottomInsetColor?: string;
}


const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
    children,
    // statusBarColor = color.white, 
    bottomInsetColor = color.charcol100,
    style,
    ...props
}) => {
    const insets = useSafeAreaInsets();
    const { isDarkMode } = useTheme();
    const statusBarColor = isDarkMode ? colors.charcol100 : colors.white
    const statusBarHeight = insets.top > 0 ? insets.top : Platform.OS === "ios" ? 44 : 24;

    return (
        <>
            <StatusBar
                backgroundColor={statusBarColor}
                barStyle={isDarkMode?"light-content":"dark-content"} // White icons/text for dark background
                translucent={false} // Force non-translucent status bar
            />
            {/* Top inset background with fallback height */}
            <View
                style={{
                    height: statusBarHeight, // Use fallback if insets.top is 0
                    backgroundColor: statusBarColor, // Explicitly set top inset color
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000, // Ensure it stays on top
                }}
            />
            <View
                style={[
                    styles.container,
                    {
                        paddingTop: statusBarHeight, // Use fallback height for padding
                        paddingBottom: insets.bottom,
                        backgroundColor: "#fff",
                    },
                    style,
                ]}
                {...props}
            >
                {children}
                {/* Bottom inset background for Android */}
                {Platform.OS === "android" && (
                    <View
                        style={{
                            height: insets.bottom,
                            backgroundColor: bottomInsetColor,
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            zIndex: 1000, // Ensure it stays on top
                        }}
                    />
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SafeAreaWrapper;