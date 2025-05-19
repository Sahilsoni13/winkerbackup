
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import HeaderBack from "@/component/HeaderBack";
import Button from "@/component/Button";
import { OtpInput } from "react-native-otp-entry";
import { colors, getGlobalStyles } from "@/styles/globaltheme";
import { useTheme } from "@/ThemeContext";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "@/apiInfo";
import { useApi } from "@/hook/useApi";

const OtpVerificationScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<{ params: { email: string; password: string } }, 'params'>>();
  const { email, password } = route.params;

  const otpLength = 6;
  const [otp, setOtp] = useState('');
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const globalstyle = getGlobalStyles();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardOffset(Platform.OS === 'ios' ? event.endCoordinates.height + 20 : 25);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardOffset(0));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // ✅ verify OTP using useApi
  const { mutate: verifyOtp, isPending: isVerifying } = useApi();
  const { mutate: resendOtp, isPending: isResending } = useApi();

  const handleVerify = () => {
    if (otp.length !== otpLength) {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter all 6 digits.',
      });
      return;
    }

    verifyOtp({
      url: '/auth/verify-email',
      method: 'POST',
      data: { email, code: otp, password },
      showToast: true,
    }, {
      onSuccess: async (response) => {
        const isSuccess = response?.success;
        if (isSuccess) {
          navigation.navigate("LoginScreen");
        }
      }
    });
  };

  const handleResend = () => {
    resendOtp({
      url: '/auth/signup',
      method: 'POST',
      data: { email, password },
      showToast: true,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardOffset}
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
              <View style={styles.innerContainer}>
                <View style={{ flexDirection: "column", gap: 32 }}>
                  <Text style={[styles.title, globalstyle.text_24_bold_90]}>
                    OTP Verification
                  </Text>
                  <View>
                    <Text style={[styles.subtitle, globalstyle.text_16_reg_40]}>
                      Enter the 6-digit code we sent you.
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                      }}
                    >
                      <Text style={globalstyle.text_16_reg_100}>{email}</Text>
                      <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")} >
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                            tintColor: isDarkMode ? colors.white : colors.black,
                          }}
                          source={require("../assets/icons/editmail.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <OtpInput
                    numberOfDigits={6}
                    focusColor={colors.charcol20}
                    onTextChange={(text) => setOtp(text)}
                    autoFocus={false}
                    placeholder="000000"
                    type="numeric"
                    theme={{
                      pinCodeTextStyle: {
                        color: colors.charcol40,
                        fontSize: 16,
                        fontWeight: "400",
                        lineHeight: 20,
                      },
                      pinCodeContainerStyle: {
                        backgroundColor: colors.white,
                        borderWidth: 0.5,
                        borderColor: colors.charcol20,
                        width: 40,
                        height: 40,
                      },
                      containerStyle: {
                        gap: 16,
                        flexDirection: "row",
                        justifyContent: "center",
                      },
                    }}
                  />
                </View>

                <View style={{ flexDirection: "column", gap: 16, marginTop: 16 }}>
                  <TouchableOpacity onPress={() => handleResend()} >
                    <Text style={[styles.resendText, globalstyle.text_14_reg_40]}>
                      Didn't receive the code?{" "}
                      <Text style={globalstyle.text_14_bold_pur50}> {isResending && <ActivityIndicator />} Resend Code</Text>
                    </Text>
                  </TouchableOpacity>
                  <Button
                    variant="primary"
                    onPress={() => handleVerify()}
                    title="Verify and Continue"
                    isLoading={isVerifying}
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
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 20,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 20,
    textAlign: "center",
  },
  resendText: {
    textAlign: "center",
  },
});

export default OtpVerificationScreen;
