import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    Image,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Input from "@/component/Input";
import HeaderBack from "@/component/HeaderBack";
import Button from "@/component/Button";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { colors, getGlobalStyles } from "@/styles/globaltheme";
import { useTheme } from "@/ThemeContext";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "@/apiInfo";
import { SignupSchema } from "@/validations/SignupSchema";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SignupFormData = z.infer<typeof SignupSchema>;

const SignupScreen = () => {
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const headerHeight = useHeaderHeight();
    const insets = useSafeAreaInsets();
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<SignupFormData>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // React Query mutation
    const SignupUser = async (data: SignupFormData) => {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
            email: data.email,
            password: data.password,
        });
        return response.data;
    };

    const {
        mutate: signup,
        isPending: loading,
        error,
    } = useMutation({
        mutationFn: SignupUser,
        onSuccess: (response, variables) => {
            const isSuccess = response?.statusCode === 201;

            Toast.show({
                type: isSuccess ? 'success' : 'error',
                text1: response?.message || "Something went wrong",
            });

            if (isSuccess) {
                navigation.navigate("OtpVerificationScreen", {
                    email: variables.email,
                    password: variables.password,
                });
            }
            reset();

        },
        onError: (error: any) => {
            Toast.show({
                type: 'error',
                text1: "Something went wrong",
                text2: error?.response?.data?.message || error.message,
            });
        },
    });

    const onSubmit = (data: SignupFormData) => {
        signup(data);
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            // setKeyboardOffset(Platform.OS === 'ios' ? event.endCoordinates.height + 20 : 40);
            setKeyboardOffset(Platform.OS === 'ios' ? headerHeight + insets.bottom : 40);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardOffset(0);
        });
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const globalstyle = getGlobalStyles();
    const { isDarkMode } = useTheme();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={keyboardOffset}
            style={styles.keyboardAvoidingView}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, globalstyle.container]}>
                    <HeaderBack />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="always"
                        style={styles.scrollView}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={[styles.contentWrapper]}>
                                <Image source={require("../assets/images/logo.png")} style={styles.logo} />
                                <Text style={[styles.title, globalstyle.text_24_bold_90]}>Welcome to Winker</Text>
                                <View style={styles.inputcantiner}>
                                    <Controller
                                        control={control}
                                        name="email"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="Email"
                                                placeholder="Enter email or username"
                                                leftIcon={require("../assets/icons/email.png")}
                                                value={value}
                                                onChangeText={onChange}
                                                error={errors.email?.message}
                                            />
                                        )}
                                    />

                                    <Controller
                                        control={control}
                                        name="password"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="Password"
                                                placeholder="Enter Password"
                                                leftIcon={require("../assets/icons/privacy.png")}
                                                secureTextEntry={true}
                                                value={value}
                                                onChangeText={onChange}
                                                error={errors.password?.message}
                                            />
                                        )}
                                    />
                                </View>
                                <View style={styles.Signupbtn}>
                                    <Button
                                        variant="primary"
                                        title={"Sign Up"}
                                        onPress={handleSubmit(onSubmit)}
                                        isLoading={loading}
                                    />
                                </View>
                                <View style={styles.accountInfoContainer}>
                                    <Text style={[styles.accountinfotext, globalstyle.text_14_reg_40]}>
                                        Don't have an account?
                                    </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                                        <Text style={[globalstyle.text_14_bold_pur50]}> Log in</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.containerline}>
                                    <View style={styles.line} />
                                    <Text style={[styles.orText, globalstyle.text_10_reg_40]}>or login with</Text>
                                    <View style={styles.line} />
                                </View>
                                <View style={styles.socialContainer}>
                                    <TouchableOpacity style={[globalstyle.border, { padding: 14, borderRadius: 12 }]}>
                                        <Image source={require("../assets/icons/apple.png")} style={[styles.socialIcon,
                                        { tintColor: isDarkMode ? colors.white : colors.black }]} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[globalstyle.border, { padding: 14, borderRadius: 12 }]}>
                                        <Image source={require("../assets/icons/goggle.png")} style={styles.socialIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[globalstyle.border, { padding: 14, borderRadius: 12 }]}>
                                        <Image source={require("../assets/icons/facebook.png")} style={styles.socialIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        width: "100%"
    },
    contentWrapper: {
        width: "100%",
        alignItems: "center",
    },
    inputcantiner: {
        flexDirection: 'column',
        width: "100%",
        flex: 1,
        gap: "30",

    },
    logo: {
        width: 57,
        height: 56,
        marginBottom: 24,
        marginTop: 6.5,
    },
    title: {
        marginBottom: 20,
    },

    Signupbtn: {
        width: "100%",
        marginTop: 32,
    },
    accountInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    accountinfotext: {
        textAlign: 'center',
    },
    containerline: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 47,
        width: "100%",
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: colors.charcol10,
    },
    orText: {
        marginHorizontal: 10,
        color: colors.black,
        padding: 5,
    },
    socialContainer: {
        flexDirection: "row",
        gap: 16,
        marginTop: 32,
        paddingBottom: 16,
    },
    socialIcon: {
        width: 20,
        height: 20,
    },
    loginwith: {
        paddingTop: 8,
        textAlign: "right",
        marginBottom: 24,
    },
});
