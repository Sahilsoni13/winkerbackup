// import React, { useEffect, useState } from "react";
// import { PermissionsAndroid } from 'react-native';

// import {
//     KeyboardAvoidingView,
//     Platform,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     TouchableWithoutFeedback,
//     Keyboard,
//     View,
//     Image,
// } from "react-native";

// import { NavigationProp, useNavigation } from "@react-navigation/native";
// import Input from "@/component/Input";
// import HeaderBack from "@/component/HeaderBack";
// import Checkbox from "@/component/Checkbox";
// import Button from "@/component/Button";
// import { useForm, Controller } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { colors, getGlobalStyles } from "@/styles/globaltheme";
// import { useTheme } from "@/ThemeContext";
// import axios from "axios";
// import { API_BASE_URL } from "@/apiInfo";
// import { SignupSchema } from "@/validations/SignupSchema";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import { useDispatch } from "react-redux";
// import { setEmail } from "@/redux/profileSlice";
// import Geolocation from 'react-native-geolocation-service';
// import { useApi } from "@/hook/useApi";

// const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
// };

// const getUserLocation = (): Promise<{ latitude: number; longitude: number }> => {
//     return new Promise((resolve, reject) => {
//         Geolocation.getCurrentPosition(
//             (position) => {
//                 const { latitude, longitude } = position.coords;
//                 resolve({ latitude, longitude });
//                 console.log(position.coords)
//             },
//             (error) => reject(error),
//             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//     });
// };

// const sendLocationToBackend = async (latitude: number, longitude: number, idToken: string) => {
//     await axios.put(
//         `${API_BASE_URL}/users/location`,
//         { latitude, longitude },
//         {
//             headers: {
//                 Authorization: idToken,
//                 'Content-Type': 'application/json',
//             },
//         }
//     );
// };

// type LoginFormData = z.infer<typeof SignupSchema>;

// const LoginScreen = () => {
//     const [accepted, setAccepted] = useState(false);
//     const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
//     const [keyboardOffset, setKeyboardOffset] = useState(0);

//     const {
//         control,
//         handleSubmit,
//         formState: { errors },
//         reset
//     } = useForm<LoginFormData>({
//         resolver: zodResolver(SignupSchema),
//         defaultValues: {
//             email: "",
//             password: "",
//         },
//     });

//     const dispatch = useDispatch();

//     // Load remembered credentials
//     useEffect(() => {
//         const loadRememberedCredentials = async () => {
//             try {
//                 const savedEmail = await AsyncStorage.getItem("rememberEmail");
//                 const savedPassword = await AsyncStorage.getItem("rememberPassword");

//                 if (savedEmail && savedPassword) {
//                     reset({
//                         email: savedEmail,
//                         password: savedPassword,
//                     });
//                     setAccepted(true);
//                 }
//             } catch (e) {
//                 console.error("Error loading remembered credentials", e);
//             }
//         };
//         loadRememberedCredentials();
//     }, []);

//     const { mutate: signin, isPending: loading, error } = useApi();
//     const handleLogin = (data: LoginFormData) => {
//         signin({
//             url: '/auth/login',
//             method: 'POST',
//             data,
//             showToast: true,
//             // successMessage: 'Login successful!',
//             // errorMessage: 'Login failed!',   
//         }, {
//             onSuccess: async (response) => {
//                 const isSuccess = response?.success;

//                 if (isSuccess && response?.data) {
//                     const { idToken, accessToken, refreshToken } = response.data;

//                     try {
//                         await AsyncStorage.setItem('idToken', idToken);
//                         await AsyncStorage.setItem('accessToken', accessToken);
//                         await AsyncStorage.setItem('refreshToken', refreshToken);

//                         if (accepted) {
//                             await AsyncStorage.setItem("rememberEmail", data.email);
//                             await AsyncStorage.setItem("rememberPassword", data.password);
//                         } else {
//                             await AsyncStorage.removeItem("rememberEmail");
//                             await AsyncStorage.removeItem("rememberPassword");
//                         }

//                         dispatch(setEmail(data.email));
//                         navigation.navigate("CreateAccount", {
//                             email: data.email,
//                         });
//                     } catch (e) {
//                         console.error("Token storage error", e);
//                     }
//                 }
//             },
//         });
//     };

//     useEffect(() => {
//         const getLocation = async () => {
//             try {
//                 const permissionGranted = await requestLocationPermission();
//                 if (permissionGranted) {
//                     const { latitude, longitude } = await getUserLocation();
//                     const idToken = await AsyncStorage.getItem('idToken');
//                     if (idToken) {
//                         await sendLocationToBackend(latitude, longitude, idToken);
//                     }
//                 } else {
//                     console.log("Location permission denied");
//                 }
//             } catch (error) {
//                 console.error("Error getting/sending location:", error);
//             }
//         };

//         getLocation();
//     }, []);


//     const onSubmit = (data: LoginFormData) => {
//         handleLogin(data);
//     };

//     useEffect(() => {
//         const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
//             setKeyboardOffset(Platform.OS === 'ios' ? event.endCoordinates.height + 20 : 40);
//         });
//         const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
//             setKeyboardOffset(0);
//         });
//         return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//         };
//     }, []);

//     const globalstyle = getGlobalStyles();
//     const { isDarkMode } = useTheme();

//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             keyboardVerticalOffset={keyboardOffset}
//             style={styles.keyboardAvoidingView}
//         >
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 <View style={[styles.container, globalstyle.container]}>
//                     <HeaderBack />
//                     <ScrollView
//                         showsVerticalScrollIndicator={false}
//                         contentContainerStyle={styles.scrollContent}
//                         keyboardShouldPersistTaps="always"
//                         style={styles.scrollView}
//                     >
//                         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                             <View style={[styles.contentWrapper]}>
//                                 <Image source={require("../assets/images/logo.png")} style={styles.logo} />
//                                 <Text style={[styles.title, globalstyle.text_24_bold_90]}>Welcome to Winker</Text>
//                                 <View style={styles.inputcantiner}>
//                                     <Controller
//                                         control={control}
//                                         name="email"
//                                         render={({ field: { onChange, value } }) => (
//                                             <Input
//                                                 label="Email"
//                                                 placeholder="Enter email or username"
//                                                 leftIcon={require("../assets/icons/email.png")}
//                                                 value={value}
//                                                 onChangeText={onChange}
//                                                 error={errors.email?.message}
//                                             />
//                                         )}
//                                     />
//                                     <Controller
//                                         control={control}
//                                         name="password"
//                                         render={({ field: { onChange, value } }) => (
//                                             <Input
//                                                 label="Password"
//                                                 placeholder="Enter Password"
//                                                 leftIcon={require("../assets/icons/privacy.png")}
//                                                 secureTextEntry={true}
//                                                 value={value}
//                                                 onChangeText={onChange}
//                                                 error={errors.password?.message}
//                                             />
//                                         )}
//                                     />
//                                 </View>
//                                 <View style={styles.row}>
//                                     <TouchableOpacity onPress={() => setAccepted(!accepted)} style={styles.rememberme}>
//                                         <Checkbox bordercolor={colors.charcol20} checked={accepted} onPress={() => setAccepted(!accepted)} />
//                                         <Text style={[globalstyle.text_14_reg_40]}>Remember me</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
//                                         <Text style={globalstyle.text_14_reg_orange}>Forgot Password?</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                                 <View style={styles.Signupbtn}>
//                                     <Button
//                                         variant="primary"
//                                         title={"Log in"}
//                                         onPress={handleSubmit(onSubmit)}
//                                         isLoading={loading}
//                                     />
//                                 </View>

//                                 <View style={styles.accountInfoContainer}>
//                                     <Text style={[styles.accountinfotext, globalstyle.text_14_reg_40]}>
//                                         Don't have an account?
//                                     </Text>
//                                     <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
//                                         <Text style={[globalstyle.text_14_bold_pur50]}> Sign up</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                                 <View style={styles.containerline}>
//                                     <View style={styles.line} />
//                                     <Text style={[styles.orText, globalstyle.text_10_reg_40]}>or login with</Text>
//                                     <View style={styles.line} />
//                                 </View>
//                                 <View style={styles.socialContainer}>
//                                     <TouchableOpacity style={[globalstyle.border, { padding: 14, borderRadius: 12 }]}>
//                                         <Image source={require("../assets/icons/apple.png")} style={[styles.socialIcon,
//                                         { tintColor: isDarkMode ? colors.white : colors.black }]} />
//                                     </TouchableOpacity>
//                                     <TouchableOpacity style={[globalstyle.border, { padding: 14, borderRadius: 12 }]}>
//                                         <Image source={require("../assets/icons/goggle.png")} style={styles.socialIcon} />
//                                     </TouchableOpacity>
//                                     <TouchableOpacity style={[globalstyle.border, { padding: 14, borderRadius: 12 }]}>
//                                         <Image source={require("../assets/icons/facebook.png")} style={styles.socialIcon} />
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </TouchableWithoutFeedback>
//                     </ScrollView>
//                 </View>
//             </TouchableWithoutFeedback>
//         </KeyboardAvoidingView>
//     );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//     keyboardAvoidingView: {
//         flex: 1,
//     },
//     scrollView: {
//         flex: 1,
//     },
//     scrollContent: {
//         flexGrow: 1,
//     },
//     container: {
//         flex: 1,
//         alignItems: "center",
//     },
//     contentWrapper: {
//         width: "100%",
//         alignItems: "center",
//     },
//     inputcantiner: {
//         flexDirection: 'column',
//         width: "100%",
//         gap: "30"
//     },
//     logo: {
//         width: 57,
//         height: 56,
//         marginBottom: 24,
//         marginTop: 6.5,
//     },
//     title: {
//         marginBottom: 20,
//     },
//     row: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         width: "100%",
//         marginTop: 16,
//     },
//     rememberme: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 8,
//     },
//     Signupbtn: {
//         width: "100%",
//         marginTop: 32,
//     },
//     accountInfoContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 16,
//     },
//     accountinfotext: {
//         textAlign: 'center',
//     },
//     containerline: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginTop: 47,
//         width: "100%",
//     },
//     line: {
//         flex: 1,
//         height: 1,
//         backgroundColor: colors.charcol10,
//     },
//     orText: {
//         marginHorizontal: 10,
//         color: colors.black,
//         padding: 5,
//     },
//     socialContainer: {
//         flexDirection: "row",
//         gap: 16,
//         marginTop: 32,
//         paddingBottom: 16,
//     },
//     socialIcon: {
//         width: 20,
//         height: 20,
//     },
//     loginwith: {
//         paddingTop: 8,
//         textAlign: "right",
//         marginBottom: 24,
//     },
// });


import React, { useEffect, useState } from "react";
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
import { API_BASE_URL } from "@/apiInfo";
import { SignupSchema } from "@/validations/SignupSchema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setEmail } from "@/redux/slices/profileSlice";
import Geolocation from 'react-native-geolocation-service';
import { useApi } from "@/hook/useApi";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface Profile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePictureUrl: string;
    profilePictureUrls: string[];
    location: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}

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
                console.log(position.coords);
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
    const [profile, setProfile] = useState<Profile | null>(null);
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const headerHeight = useHeaderHeight();
    const insets = useSafeAreaInsets();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<LoginFormData>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const dispatch = useDispatch();
    const { mutate: signin, isPending: loading, error } = useApi();
    const { mutate: fetchUser } = useApi();

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

    const handleLogin = (data: LoginFormData) => {
        signin({
            url: '/auth/login',
            method: 'POST',
            data,
            showToast: true,
        }, {
            onSuccess: async (response) => {
                const isSuccess = response?.success;
                if (isSuccess && response?.data) {
                    const { idToken, accessToken, refreshToken } = response.data;
                    try {
                        await AsyncStorage.setItem('idToken', idToken);
                        await AsyncStorage.setItem('accessToken', accessToken);
                        await AsyncStorage.setItem('refreshToken', refreshToken);

                        if (accepted) {
                            await AsyncStorage.setItem("rememberEmail", data.email);
                            await AsyncStorage.setItem("rememberPassword", data.password);
                        } else {
                            await AsyncStorage.removeItem("rememberEmail");
                            await AsyncStorage.removeItem("rememberPassword");
                        }

                        dispatch(setEmail(data.email));
                        fetchUser(
                            {
                                url: '/users/profile',
                                method: 'GET',
                                showToast: true,
                            },
                            {
                                onSuccess: (profileResponse) => {
                                    console.log("Profile Response:", profileResponse);
                                    setProfile(profileResponse.data);
                                    const { firstName, lastName } = profileResponse.data;
                                    const isProfileIncomplete = !firstName || !lastName;
                                    console.log("Is Profile Incomplete?", isProfileIncomplete);
                                    if (isProfileIncomplete) {
                                        console.log("Navigating to CreateAccount");
                                        navigation.navigate("CreateAccount", { email: data.email });
                                    } else {
                                        console.log("Navigating to MainTab");
                                        navigation.navigate("MainTab");
                                    }
                                },
                                onError: (err) => {
                                    console.log('Error fetching profile:', err.message);
                                    // navigation.navigate("CreateAccount", { email: data.email });
                                },
                            }
                        );
                    } catch (e) {
                        console.error("Token storage error", e);
                        // Fallback navigation in case of storage error
                        navigation.navigate("CreateAccount", { email: data.email });
                    }
                } else {
                    console.log("Login response invalid:", response);
                }
            },
            onError: (err) => {
                console.log("Login error:", err.message);
            },
        });
    };

    useEffect(() => {
        const getLocation = async () => {
            try {
                const permissionGranted = await requestLocationPermission();
                if (permissionGranted) {
                    const { latitude, longitude } = await getUserLocation();
                    console.log(latitude, longitude, "longitude lattitude")
                    const idToken = await AsyncStorage.getItem('idToken');
                    if (idToken) {
                        await sendLocationToBackend(latitude, longitude, idToken);
                    }
                } else {
                    console.log("Location permission denied");
                }
            } catch (error) {
                console.error("Error getting/sending location:", error);
            }
        };
        getLocation();
    }, []);

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

    const onSubmit = (data: LoginFormData) => {
        handleLogin(data);
    };

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
        gap: 30, // Fixed: Changed string "30" to number 30
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
});