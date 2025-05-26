
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
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import color, { globalstyle } from "@/styles/global";
import { getGlobalStyles } from "@/styles/globaltheme";
import { useTheme } from "@/ThemeContext";
import { useHeaderHeight } from "@react-navigation/elements";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const headerHeight = useHeaderHeight();
    const insets = useSafeAreaInsets();
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
            // setKeyboardOffset(Platform.OS === 'ios' ? event.endCoordinates.height + 20 : 40);
            setKeyboardOffset(Platform.OS === 'ios' ? headerHeight + insets.bottom : 40);
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