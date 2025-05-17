
import Button from '@/component/Button';
import HeaderBack from '@/component/HeaderBack';
import Input from '@/component/Input';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
    TextInput,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAcocuntSchema } from '@/validations/createAcocuntSchema';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';
import DateOfBirthInput from '@/component/DateOfBirthInput';
import axios from 'axios';
import { API_BASE_URL } from '@/apiInfo';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type SignupFormData = z.infer<typeof createAcocuntSchema>;

const genders = [
    { label: "Male", icon: require("../assets/icons/male.png") },
    { label: "Female", icon: require("../assets/icons/female.png") },
    { label: "Non Binary", icon: require("../assets/icons/nonbinary.png") },
];

const CreateAccount = () => {
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const globalstyle = getGlobalStyles();
    const { isDarkMode } = useTheme();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(createAcocuntSchema),
        defaultValues: {
            email: "",
            dob: { day: '', month: '', year: '' },
            gender: "Male",
            aura: ""
        },
    });

    const email = useSelector((state: RootState) => state.profile.email);

    console.log(email, "email ++++++++++++++++++")


    // // React Query mutation
    // const SignupUser = async (data: SignupFormData) => {
    //     const birthDate = `${data.dob.year}-${data.dob.month.padStart(2, '0')}-${data.dob.day.padStart(2, '0')}`;
    //     const token = await AsyncStorage.getItem('authToken');
    //     const response = await axios.post(`${API_BASE_URL}/users`, {
    //         email: data.email,
    //         dob: birthDate,
    //         gender: data.gender,
    //         aura: data.aura
    //     },
    // );
    //     return response.data;
    // };
 
 const SignupUser = async (data: SignupFormData) => {
        try {
            const birthDate = `${data.dob.year}-${data.dob.month.padStart(2, '0')}-${data.dob.day.padStart(2, '0')}`;
            const token = await AsyncStorage.getItem('idToken');
            console.log(birthDate)
            const response = await axios.post(
                `${API_BASE_URL}/users`,
                {
                    email: data.email,
                    birthDate: birthDate,
                    gender: data.gender,
                    aura: data.aura,
                },
                {
                    headers: {
                        Authorization: `${token}`,
                    }
                }
            );
            return response.data;
        } catch (error: any) {
            console.error('Signup error:', error?.response?.data || error.message);
            throw error; // so React Query can handle it
        }
    };
    const {
        mutate: createuser,
        isPending: loading,
        error, 
    } = useMutation({
        mutationFn: SignupUser,
        onSuccess: async (response, variables) => {
            console.log(variables)
            const isSuccess = response?.success
            Toast.show({
                type: isSuccess ? 'success' : 'error',
                text1: response?.message || (isSuccess ? "Signup successful" : "Something went wrong"),
            });
            if (isSuccess && response?.data) {
                navigation.navigate("AccountSetupScreen", {
                    email: variables.email,
                });
            }
            reset();
        },
        onError: (error: any) => {
            console.log(error.stack)
            Toast.show({
                type: 'error',
                text1: "Something went wrong",
                text2: error?.response?.data?.message || "Unexpected error occurred",
            });
        },
    });
    const onSubmit = (data: SignupFormData) => {
        createuser(data);
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

    return (
        <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={keyboardOffset}
            style={styles.keyboardAvoidingView}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, globalstyle.container]}>
                    <HeaderBack
                        title="Create Account"
                        onRightPress={() => console.log("onRightPress")}
                    />
                    <ScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="always"
                        style={styles.scrollView}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.innerContainer}>
                                <View style={styles.inputscantiner}>
                                    <Controller
                                        control={control}
                                        name="email"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="Email"
                                                placeholder="Enter email"
                                                leftIcon={require("../assets/icons/email.png")}
                                                value={email}
                                                onChangeText={onChange}
                                                error={errors.email?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name="gender"
                                        render={({ field: { onChange, value } }) => (
                                            <>
                                                <Text style={[globalstyle.text_16_reg_100]}>Gender</Text>
                                                <View style={styles.genderContainer}>
                                                    {genders.map(({ label, icon }) => {
                                                        const isSelected = value === label;
                                                        const backgroundColor = isSelected
                                                            ? isDarkMode
                                                                ? colors.white
                                                                : colors.black
                                                            : isDarkMode
                                                                ? colors.charcol90
                                                                : colors.charcol05;

                                                        const borderColor = isSelected ? colors.white : "transparent";
                                                        const tintColor = isSelected
                                                            ? isDarkMode
                                                                ? colors.charcol90
                                                                : colors.white
                                                            : isDarkMode
                                                                ? colors.white
                                                                : colors.charcol90;

                                                        const textColor = tintColor;

                                                        return (
                                                            <TouchableOpacity
                                                                key={label}
                                                                style={[styles.genderButton, { backgroundColor, borderColor }]}
                                                                onPress={() => onChange(label)}
                                                            >
                                                                <Image
                                                                    source={icon}
                                                                    style={{ width: 20, height: 20, tintColor }}
                                                                />
                                                                <Text style={[globalstyle.text_16_med_white, { color: textColor }]}>
                                                                    {label}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        );
                                                    })}
                                                </View>
                                                {errors.gender?.message && (
                                                    <Text style={{ color: "red", marginTop: 4 }}>{errors.gender.message}</Text>
                                                )}
                                            </>
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name="dob"
                                        render={({ field: { onChange, value } }) => (
                                            <DateOfBirthInput
                                                value={value}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                    {errors.dob && (
                                        <Text style={{ color: 'red', marginTop: 4 }}>
                                            {errors.dob.message || 'Please enter a valid date of birth'}
                                        </Text>
                                    )}

                                    <Controller
                                        control={control}
                                        name="aura"
                                        render={({ field: { onChange, value } }) => (
                                            <View>
                                                <Text style={[globalstyle.text_14_reg_100]}>
                                                    What's your Aura? ✨
                                                </Text>
                                                <TextInput
                                                    style={[styles.textArea, globalstyle.text_16_reg_50]}
                                                    placeholder="Your Aura is your energy. Use it to introduce yourself in short."
                                                    value={value}
                                                    onChangeText={onChange}
                                                    multiline
                                                />
                                            </View>
                                        )}
                                    />
                                    {errors.aura && (
                                        <Text style={{ color: 'red', marginTop: 4 }}>
                                            {errors.aura.message}
                                        </Text>
                                    )}


                                </View>
                                <View style={styles.bottombtns}>
                                    <View style={styles.accountInfoContainer}>
                                        <Text style={[styles.accountinfotext, globalstyle.text_14_reg_40]}>
                                            Already have an account?
                                        </Text>
                                        <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
                                            <Text style={[globalstyle.text_14_bold_pur50]}> Log in</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Button
                                        onPress={handleSubmit(onSubmit)}
                                        // onPress={()=>navigation.navigate("AccountSetupScreen")}
                                        isLoading={loading}
                                        title="Create Account"
                                        variant="primary"
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
    },
    innerContainer: {
        flexGrow: 1,
        paddingBottom: 20,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    inputscantiner: {
        flexDirection: "column",
        gap: 24,
        paddingTop: 24,
    },
    bottombtns: {
        width: "100%",
        justifyContent: "flex-end",
        marginTop: 20,
    },
    accountInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    accountinfotext: {
        textAlign: "center",
    },
    genderContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    genderButton: {
        flexDirection: 'row',
        borderRadius: 28,
        paddingVertical: 8,
        paddingHorizontal: 16,
        gap: 8,
        borderWidth: 1
    },
    textArea: {
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.charcol10,
        padding: 18,
        height: 166,
        textAlignVertical: 'top',
        marginTop: 10
    },
});

export default CreateAccount;
