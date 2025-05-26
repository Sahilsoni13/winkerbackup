import { useApi } from '@/hook/useApi';
import { fetchReceivedWinks } from '@/redux/slices/winkerSlice';
import { AppDispatch } from '@/redux/store';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';
import { AroundMeCardProps, WinkReceiveCardProps } from '@/types/type';
import { getCityFromLocationString } from '@/utils/getCityFromLocation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, } from 'react-redux';


/**
 * Component displaying user profile information in a card format with navigation to user details
 * @param {AroundMeCardProps} props - Component props
 * @param {string} props.name - User's name
 * @param {number} props.age - User's age
 * @param {string} props.location - User's location
 * @param {ImageSourcePropType} props.image - User's profile image source
 * @param {string} props.wink - Text for the wink button
 * @returns {JSX.Element} The rendered AroundMeCard component
 */
const WinkReceiveCard: React.FC<WinkReceiveCardProps> = ({ name, age, location, image, senderId, id, status }) => {
    // const  = useSelector();
    /** Navigation object to handle screen transitions */
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const globalstyle = getGlobalStyles();
    const { isDarkMode } = useTheme();
    const { mutate: createWink, data, isPending: loading } = useApi();
    const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch


    const handleCreateWink = () => {
        createWink(
            {
                url: '/winks/accept',
                method: 'POST',
                data: {
                    winkId: id
                },
                showToast: true,
            },
            {
                onSuccess: (response) => (
                    console.log(response.data.game),
                    dispatch(fetchReceivedWinks()).finally(() => {
                    }),
                    navigation.navigate("Games", {
                        gameId: response.data.game.id
                    })
                ),
                onError: (err) => (console.log(err))
            }
        );
    };
    const city = getCityFromLocationString(location);
    return (
        <TouchableOpacity onPress={() => navigation.navigate("UserDetails", { id: senderId })}>
            <View style={[styles.card, !isDarkMode && globalstyle.border, { backgroundColor: isDarkMode ? colors.charcol80 : colors.white }]}>
                {/* User profile image */}
                <Image source={image} style={styles.image} />
                {/* User details container */}
                <View style={styles.textContainer}>
                    <Text style={[globalstyle.text_16_bold_90, { textTransform: "capitalize" }]}>{name}, {age}</Text>
                    {/* Location section */}
                    <View style={styles.locationbox} >
                        <Image source={require("../assets/icons/location.png")} style={[styles.locationimg, { tintColor: isDarkMode ? colors.white : colors.black }]} />
                        <Text style={[globalstyle.text_14_reg_40]}>{city || "Unknown"}</Text>
                    </View>
                    {/* Wink button */}
                    <TouchableOpacity disabled={status === "Winked" && true} style={[styles.button, { backgroundColor: isDarkMode ? colors.white : colors.charcol100 }]} onPress={handleCreateWink} >
                        {
                            loading ?
                                <View style={styles.btncantainer}>
                                    <ActivityIndicator color={colors.white} />
                                    <Text style={[globalstyle.text_14_reg_white, { color: isDarkMode ? colors.charcol100 : colors.white }]}>Sending</Text>
                                </View>
                                :
                                <View style={styles.btncantainer} >
                                    <Image source={require("../assets/icons/lightwight.png")} style={[styles.locationimg, { tintColor: isDarkMode ? colors.black : colors.white }]} />
                                    <Text style={[globalstyle.text_14_reg_white, { color: isDarkMode ? colors.charcol100 : colors.white }]}>{status}</Text>
                                </View>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

/**
 * Styles for the AroundMeCard component
 * @type {Object}
 */

const styles = StyleSheet.create({
    locationimg: {
        width: 16,
        height: 16
    },
    locationbox: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        marginTop: 4,
        marginBottom: 8
    },
    card: {
        flexDirection: "row",
        padding: 8,
        backgroundColor: "white",
        borderRadius: 16,
        alignItems: "center",
        gap: 15
    },
    image: {
        width: 98,
        height: 98,
        borderRadius: 10
    },
    textContainer: {
        flex: 1,
        marginLeft: 10
    },
    location: {
        marginTop: 4,
        marginBottom: 8
    },
    btncantainer: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    button: {
        alignSelf: "flex-start",
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: colors.charcol100,
        borderRadius: 40,
        alignItems: "center",
        width: "auto"
    },
});

export default WinkReceiveCard



