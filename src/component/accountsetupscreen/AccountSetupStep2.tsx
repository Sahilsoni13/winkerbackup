import React, { useState, useRef, useEffect } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    PermissionsAndroid,
    Platform,
    Alert,
    Linking,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    Easing,
} from 'react-native-reanimated';
import { CircularProgress } from 'react-native-circular-progress';
import Svg, { Circle } from 'react-native-svg';
import { colors, getGlobalStyles } from '@/styles/globaltheme';


/**
 * Component for the second step of account setup, handling profile picture upload and aura description
 * @returns {JSX.Element} The rendered account setup step 2 component
 */
const AccountSetupStep2: React.FC = () => {
    //    State to store the user's aura description
    const [aura, setAura] = useState<string>('');

    // State to store the URI of the selected profile image
    const [image, setImage] = useState<string | null>(null);

    // State to track if an image is currently being uploaded
    const [uploading, setUploading] = useState<boolean>(false);

    // State to track the upload progress percentage
    const [progress, setProgress] = useState<number>(0);

    // Ref to track the current progress value for the upload simulation
    const progressRef = useRef<number>(0);

    // Shared value for animating the border width
    const borderProgress = useSharedValue(0);

    // Shared value for animating the rotation of the border
    const rotation = useSharedValue(0);


    /**
     * Effect hook to start the rotation animation when uploading or after an image is selected
     */
    useEffect(() => {
        if (uploading || image) {
            rotation.value = 0; // Reset rotation
            rotation.value = withRepeat(
                withTiming(360, {
                    duration: 2000, // Rotate 360 degrees over 2 seconds
                    easing: Easing.linear,
                }),
                -1, // Repeat indefinitely
                false, // Do not reverse
            );
        }
    }, [uploading, image]);


    /**
     * Animated style for the border width animation
     * @returns {Object} Animated style object
     */
    const animatedBorder = useAnimatedStyle(() => ({
        borderWidth: withTiming(borderProgress.value * 4, { duration: 500 }),
        // borderColor: uploading ? 'white' : image ? 'white' : '#934DFF', // Blue during upload, purple after upload
    }));

    /**
     * Animated style for the SVG circle rotation
     * @returns {Object} Animated style object
     */
    const animatedCircleStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));


    /**
     * Checks if gallery access permission is already granted
     * @returns {Promise<boolean>} True if permission is granted, false otherwise
     */
    const checkGalleryPermission = async (): Promise<boolean> => {
        try {
            const permission =
                Number(Platform.Version) >= 33
                    ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
                    : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

            const result = await PermissionsAndroid.check(permission);
            console.log('Permission check result:', result);
            return result;
        } catch (err) {
            console.warn('Error checking gallery permission:', err);
            return false;
        }
    };

    /**
        * Requests gallery access permission from the user
        * @returns {Promise<boolean>} True if permission is granted, false otherwise
        */
    const requestGalleryPermission = async (): Promise<boolean> => {
        try {
            if (Platform.OS === 'android') {
                const permission =
                    Number(Platform.Version) >= 33
                        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
                        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

                const granted = await PermissionsAndroid.request(permission, {
                    title: 'Gallery Access Permission',
                    message: 'We need access to your gallery to select a profile picture.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                });

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Gallery permission granted');
                    return true;
                } else {
                    console.log('Gallery permission denied:', granted);
                    Alert.alert(
                        'Permission Denied',
                        'Please grant gallery access to select a profile picture. You can enable this permission in the app settings.',
                        [
                            { text: 'Cancel', style: 'cancel' },
                            {
                                text: 'Open Settings',
                                onPress: () => Linking.openSettings(),
                            },
                        ],
                    );
                    return false;
                }
            }
            // For iOS, react-native-image-picker handles permissions automatically
            return true;
        } catch (err) {
            console.warn('Error requesting gallery permission:', err);
            Alert.alert(
                'Error',
                'Failed to request gallery permission. Please enable it manually in the app settings.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Open Settings',
                        onPress: () => Linking.openSettings(),
                    },
                ],
            );
            return false;
        }
    };


    /**
      * Opens the image picker to select a profile picture from the gallery
      */
    const pickImage = async () => {
        // First, check if permission is already granted
        const hasPermission = await checkGalleryPermission();
        if (!hasPermission) {
            // If permission is not granted, request it
            const granted = await requestGalleryPermission();
            if (!granted) {
                console.log('Permission not granted, cannot open gallery');
                return;
            }
        }

        const options: ImagePicker.ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: false,
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error:', response.errorCode, response.errorMessage);
                Alert.alert('Error', `Failed to open gallery: ${response.errorMessage}`);
            } else if (response.assets && response.assets.length > 0) {
                const imageUri = response.assets[0].uri;
                if (imageUri) {
                    console.log('Image selected:', imageUri);
                    setUploading(true);
                    setProgress(0);
                    progressRef.current = 0;
                    borderProgress.value = 1; // Show border during upload

                    const uploadInterval = setInterval(() => {
                        progressRef.current += 20;
                        setProgress(progressRef.current);
                        if (progressRef.current >= 100) {
                            clearInterval(uploadInterval);
                            setImage(imageUri);
                            setUploading(false);
                            borderProgress.value = 1; // Keep border after upload
                        }
                    }, 500);
                } else {
                    console.log('No image URI found in response');
                }
            } else {
                console.log('No assets found in response');
            }
        });
    };



    const globalstyle = getGlobalStyles();
    return (
        <View style={styles.content}>
            <Text style={[styles.title, globalstyle.text_22_bold_90]}>Add Your Photo & Aura!</Text>
            <View style={styles.imgContainer}>
                <View style={styles.profilePic}>
                    <Text style={[styles.subText, globalstyle.text_14_reg_100]}>Choose Your Profile Picture</Text>
                    <Image
                        style={styles.warningIcon}
                        source={require('../../assets/icons/warning.png')}
                    />
                </View>
                <TouchableOpacity onPress={pickImage}>
                    <View style={styles.photoContainerWrapper}>
                        <Animated.View style={[styles.photoContainer, animatedBorder]}>
                            {uploading ? (
                                <CircularProgress
                                    size={160}
                                    width={10}
                                    fill={progress}
                                    tintColor="#934DFF"
                                    backgroundColor="#F5F2FF"
                                />
                            ) : image ? (
                                <Image source={{ uri: image }} style={styles.profileImage} />
                            ) : (
                                <Image
                                    style={styles.addIcon}
                                    source={require('../../assets/icons/add.png')}
                                />
                            )}
                        </Animated.View>
                        {(uploading || image) && (
                            <Animated.View style={[styles.borderSvg, animatedCircleStyle]}>
                                <Svg height="164" width="164" viewBox="0 0 164 164">
                                    <Circle
                                        cx="82"
                                        cy="82"
                                        r="80"
                                        fill="none"
                                        stroke={uploading ? '#F5F2FF' : '#934DFF'}
                                        strokeWidth="4"
                                        strokeDasharray="502"
                                        strokeDashoffset="0"
                                    />
                                </Svg>
                            </Animated.View>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={[styles.subText, globalstyle.text_14_reg_100]}>What's your Aura? ✨</Text>
            <TextInput
                style={[styles.textArea, globalstyle.text_16_reg_50]}
                placeholder="Your Aura is your energy. Use it to introduce yourself in short."
                value={aura}
                placeholderTextColor={colors.charcol50}
                onChangeText={setAura}
                multiline
            />
        </View>
    );
};


/**
 * @constant {Object} styles - Defines the styles for the AccountSetupStep2 component
 */
const styles = StyleSheet.create({
    title: { textAlign: 'left' },
    subText: { textAlign: 'center' },
    warningIcon: { width: 20, height: 20 },
    imgContainer: { marginVertical: 30, alignItems: 'center' },
    profilePic: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 6,
    },
    content: { flex: 1, },
    photoContainerWrapper: {
        position: 'relative',
        borderWidth: 1,
        borderColor: colors.charcol20,
        borderRadius: 100
    },
    photoContainer: {
        width: 160,
        height: 160,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
    },
    borderSvg: {
        position: 'absolute',
        top: -2,
        left: -2,
    },
    profileImage: { width: '100%', height: '100%', borderRadius: 100 },
    addIcon: { width: 20, height: 20 },
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

export default AccountSetupStep2;