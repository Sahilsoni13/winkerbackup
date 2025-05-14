import AroundMeCard from '@/component/AroundMeCard';
import color, { globalstyle } from '@/styles/global';
import { getGlobalStyles } from '@/styles/globaltheme';
import { AroundMeCardProps } from '@/types/type';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

/**
 * @constant {Object} imageMap - Maps image filenames to their required image sources
 * @type {{ [key: string]: any }}
 */

const imageMap: { [key: string]: any } = {
    "cardimg1.png": require("../assets/images/cardimg1.png"),
    "cardimg2.png": require("../assets/images/cardimg2.png"),
    "cardimg3.png": require("../assets/images/cardimg3.png"),
    "cardimg4.png": require("../assets/images/cardimg4.png"),
};


/**
 * @function Winks
 * @description A React component that displays a list of people who have winked at the user, with a fallback UI if there are no winks.
 * @returns {JSX.Element} The Winks screen component
 */

const Winks = () => {

    /**
     * @constant {AroundMeCardProps[]} aroundMeData - Array of data for people who have winked at the user
     */
    const aroundMeData: AroundMeCardProps[] = [
        { name: "Emma", age: 27, location: "New York, NY", image: imageMap["cardimg1.png"], wink: "Wink Back" },
        { name: "Tyler", age: 24, location: "New York, NY", image: imageMap["cardimg2.png"], wink: "Wink Back" },
        { name: "Emma", age: 27, location: "New York, NY", image: imageMap["cardimg1.png"], wink: "Wink Back" },
        { name: "Maya", age: 20, location: "New York, NY", image: imageMap["cardimg3.png"], wink: "Wink Back" },
        { name: "Emma", age: 27, location: "New York, NY", image: imageMap["cardimg1.png"], wink: "Wink Back" },
        { name: "Maya", age: 20, location: "New York, NY", image: imageMap["cardimg3.png"], wink: "Wink Back" },
        { name: "Tyler", age: 24, location: "New York, NY", image: imageMap["cardimg2.png"], wink: "Wink Back" },
        { name: "Emma", age: 27, location: "New York, NY", image: imageMap["cardimg1.png"], wink: "Wink Back" },
        { name: "Maya", age: 20, location: "New York, NY", image: imageMap["cardimg3.png"], wink: "Wink Back" },
    ];

    const globalstyle = getGlobalStyles();
    return (
        <View style={[styles.container, globalstyle.container]}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Text style={[globalstyle.text_16_bold_90, styles.heading]}>People who wink at you</Text>
                {aroundMeData?.length === 0 ? (
                    <View style={styles.noWinksContainer}>
                        <Image source={require("../assets/images/noitem.png")} style={styles.noWinksImage} />
                        <Text style={[globalstyle.text_22_reg_40, { maxWidth: 205, textAlign: "center" }]}>No Winks Yet. Keep Exploring.</Text>
                    </View>
                ) : (
                    <View style={styles.cardContainer}>
                        {aroundMeData.map((person, index) => (
                            <AroundMeCard
                                key={index}
                                name={person.name}
                                age={person.age}
                                location={person.location}
                                image={person.image}
                                wink={person.wink}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );

};


/**
 * @constant {Object} styles - Defines the styles for the Winks component
 */


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 16
    },
    cardContainer: {
        flexDirection: "column",
        gap: 16,
    },
    heading: {
        paddingBottom: 16,
    },
    noWinksContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    noWinksImage: {
        width: 60,
        height: 60,
        marginBottom: 16,
    },
});


export default Winks;
