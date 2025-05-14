import color from '@/styles/global';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';
import { AroundMeCardProps } from '@/types/type';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


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
const AroundMeCard: React.FC<AroundMeCardProps> = ({ name, age, location, image }) => {

    const [wink, setWink] = useState("wink")
    /** Navigation object to handle screen transitions */
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();




    const globalstyle = getGlobalStyles();
    const { isDarkMode } = useTheme();


    return (
        <TouchableOpacity onPress={() => navigation.navigate("UserDetails")} >
            <View style={[styles.card, !isDarkMode && globalstyle.border, { backgroundColor: isDarkMode ? colors.charcol80 : colors.white }]}>
                {/* User profile image */}
                <Image source={image} style={styles.image} />
                {/* User details container */}
                <View style={styles.textContainer}>
                    <Text style={[globalstyle.text_16_bold_90]}>{name}, {age}</Text>
                    {/* Location section */}
                    <View style={styles.locationbox} >
                        <Image source={require("../assets/icons/location.png")} style={styles.locationimg} />
                        <Text style={[globalstyle.text_14_reg_40]}>{location}</Text>
                    </View>
                    {/* Wink button */}
                    <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? colors.white : colors.charcol100 }]} onPress={() => setWink("winked")}>
                        <View style={styles.btncantainer} >
                            <Image source={require("../assets/icons/lightwight.png")} style={[styles.locationimg, { tintColor: isDarkMode ? colors.black : colors.white }]} />
                            <Text style={[globalstyle.text_14_reg_white, { color: isDarkMode ? colors.charcol100 : colors.white }]}>{wink}</Text>
                        </View>
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
        backgroundColor: color.charcol100,
        borderRadius: 40,
        alignItems: "center",
        width: "auto"
    },
});

export default AroundMeCard



