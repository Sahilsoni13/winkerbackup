// import React, { useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Alert,
//   Image,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { NavigationProp, useNavigation } from "@react-navigation/native";
// import HeaderBack from "@/component/HeaderBack";
// import color, { globalstyle } from "@/styles/global";
// import Button from "@/component/Button";
// import OTP from "@/component/Otp";
// import { OtpInput } from "react-native-otp-entry";

// /**
//  * Component for OTP verification with input handling and navigation
//  * @returns {JSX.Element} The rendered OtpVerificationScreen component
//  */
// const OtpVerificationScreen = () => {
//   /** Navigation object to handle screen transitions */
//   const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

//   /** Length of the OTP code */
//   const otpLength = 4;

//   /** State to store the OTP digits */
//   const [otp, setOtp] = useState(new Array(otpLength).fill(""));

//   /** References to the OTP input fields for focus management */
//   const inputRefs = useRef<TextInput[]>([]);

//   /**
//        * Handles changes in OTP input, including single digits and full OTP paste
//        * @param {string} text - The input text
//        * @param {number} index - The index of the input field
//        */
//   const handleChange = (text: string, index: number) => {
//     text = text.replace(/[^0-9]/g, "");

//     // Handle 4-digit paste (e.g., from clipboard)
//     if (text.length === otpLength) {
//       const newOtp = text.split("").slice(0, otpLength); // Split the 4-digit OTP into individual characters
//       setOtp(newOtp);
//       // Delay focus to ensure state update is reflected in UI
//       setTimeout(() => {
//         inputRefs.current[otpLength - 1]?.focus();
//       }, 0);
//       return;
//     }

//     // Handle single digit input (only allow 1 digit)
//     if (text.length > 1) {
//       text = text.slice(-1); // Take only the last digit if more than 1 digit is entered
//     }

//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);

//     if (text && index < otpLength - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

// /**
//      * Handles backspace key press to move focus to the previous input
//      * @param {any} e - The key press event
//      * @param {number} index - The index of the input field
//      */  const handleKeyPress = (e: any, index: number) => {
//     if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

// /**
//      * Verifies the entered OTP and navigates to the home screen if valid
//      */  const handleVerify = () => {
//     const otpCode = otp.join("");
//     if (otpCode.length === otpLength) {
//       Alert.alert("OTP Verified", `Entered OTP: ${otpCode}`);
//       navigation.navigate("Home");
//     } else {
//       Alert.alert("Invalid OTP", "Please enter all 4 digits.");
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // Adjust for iOS header
//     >
//       <View style={[styles.container, ]}>
//         <HeaderBack />
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//           keyboardShouldPersistTaps="handled" // Ensures taps on buttons work even with keyboard open
//         >
//           <View style={styles.innerContainer}>
//             <View style={[{flexDirection:"column",gap:32}]}>
//             <Text style={[styles.title, globalstyle.text_24_bold_90]}>OTP Verification</Text>
//             <View>
//             <Text style={[styles.subtitle, globalstyle.text_16_reg_40]}>
//               Enter the 4-digit code we have sent you.
//             </Text>
//             <View
//               style={{
//                 flexDirection: "row",
//                 gap: 1,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Text style={globalstyle.text_16_reg_100}>demo@gmail.com </Text>
//               <Image style={{ width: 20, height: 20 }} source={require("../assets/icons/editmail.png")} />
//             </View>
//             </View>
//             <OtpInput
//               numberOfDigits={4}
//               focusColor={color.charcol20}
//               onTextChange={(text) => console.log(text)}
//               autoFocus={false}
//               placeholder="0000"
//               type="numeric"
//               theme={{
//                 pinCodeTextStyle: {
//                   color: color.charcol40,
//                   fontSize: 16,
//                   fontWeight: '400',
//                   lineHeight: 20,
//                 },
//                 pinCodeContainerStyle: {
//                   backgroundColor: color.white,
//                   borderWidth: 0.5,
//                   borderColor: color.charcol20,
//                   width: 40,
//                   height: 40,
//                 },
//                 containerStyle: { gap: 16, flexDirection: 'row', justifyContent: 'center' },
//               }}
//             />
//             </View>
//             <View style={{ flexDirection: "column", gap: 16 }}>
//               <Text style={[styles.resendText, globalstyle.text_14_reg_40]}>
//                 Didn't receive the code?{" "}
//                 <Text style={globalstyle.text_14_bold_pur50}>Resend Code</Text>
//               </Text>
//               <Button variant="primary" onPress={handleVerify} title="Verify and Continue" />
//             </View>
//           </View>
//         </ScrollView>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// /**
//  * Styles for the OtpVerificationScreen component
//  * @type {Object}
//  */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: color.white,
//     paddingHorizontal:20
//   },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: "center",
//     paddingBottom: 20,
//   },
//   innerContainer: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   backButton: {
//     position: "absolute",
//     top: 20,
//     left: 20,
//   },
//   title: {
//     textAlign: "center",
//   },
//   subtitle: {
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "80%",
//     marginBottom: 20,
//     alignContent: "center",
//     alignSelf: "center",
//     alignItems: "center",
//     textAlign: "center",
//   },
//   otpInput: {
//     width: 50,
//     height: 50,
//     borderWidth: 1,
//     borderRadius: 10,
//     textAlign: "center",
//     fontSize: 22,
//     borderColor: "#ccc",
//   },
//   verifyButton: {
//     backgroundColor: "#7b51ff",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     width: "100%",
//   },
//   resendText: {
//     marginTop: 10,
//     textAlign: "center",
//   },
// });

// export default OtpVerificationScreen;

import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import HeaderBack from "@/component/HeaderBack";
import Button from "@/component/Button";
import { OtpInput } from "react-native-otp-entry";
import color, { globalstyle } from "@/styles/global";

/**
 * Component for OTP verification with input handling and navigation
 * @returns {JSX.Element} The rendered OtpVerificationScreen component
 */
const OtpVerificationScreen = () => {
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
  const otpLength = 4;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardOffset(Platform.OS === 'ios' ? event.endCoordinates.height + 20 : 25);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleChange = (text: string, index: number) => {
    text = text.replace(/[^0-9]/g, "");
    if (text.length === otpLength) {
      const newOtp = text.split("").slice(0, otpLength);
      setOtp(newOtp);
      setTimeout(() => {
        inputRefs.current[otpLength - 1]?.focus();
      }, 0);
      return;
    }
    if (text.length > 1) {
      text = text.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length === otpLength) {
      Alert.alert("OTP Verified", `Entered OTP: ${otpCode}`);
      navigation.navigate("Home");
    } else {
      Alert.alert("Invalid OTP", "Please enter all 4 digits.");
    }
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
                  <Text style={[styles.title, globalstyle.text_24_bold_90]}>OTP Verification</Text>
                  <View>
                    <Text style={[styles.subtitle, globalstyle.text_16_reg_40]}>
                      Enter the 4-digit code we have sent you.
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={globalstyle.text_16_reg_100}>demo@gmail.com </Text>
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={require("../assets/icons/editmail.png")}
                      />
                    </View>
                  </View>
                  <OtpInput
                    numberOfDigits={4}
                    focusColor={color.charcol20}
                    onTextChange={(text) => console.log(text)}
                    autoFocus={false}
                    placeholder="0000"
                    type="numeric"
                    theme={{
                      pinCodeTextStyle: {
                        color: color.charcol40,
                        fontSize: 16,
                        fontWeight: '400',
                        lineHeight: 20,
                      },
                      pinCodeContainerStyle: {
                        backgroundColor: color.white,
                        borderWidth: 0.5,
                        borderColor: color.charcol20,
                        width: 40,
                        height: 40,
                      },
                      containerStyle: { gap: 16, flexDirection: 'row', justifyContent: 'center' },
                    }}
                  />
                </View>
                <View style={{ flexDirection: "column", gap: 16, marginTop: 16 }}>
                  <Text style={[styles.resendText, globalstyle.text_14_reg_40]}>
                    Didn't receive the code?{" "}
                    <Text style={globalstyle.text_14_bold_pur50}>Resend Code</Text>
                  </Text>
                  <Button variant="primary" onPress={handleVerify} title="Verify and Continue" />
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
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 20, // Ensure content isn't cut off
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