import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GameCardProps } from '@/types/type';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';


/**
 * @function GameCard
 * @description A React component that renders a clickable card for a game, displaying an image, title, and description, with navigation to a specified screen.
 * @param {GameCardProps} props - The props for the GameCard component
 * @param {string} props.title - The title of the game
 * @param {string} props.description - A brief description of the game
 * @param {ImageSourcePropType} props.image - The source of the game image
 * @param {string} props.backgroundColor - The background color of the image container
 * @param {string} props.screenName - The name of the screen to navigate to when the card is pressed
 * @returns {JSX.Element} The game card component
 */
const GameCard: React.FC<GameCardProps> = ({ title, description, image, backgroundColor, screenName }) => {
    // Navigation object to handle screen transitions
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>(); // ✅ Hook inside component
    const globalstyle = getGlobalStyles();
    const { isDarkMode } = useTheme();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(screenName as never)}>
            <View style={[styles.card, !isDarkMode && globalstyle.border, { backgroundColor: isDarkMode ? colors.charcol80 : colors.white }]}>
                <View style={[styles.imagebox, { backgroundColor }]} >
                    <Image source={image} style={styles.cardImage} />
                </View>
                <View style={styles.cardTextContainer}>
                    <Text style={[styles.cardTitle, globalstyle.text_16_bold_90]}>{title}</Text>
                    <Text style={globalstyle.text_14_reg_40}>{description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

/**
 * @constant {Object} styles - Defines the styles for the GameCard component
 */
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderRadius: 16,
        padding: 8,
        marginBottom: 8,
        gap: 16,
        alignItems: 'center',
    },
    cardImage: {
        // maxWidth: 120,
        width: "100%",
        height: "100%",
        marginRight: 15,
        objectFit: "contain"
    },
    cardTextContainer: {
        flex: 1,
    },
    cardTitle: {
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 14,
        color: colors.charcol40,
        fontFamily: "Inter_18pt-Regular"
    },
    imagebox: {
        width: 120,
        height: 120,
        justifyContent: "center",
        alignContent: "center",
        alignSelf: "center",
        borderRadius: 12
    }
});

export default GameCard;
