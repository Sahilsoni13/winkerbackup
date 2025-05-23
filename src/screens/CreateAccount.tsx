
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
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useApi } from '@/hook/useApi';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
    const headerHeight = useHeaderHeight();
        const insets = useSafeAreaInsets();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(createAcocuntSchema),
        defaultValues: {
            dob: { day: '', month: '', year: '' },
            gender: "Male",
            aura: "",
            firstName: "",
            lastName: "",
            phone: ""
        },
    });

    const email = useSelector((state: RootState) => state.profile.email);
    const { mutate: createUser, isPending: loading } = useApi();
    const onSubmit = (data: SignupFormData) => {
        const birthDate = `${data.dob.year}-${data.dob.month.padStart(2, '0')}-${data.dob.day.padStart(2, '0')}`;
        createUser({
            url: '/users',
            method: 'POST',
            data: {
                email: email,
                birthDate: birthDate,
                gender: data.gender,
                aura: data.aura,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone
            },
            showToast: true,
        },
            {
                onSuccess: (response) => {
                    console.log(response, "response")
                    navigation.navigate('AccountSetupScreen');
                },
            });
    };
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            // setKeyboardOffset(Platform.OS === 'ios' ? event.endCoordinates.height + 20 : 40);
                        setKeyboardOffset(Platform.OS === 'ios' ? headerHeight+ insets.bottom: 40);
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
                                        name="firstName"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="First Name"
                                                placeholder="Enter first name"
                                                value={value}
                                                onChangeText={onChange}
                                                error={errors.firstName?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name="lastName"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="Last Name"
                                                placeholder="Enter last name"
                                                value={value}
                                                onChangeText={onChange}
                                                error={errors.lastName?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name="phone"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="Phone"
                                                placeholder="Enter Phone Number"
                                                value={value}
                                                onChangeText={onChange}
                                                error={errors.lastName?.message}
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
