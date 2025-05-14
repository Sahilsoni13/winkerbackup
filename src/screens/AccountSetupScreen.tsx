import AccountSetupStep1 from '@/component/accountsetupscreen/AccountSetupStep1';
import AccountSetupStep2 from '@/component/accountsetupscreen/AccountSetupStep2';
import AccountSetupStep3 from '@/component/accountsetupscreen/AccountSetupStep3';
import WelComeAnimation from '@/component/accountsetupscreen/WelComeAnimation';
import Button from '@/component/Button';
import color, { globalstyle } from '@/styles/global';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

const AccountSetupScreen = () => {



  /** Current step of the form */
  const [step, setStep] = useState<number>(1);

  /** Total number of steps in the form */
  const totalSteps = 4;

  /** Number of pagination dots */
  const totalDots = 3;

  // Navigation object to handle screen transitions.
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

  const [keyboardOffset, setKeyboardOffset] = useState(0);

  /**
  * Handles the "Next" button click.
  * Increments the step count if it is less than totalSteps.
  */
  const handleNext = () => {
    if (step === 4) {
      navigation.navigate('MainTab');
    } else
      if (step < totalSteps) {
        setStep(step + 1);
      }

  };


  /**
  * Handles the "Back" button click.
  * If the step is 1, navigates to the previous screen.
  * Otherwise, decrements the step count.
  */
  const handleBack = () => {
    if (step === 1) {
      navigation.goBack();
    } else if (step > 1) {
      setStep(step - 1);
    }
  }


  /**
 * Renders pagination dots based on the current step.
 * @returns {JSX.Element[]} An array of View components representing the pagination dots.
 */
  const renderPaginationDots = () => {
    const dots = [];
    for (let i = 1; i <= totalDots; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            i <= step ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      );
    }
    return dots;
  };

  /**
   * Renders content for each step in the form.
   * @returns {JSX.Element | null} JSX content for the current step
   */
  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <AccountSetupStep1 />
        );
      case 2:
        return (
          <AccountSetupStep2 />
        );
      case 3:
        return (
          <AccountSetupStep3 />
        );
      case 4:
        return (
          <>
            <WelComeAnimation />
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (event) => {
      setKeyboardOffset(Platform.OS === "ios" ? event.endCoordinates.height + 20 : 40);
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardOffset}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={[{
            paddingHorizontal: 20, paddingTop: 16,
            backgroundColor: isDarkMode ? colors.charcol100 : colors.white
          }]}>
            {/* Top Bar - Hide on Step 4 */}
            {step !== 4 && (
              <>

                <View style={styles.topBar}>
                  <TouchableOpacity onPress={handleBack} >
                    <Image style={{ width: 24, height: 24, tintColor: isDarkMode ? colors.white : colors.black }} source={require("../assets/icons/backarrow.png")} />
                  </TouchableOpacity>
                  <Text style={globalstyle.text_24_bold_90}>Account Setup</Text>
                  <View style={styles.emptySpace} />
                </View>

                {/* Pagination Dots - Hide on Step 4 */}
                <View style={styles.pagination}>
                  {renderPaginationDots()}
                </View>

              </>
            )}
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.container, globalstyle.container]}>
              {/* Content */}
              {renderContent()}

              {/* Bottom Button */}
              <View style={[step === totalSteps && { display: "none" }, { paddingTop: 20 }]}>
                <Button
                  title={step === totalSteps ? 'Start' : 'Next'}
                  variant='outlined'
                  rightIcon={step === totalSteps ? undefined : require("../assets/icons/rightarrow.png")}
                  onPress={handleNext}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 20
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  emptySpace: {
    width: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 28.5,
  },
  dot: {
    width: 100,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: color.purple50,
  },
  inactiveDot: {
    backgroundColor: color.purple05,
  },
  contentstartscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    paddingTop: 12,
    paddingHorizontal: 27,
    textAlign: 'center'
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default AccountSetupScreen;
