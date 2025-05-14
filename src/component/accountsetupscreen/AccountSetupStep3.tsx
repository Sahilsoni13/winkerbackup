import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import NotificationToggle from '../NotificationToggle'
import Checkbox from '../Checkbox'
import { useTheme } from '@/ThemeContext'
import { colors, getGlobalStyles } from '@/styles/globaltheme'

/**
 * Component for the third step of account setup, handling key feature toggles and terms acceptance
 * @returns {JSX.Element} The rendered account setup step 3 component
 */

const AccountSetupStep3 = () => {

  /** State to track whether terms and services are accepted */
  const [accepted, setAccepted] = useState<boolean>(false);
  const { isDarkMode } = useTheme();
  const globalstyle = getGlobalStyles();
  const [location, setLocation] = useState<boolean>(false)
  const [notification, setNotification] = useState<boolean>(false)

  return (
    <View style={styles.content}>
      <Text style={[styles.subHeader, globalstyle.text_22_bold_90]}>Enable Key Features</Text>
      <View style={styles.Termskeyfeatures}>
        <View style={styles.keyfeaturescantainer}>
          <NotificationToggle
            title={"Location"}
            description={"Location access is required to connect you with people nearby and ensure the app functions properly."}
            iconSource={require("@/assets/icons/location.png")}
            isEnabled={location}
            onToggle={() => {
              setLocation(!location)
            }}
          />
          <NotificationToggle
            title={"Notification"}
            description={"Location access is required to connect you with people nearby and ensure the app functions properly."}
            iconSource={require("@/assets/icons/notificationicon.png")}
            isEnabled={notification}
            onToggle={() => {
              setNotification(!notification)
            }}
          />
        </View>
        <TouchableOpacity onPress={() => setAccepted(!accepted)} style={styles.acceptTerms} >
          <Checkbox bordercolor={isDarkMode ? colors.charcol20 : colors.black} checked={accepted} onPress={() => setAccepted(!accepted)} />
          <View style={styles.textContainer}>
            <Text style={[globalstyle.text_14_bold_100, { paddingBottom: 8 }]}>Terms And Service</Text>
            <Text style={globalstyle.text_12_reg_50}>
              Review and accept our terms and services to continue using the app securely and responsibly.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

/**
 * Styles for the AccountSetupStep3 component
 * @type {Object}
 */
const styles = StyleSheet.create({
  keyfeaturescantainer: {
    flexDirection: "column",
    gap: 24.5
  },
  content: {
    flex: 1,
  },
  subHeader: {
    marginBottom: 32,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  acceptTerms: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  Termskeyfeatures: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between'
  }
});

export default AccountSetupStep3
