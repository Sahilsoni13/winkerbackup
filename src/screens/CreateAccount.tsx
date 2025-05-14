// import Button from '@/component/Button';
// import HeaderBack from '@/component/HeaderBack';
// import Input from '@/component/Input';
// import color, { globalstyle } from '@/styles/global';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';

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
// } from 'react-native';

// import { useForm, Controller } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { signupSchema } from '@/validations/signupValidation';

// /** Type definition for the signup form data, inferred from signupSchema */
// type SignupFormData = z.infer<typeof signupSchema>;
// /**
//  * Component for creating a new user account with form validation and navigation
//  * @returns {JSX.Element} The rendered CreateAccount component
//  */
// const CreateAccount = () => {

//     /** Navigation object to handle screen transitions */
//     const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

//     /** State to manage keyboard offset for better UX */
//     const [keyboardOffset, setKeyboardOffset] = useState(0);
//     /** Form handling with react-hook-form and zod validation */
//     const {
//         control,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<SignupFormData>({
//         resolver: zodResolver(signupSchema),
//         defaultValues: {
//             name: "",
//             email: "",
//             phone: "",
//             password: "",
//             confirmPassword: "",
//         },
//     });

//     /**
//      * Sets up keyboard listeners to adjust the form offset
//      */
//     useEffect(() => {
//         const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
//             setKeyboardOffset(Platform.OS === 'ios' ? event.endCoordinates.height : 25);
//         });

//         const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
//             setKeyboardOffset(-60); // Reset to 0 instead of -60 for better behavior
//         });

//         return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//         };
//     }, []);

//     /**
//      * Handles form submission and navigates to the next screen
//      * @param {SignupFormData} data - The validated form data
//      */
//     const onSubmit = (data: SignupFormData) => {
//         console.log("Form Data:", data);
//         navigation.navigate("AccountSetupScreen");
//     };

//     return (
//         <KeyboardAvoidingView
//             enabled
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             keyboardVerticalOffset={keyboardOffset}
//             style={styles.keyboardAvoidingView}
//             contentContainerStyle={{flexGrow:1}}
//         >
//             <View style={[styles.container, globalstyle.container]}>
//                 <HeaderBack
//                     title="Create Account"
//                     onRightPress={() => console.log("onRightPress")}
//                 />
//                 <ScrollView
//                     bounces={false}
//                     showsVerticalScrollIndicator={false} // Scroll indicator dikhne ke liye
//                     contentContainerStyle={styles.scrollContent}
//                     keyboardShouldPersistTaps="always"
//                     style={styles.scrollView}
//                 >
//                     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                         <View>
//                             <View style={styles.inputscantiner}>
//                                 <Controller
//                                     control={control}
//                                     name="name"
//                                     render={({ field: { onChange, value } }) => (
//                                         <Input
//                                             label="Name"
//                                             placeholder="Enter Full Name"
//                                             leftIcon={require("../assets/icons/user.png")}
//                                             value={value}
//                                             onChangeText={onChange}
//                                             error={errors.name?.message}
//                                         />
//                                     )}
//                                 />
//                                 <Controller
//                                     control={control}
//                                     name="email"
//                                     render={({ field: { onChange, value } }) => (
//                                         <Input
//                                             label="Email"
//                                             placeholder="Enter email"
//                                             leftIcon={require("../assets/icons/email.png")}
//                                             value={value}
//                                             onChangeText={onChange}
//                                             error={errors.email?.message}
//                                         />
//                                     )}
//                                 />
//                                 <Controller
//                                     control={control}
//                                     name="phone"
//                                     render={({ field: { onChange, value } }) => (
//                                         <Input
//                                             label="Phone Number"
//                                             type="number-pad"
//                                             placeholder="Enter Phone Number"
//                                             leftIcon={require("../assets/icons/phone.png")}
//                                             value={value}
//                                             onChangeText={onChange}
//                                             error={errors.phone?.message}
//                                         />
//                                     )}
//                                 />
//                                 <Controller
//                                     control={control}
//                                     name="password"
//                                     render={({ field: { onChange, value } }) => (
//                                         <Input
//                                             label="Password"
//                                             placeholder="Enter Password"
//                                             leftIcon={require("../assets/icons/privacy.png")}
//                                             secureTextEntry={true}
//                                             value={value}
//                                             onChangeText={onChange}
//                                             error={errors.password?.message}
//                                         />
//                                     )}
//                                 />
//                                 <Controller
//                                     control={control}
//                                     name="confirmPassword"
//                                     render={({ field: { onChange, value } }) => (
//                                         <Input
//                                             label="Confirm Password"
//                                             placeholder="Re-enter Password"
//                                             leftIcon={require("../assets/icons/privacy.png")}
//                                             secureTextEntry={true}
//                                             value={value}
//                                             onChangeText={onChange}
//                                             error={errors.confirmPassword?.message}
//                                         />
//                                     )}
//                                 />
//                             </View>
//                             <View style={styles.bottombtns}>
//                                 <View style={styles.accountInfoContainer}>
//                                     <Text style={[styles.accountinfotext, globalstyle.text_14_reg_40]}>
//                                         Already have an account?
//                                     </Text>
//                                     <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
//                                         <Text style={[globalstyle.text_14_bold_pur50]}> Log in</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                                 <Button
//                                     onPress={handleSubmit(onSubmit)}
//                                     title="Create Account"
//                                     variant="primary"
//                                 />
//                             </View>
//                         </View>

//                     </TouchableWithoutFeedback>
//                 </ScrollView>
//             </View>
//         </KeyboardAvoidingView>
//     );
// };

// /**
//  * Styles for the CreateAccount component
//  * @type {Object}
//  */
// const styles = StyleSheet.create({
//     keyboardAvoidingView: {
//         flex: 1,
//         height: "100%"
//     },
//     scrollView: {
//         flex: 1,
//     },
//     scrollContent: {
//         flexGrow: 1,
//     },
//     container: {
//         flex: 1,
//         backgroundColor: color.white,
//     },
//     inputscantiner: {
//         flexDirection: "column",
//         gap: 24,
//         paddingTop: 24,
//     },
//     bottombtns: {
//         width: "100%",
//         justifyContent: "flex-end",
//         marginTop: 20,
//         paddingBottom: 20,
//     },
//     accountInfoContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 16,
//     },
//     accountinfotext: {
//         textAlign: "center",
//     },
// });

// export default CreateAccount;


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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/validations/signupValidation';
import { getGlobalStyles } from '@/styles/globaltheme';

type SignupFormData = z.infer<typeof signupSchema>;

const CreateAccount = () => {
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const [keyboardOffset, setKeyboardOffset] = useState(0);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
    });

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

    const onSubmit = (data: SignupFormData) => {
        console.log("Form Data:", data);
        navigation.navigate("AccountSetupScreen");
    };

 const globalstyle = getGlobalStyles();

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
                                        name="name"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="Name"
                                                placeholder="Enter Full Name"
                                                leftIcon={require("../assets/icons/user.png")}
                                                value={value}
                                                onChangeText={onChange}
                                                error={errors.name?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name="email"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="Email"
                                                placeholder="Enter email"
                                                leftIcon={require("../assets/icons/email.png")}
                                                value={value}
                                                onChangeText={onChange}
                                                error={errors.email?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name="phone"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="Phone Number"
                                                type="number-pad"
                                                placeholder="Enter Phone Number"
                                                leftIcon={require("../assets/icons/phone.png")}
                                                value={value}
                                                onChangeText={onChange}
                                                error={errors.phone?.message}

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
                                    <Controller
                                        control={control}
                                        name="confirmPassword"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="Confirm Password"
                                                placeholder="Re-enter Password"
                                                leftIcon={require("../assets/icons/privacy.png")}
                                                secureTextEntry={true}
                                                value={value}
                                                onChangeText={onChange}
                                                error={errors.confirmPassword?.message}
                                            />
                                        )}
                                    />
                                </View>
                                <View style={styles.bottombtns}>
                                    <View style={styles.accountInfoContainer}>
                                        <Text style={[styles.accountinfotext, globalstyle.text_14_reg_40]}>
                                            Already have an account?
                                        </Text>
                                        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                                            <Text style={[globalstyle.text_14_bold_pur50]}> Log in</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Button
                                        onPress={handleSubmit(onSubmit)}
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
});

export default CreateAccount;