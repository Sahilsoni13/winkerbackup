// import React, { useEffect, useState } from "react";
// import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView, } from "react-native";
// import { NavigationProp, useNavigation } from "@react-navigation/native";
// import { useForm, Controller } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Input from "@/component/Input";
// import color, { globalstyle } from "@/styles/global";
// import HeaderBack from "@/component/HeaderBack";
// import Button from "@/component/Button";
// import { forgotPasswordSchema } from "@/validations/forgotValidation";

// /**
//  * Type inferred from schema
//  */
// type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// /**
//  * ForgotPassword Screen Component
//  *
//  * This screen allows users to enter their email to receive a password reset link.
//  * It includes an email input field with validation and a button to navigate to the OTP verification screen.
//  *
//  * @returns {JSX.Element} The ForgotPassword screen UI.
//  */
// const ForgotPassword = () => {
//     const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
//     const [keyboardOffset, setKeyboardOffset] = useState(0);

//     const {
//         control,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<ForgotPasswordFormData>({
//         resolver: zodResolver(forgotPasswordSchema),
//         defaultValues: {
//             email: "",
//         },
//         mode: "onChange", // 🔥 Real-time validation
//     });

//     /**
//      * Effect Hook to manage keyboard visibility and adjust screen layout accordingly.
//      */
//     useEffect(() => {
//         const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (event) => {
//             setKeyboardOffset(Platform.OS === "ios" ? event.endCoordinates.height : 20);
//         });

//         const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
//             setKeyboardOffset(-70);
//         });

//         return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//         };
//     }, []);

//     /**
//      * Handle form submission
//      */
//     const onSubmit = (data: ForgotPasswordFormData) => {
//         console.log("Form Data:", data); // For debugging
//         navigation.navigate("OtpVerificationScreen");
//     };

//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//             keyboardVerticalOffset={keyboardOffset}
//             style={{ flex: 1 }}
//         >
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 <View
//                     style={[
//                         styles.container,
//                         globalstyle.container,
//                     ]}
//                 >
//                     <HeaderBack />
//                     <View style={{ alignItems: "center", paddingBottom: 20, width: "100%", flex: 1 }}>
//                         <Image source={require("../assets/images/logo.png")} style={styles.logo} />
//                         <Text style={[styles.title, globalstyle.text_24_bold_90]}>Forgot Password</Text>
//                         <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>
//                         <View style={styles.inputContainer}>
//                             <Controller
//                                 control={control}
//                                 name="email"
//                                 render={({ field: { onChange, value } }) => (
//                                     <Input
//                                         label="Email"
//                                         placeholder="Enter your email"
//                                         leftIcon={require("../assets/icons/email.png")}
//                                         value={value}
//                                         onChangeText={onChange}
//                                         error={errors.email?.message} // 🔥 Display validation error
//                                     />
//                                 )}
//                             />
//                         </View>
//                         <View style={styles.buttonContainer}>
//                             <Button
//                                 variant="primary"
//                                 title="Send Link"
//                                 onPress={handleSubmit(onSubmit)} // 🔥 Submit form
//                             />
//                         </View>
//                     </View>
//                 </View>
//             </TouchableWithoutFeedback>
//         </KeyboardAvoidingView>
//     );
// };

// /**
//  * Styles for the ForgotPassword component.
//  */
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: color.white,
//         alignItems: "center",
//     },
//     inputContainer: {
//         width: "100%",
//         flex: 1,
//         marginTop: 20,
//     },
//     logo: {
//         width: 57,
//         height: 56,
//         marginBottom: 24,
//         marginTop: 6.5,
//     },
//     title: {
//         marginBottom: 10,
//     },
//     subtitle: {
//         fontSize: 14,
//         color: color.charcol50,
//         textAlign: "center",
//         marginBottom: 20,
//     },
//     buttonContainer: {
//         width: "100%",
//     },
// });

// export default ForgotPassword;

import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/component/Input";
import HeaderBack from "@/component/HeaderBack";
import Button from "@/component/Button";
import { forgotPasswordSchema } from "@/validations/forgotValidation";
import { SafeAreaView } from "react-native-safe-area-context";
import color, { globalstyle } from "@/styles/global";
import { getGlobalStyles } from "@/styles/globaltheme";
import { useTheme } from "@/ThemeContext";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const [keyboardOffset, setKeyboardOffset] = useState(0);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (event) => {
            setKeyboardOffset(Platform.OS === "ios" ? event.endCoordinates.height + 20 : 40);
        });

        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardOffset(0);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const onSubmit = (data: ForgotPasswordFormData) => {
        console.log("Form Data:", data);
        navigation.navigate("OtpVerificationScreen");
    };

    const globalstyle = getGlobalStyles();
    const { isDarkMode } = useTheme();


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={keyboardOffset}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, globalstyle.container]}>
                    <HeaderBack />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={[{
                                width: "100%", flexGrow: 1,
                            }]}>
                                <View style={[styles.innerContainer]}>
                                    <Image source={require("../assets/images/logo.png")} style={styles.logo} />
                                    <Text style={[styles.title, globalstyle.text_24_bold_90]}>Forgot Password</Text>
                                    <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>
                                    <View style={styles.inputContainer}>
                                        <Controller
                                            control={control}
                                            name="email"
                                            render={({ field: { onChange, value } }) => (
                                                <Input
                                                    label="Email"
                                                    placeholder="Enter your email"
                                                    leftIcon={require("../assets/icons/email.png")}
                                                    value={value}
                                                    onChangeText={onChange}
                                                    error={errors.email?.message}
                                                />
                                            )}
                                        />
                                    </View>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        variant="primary"
                                        title="Send Link"
                                        onPress={handleSubmit(onSubmit)}
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: "center",
        paddingBottom: 20
    },
    innerContainer: {
        alignItems: "center",
        width: "100%",
        flex: 1,
    },
    inputContainer: {
        width: "100%",
        marginTop: 20,
    },
    logo: {
        width: 57,
        height: 56,
        marginBottom: 24,
        marginTop: 6.5,
    },
    title: {
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: color.charcol50,
        textAlign: "center",
        marginBottom: 20,
    },
    buttonContainer: {
        width: "100%",
    },
});

export default ForgotPassword;