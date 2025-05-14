

import color, { globalstyle } from '@/styles/global';
import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * @typedef {Object} HousePartyCardProps
 * @property {string} name - The name of the party.
 * @property {string} location - The location of the party.
 * @property {ImageSourcePropType} image - The image source for the party.
 */

type HousePartyCardProps = {
    name: string;
    location: string;
    image: ImageSourcePropType;
    onPress?: () => void
};

/**
 * HousePartyCard Component
 * Displays details of a house party, including its name, location, image, and a join button.
 *
 * @param {HousePartyCardProps} props - The component props.
 * @returns {JSX.Element} A styled card component displaying party details.
 */

const HousePartyCard: React.FC<HousePartyCardProps> = ({ name, location, image, onPress }) => {

    return (
        <View style={[styles.card, globalstyle.border]}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} />
                <View style={styles.cardUpdates}>
                    <Text style={[globalstyle.text_12_reg_90, { lineHeight: 13 }]}>Social</Text>
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={[globalstyle.text_16_bold_90]}>{name}</Text>
                <Text style={[styles.location, globalstyle.text_14_reg_40]}>{location}</Text>
                <TouchableOpacity onPress={onPress} style={styles.button}>
                    <View style={styles.btncantainer} >
                        <Image source={require("../assets/icons/addwhite.png")} style={styles.locationimg} />
                        <Text style={[globalstyle.text_14_reg_white]}> Join Party</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    imageContainer: {
        position: 'relative'
    },
    cardUpdates: {
        position: "absolute",
        top: 5,
        left: 5,
        backgroundColor: color.charcol05,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    image: {
        width: 98,
        height: 98,
        borderRadius: 10
    },
    locationimg: {
        width: 16,
        height: 16
    },
    card: {
        flexDirection: "row",
        padding: 8,
        backgroundColor: color.white,
        borderRadius: 16,
        alignItems: "center",
        gap: 15
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

    name: {
        fontSize: 16,
        fontWeight: "bold"
    },
});



export default HousePartyCard
