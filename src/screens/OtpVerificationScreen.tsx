
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

const OtpVerificationScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<{ params: { email: string; password: string } }, "params">>();
  const { email, password } = route.params;

  const otpLength = 6;
  const [otp, setOtp] = useState("");
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const globalstyle = getGlobalStyles();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (event) => {
      setKeyboardOffset(Platform.OS === "ios" ? event.endCoordinates.height + 20 : 25);
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOffset(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const verifyOtpMutation = useMutation({
    mutationFn: async (otpCode: string) => {
      const response = await axios.post(`${API_BASE_URL}/auth/verify-email`, {
        email,
        code: otpCode,
        password,
      });
      return response.data;
    },
    onSuccess: (response) => {
      if (response?.statusCode === 201) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: response.message || "Email verified successfully!",
        });
        navigation.navigate("LoginScreen");
      } else {
        Toast.show({
          type: "error",
          text1: "Verification Failed",
          text2: response?.message || "Unexpected response.",
        });
      }
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Verification Failed",
        text2: error?.response?.data?.message || "Something went wrong!",
      });
    },
  });


  const handleVerify = () => {
    if (otp.length !== otpLength) {
      Toast.show({
        type: "error",
        text1: "Invalid OTP",
        text2: "Please enter all 6 digits.",
      });
      return;
    }

    verifyOtpMutation.mutate(otp);
  };

  const resendOtpMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        email: email,
        password: password,
      });
      return response.data;
    },
    onSuccess: (response) => {
      Toast.show({
        type: "success",
        text1: "OTP Sent",
        text2: response.message || "A new OTP has been sent to your email.",
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Resend Failed",
        text2: error?.response?.data?.message || "Unable to resend OTP.",
      });
    },
  });

  const handleResend = () => {
    resendOtpMutation.mutate();
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
                  <TouchableOpacity onPress={handleResend} >
                    <Text style={[styles.resendText, globalstyle.text_14_reg_40]}>
                      Didn't receive the code?{" "}
                      <Text style={globalstyle.text_14_bold_pur50}>Resend Code</Text>
                    </Text>
                  </TouchableOpacity>
                  <Button
                    variant="primary"
                    onPress={handleVerify}
                    title="Verify and Continue"
                    isLoading={verifyOtpMutation.isPending}
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
