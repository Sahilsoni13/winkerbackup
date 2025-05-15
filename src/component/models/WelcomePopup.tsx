import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native';
import Button from '../Button';
import { PopupProps } from '@/types/type';
import SuccessAnimation from '../SuccessAnimation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { globalstyle } from '@/styles/global';
import { getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';


/**
 * @function WelcomePopup
 * @description A React component that renders a welcome popup modal with options to start exploring or keep exploring.
 * @param {PopupProps} props - The props for the WelcomePopup component
 * @param {boolean} props.visible - Controls the visibility of the modal
 * @param {() => void} props.onClose - Callback function to close the modal
 * @returns {JSX.Element} The welcome popup modal component
 */

const WelcomePopup: React.FC<PopupProps> = ({ visible, onClose, success, callback }) => {
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const globalstyle = getGlobalStyles();
    const { isDarkMode } = useTheme();
    return (
        <Modal transparent visible={visible} animationType="fade">
            <Pressable style={styles.overlay} onPress={onClose}>
                <View style={[styles.popup,globalstyle.container]}>
                    <Text style={[styles.title, globalstyle.text_24_bold_90]}>🎉 Hurray! You're In!</Text>
                    <Text style={[styles.description, globalstyle.text_16_reg_50]}>
                        Welcome to the party! Start exploring, make connections, and let the fun begin.
                    </Text>
                    <Button onPress={() => { navigation.navigate("ChatBubble"), onClose() }} style={{
                        width: "100%",
                        marginBottom: 8
                    }} title="Let's Go" variant='primary'>

                    </Button>
                    <Button onPress={onClose} style={{ width: "100%" }} title='Keep Exploring' variant='outlined' />
                </View>
                <View style={{ position: "absolute", bottom: 0 }}>
                    {visible === true && (
                        <SuccessAnimation />
                    )}
                </View>

            </Pressable>
        </Modal>
    );
};

/**
 * @constant {Object} styles - Defines the styles for the WelcomePopup component
 */

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        padding: 24,
        paddingTop: 52,
        borderRadius: 10,
        alignItems: 'center',
        width: 335,
        position: "relative"
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        textAlign: 'center',
        marginBottom: 20,
    },
    primaryButton: {
        backgroundColor: '#8B5CF6',
        paddingVertical: 10,
        width: '100%',
        borderRadius: 5,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    secondaryButton: {
        marginTop: 10,
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    secondaryButtonText: {
        fontSize: 16,
        color: '#333',
    },
});

export default WelcomePopup;
