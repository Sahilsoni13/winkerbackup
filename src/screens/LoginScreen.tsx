import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { PermissionsAndroid } from 'react-native';

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
import Checkbox from "@/component/Checkbox";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch } from "react-redux";
import { setEmail } from "@/redux/profileSlice";
import Geolocation from 'react-native-geolocation-service';

const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
};

const getUserLocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            (error) => reject(error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    });
};

const sendLocationToBackend = async (latitude: number, longitude: number, idToken: string) => {
    await axios.put(
        `${API_BASE_URL}/users/location`,
        { latitude, longitude },
        {
            headers: {
                Authorization: idToken,
                'Content-Type': 'application/json',
            },
        }
    );
};

type LoginFormData = z.infer<typeof SignupSchema>;

const LoginScreen = () => {
    const [accepted, setAccepted] = useState(false);
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const [keyboardOffset, setKeyboardOffset] = useState(0);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<LoginFormData>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const dispatch = useDispatch();

    // Load remembered credentials
    useEffect(() => {
        const loadRememberedCredentials = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem("rememberEmail");
                const savedPassword = await AsyncStorage.getItem("rememberPassword");

                if (savedEmail && savedPassword) {
                    reset({
                        email: savedEmail,
                        password: savedPassword,
                    });
                    setAccepted(true);
                }
            } catch (e) {
                console.error("Error loading remembered credentials", e);
            }
        };

        loadRememberedCredentials();
    }, []);

    // React Query mutation                               
    const SignupUser = async (data: LoginFormData) => {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email: data.email,
            password: data.password,
        });
        return response.data;
    };

    const {
        mutate: signin,
        isPending: loading,
        error,
    } = useMutation({
        mutationFn: SignupUser,
        onSuccess: async (response, variables) => {
            console.log(response?.success, "response login screen");
            const isSuccess = response?.success
            // Show toast message
            Toast.show({
                type: isSuccess ? 'success' : 'error',
                text1: response?.message || (isSuccess ? "Signup successful" : "Something went wrong"),
            });

            // Save tokens if success
            if (isSuccess && response?.data) {
                const { idToken, accessToken, refreshToken } = response.data;

                try {
                    if (idToken && accessToken && refreshToken) {
                        await AsyncStorage.setItem('idToken', idToken);
                        await AsyncStorage.setItem('accessToken', accessToken);
                        await AsyncStorage.setItem('refreshToken', refreshToken);
                    }

                    if (accepted) {
                        await AsyncStorage.setItem("rememberEmail", variables.email);
                        await AsyncStorage.setItem("rememberPassword", variables.password);
                    } else {
                        await AsyncStorage.removeItem("rememberEmail");
                        await AsyncStorage.removeItem("rememberPassword");
                    }

                    // ✅ Save email to Redux store
                    dispatch(setEmail(variables.email));

                    try {
                        const permissionGranted = await requestLocationPermission();
                        if (!permissionGranted) {
                            console.log("Location permission denied");
                        } else {
                            const { latitude, longitude } = await getUserLocation();
                            await sendLocationToBackend(latitude, longitude, idToken);
                        }
                    } catch (error) {
                        console.error("Error getting/sending location:", error);
                    }

                } catch (e) {
                    console.error("Error saving tokens to storage", e);
                }

                // Navigate after token storage
                navigation.navigate("CreateAccount", {
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
                text2: error?.response?.data?.message || "Unexpected error occurred",
            });
        },
    });

    const onSubmit = (data: LoginFormData) => {
        signin(data);
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            setKeyboardOffset(Platform.OS === 'ios' ? event.endCoordinates.height + 20 : 40);
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
                                <View style={styles.row}>
                                    <TouchableOpacity onPress={() => setAccepted(!accepted)} style={styles.rememberme}>
                                        <Checkbox bordercolor={colors.charcol20} checked={accepted} onPress={() => setAccepted(!accepted)} />
                                        <Text style={[globalstyle.text_14_reg_40]}>Remember me</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                                        <Text style={globalstyle.text_14_reg_orange}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.Signupbtn}>
                                    <Button
                                        variant="primary"
                                        title={"Log in"}
                                        onPress={handleSubmit(onSubmit)}
                                        isLoading={loading}
                                    />
                                </View>

                                <View style={styles.accountInfoContainer}>
                                    <Text style={[styles.accountinfotext, globalstyle.text_14_reg_40]}>
                                        Don't have an account?
                                    </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
                                        <Text style={[globalstyle.text_14_bold_pur50]}> Sign up</Text>
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

export default LoginScreen;

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
        alignItems: "center",
    },
    contentWrapper: {
        width: "100%",
        alignItems: "center",
    },
    inputcantiner: {
        flexDirection: 'column',
        width: "100%",
        gap: "30"
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
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 16,
    },
    rememberme: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
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
