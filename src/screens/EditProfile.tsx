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
import { color, colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';
import DateOfBirthInput from '@/component/DateOfBirthInput';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useApi } from '@/hook/useApi';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from "@react-navigation/elements";
type SignupFormData = z.infer<typeof createAcocuntSchema>;

interface UserProfile {
    firstName?: string;
    lastName?: string;
    phone?: string;
    gender?: 'Male' | 'Female' | 'Non Binary'; // Updated to match schema
    aura?: string;
    birthDate?: string;
}

const genders = [
    { label: "Male", icon: require("../assets/icons/male.png") },
    { label: "Female", icon: require("../assets/icons/female.png") },
    { label: "Non Binary", icon: require("../assets/icons/nonbinary.png") },
];

const EditProfile = () => {
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const [previousData, setPreviousData] = useState<UserProfile | null>(null);
    console.log(previousData, "previosdata")
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const globalstyle = getGlobalStyles();
    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? color.dark : color.light;
    const { mutate: fetchPreviousData } = useApi();
    const headerHeight = useHeaderHeight();
    const insets = useSafeAreaInsets();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset, // Added reset to update default values
    } = useForm<SignupFormData>({
        resolver: zodResolver(createAcocuntSchema),
        defaultValues: {
            dob: {
                day: '',
                month: '',
                year: ''
            },
            gender: "Male",
            aura: "",
            firstName: "",
            lastName: "",
            phone: ""
        },
    });

    const email = useSelector((state: RootState) => state.profile.email);

    // Fetch previous data
    useEffect(() => {
        fetchPreviousData(
            {
                url: "/users/profile",
                method: "GET",
                showToast: false,
            },
            {
                onSuccess: (response) => {
                    setPreviousData(response.data);
                },
                onError: (err) => {
                    console.log('❌ Error fetching profile:', err.message);
                },
            }
        );
    }, []);

    // Update form default values when previousData changes
    useEffect(() => {
        if (previousData) {
            const [year, month, day] = previousData.birthDate
                ? previousData.birthDate.split('-')
                : ['', '', ''];
            reset({
                firstName: previousData.firstName || '',
                lastName: previousData.lastName || '',
                phone: previousData.phone || '',
                gender: previousData.gender || 'Male',
                aura: previousData.aura || '',
                dob: {
                    day: day || '',
                    month: month || '',
                    year: year || '',
                },
            });
        }
    }, [previousData, reset]);

    const { mutate: createUser, isPending: loading } = useApi();
    const onSubmit = (data: SignupFormData) => {
        const birthDate = `${data.dob.year}-${data.dob.month.padStart(2, '0')}-${data.dob.day.padStart(2, '0')}`;
        createUser({
            url: '/users/profile',
            method: 'PATCH',
            data: {
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
                    navigation.navigate('MainTab');
                },
            });
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
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

    return (
        <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={keyboardOffset}
            style={styles.keyboardAvoidingView}
        >
            <View style={[styles.container, globalstyle.container]}>
                <HeaderBack
                    title="Edit Profile"
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
                                            error={errors.phone?.message}
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
                                                placeholderTextColor={theme.charcol50}
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
                                    isLoading={loading}
                                    title="Update Profile"
                                    variant="primary"
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default EditProfile;

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