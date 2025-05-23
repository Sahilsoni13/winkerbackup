import GameCard from '@/component/GameCard';
import { useApi } from '@/hook/useApi';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

/**
 * Component displaying a list of interactive games for user selection
 * @returns {JSX.Element} The rendered Games component
 */
const Games = () => {

    /** Placeholder images for game cards */
    const gameImages = {
        rockPaperScissors: require('../assets/images/RockPaper.png'),
        throwDart: require('../assets/images/ThrowDart.png'),
        spinTheWheel: require('../assets/images/SpintheWheel.png'),
    };


    /** Data array defining the games to display */
    const games = [
        {
            title: 'Rock Paper Scissors',
            description: 'The classic quick decision-maker game.',
            image: gameImages.rockPaperScissors,
            backgroundColor: colors.purple,
            screen: "RockPaperScissorsScreen",
        },
        {
            title: 'Throw Dart',
            description: 'Take your aim and throw the dart.',
            image: gameImages.throwDart,
            backgroundColor: colors.skyblue,
            screen: "ThrowDartScreen",
        },
        {
            title: 'Spin the Wheel',
            description: 'Spin the wheel and choose a fun challenge.',
            image: gameImages.spinTheWheel,
            backgroundColor: colors.darkpurple,
            screen: "SpinTheWheelScreen",
        },
    ];

    const { mutate: fetchGames, isPending: loading, data } = useApi();

    useEffect(() => {
        fetchGames(
            {
                method: "GET",
                url: "/games",
                showToast: true
                
            },
            {
                onSuccess: (response) => (
                    console.log(response.data, "response")
                ),
                onError: (err) => (
                    console.log(err, "error")
                )
            }
        )
    }, [])

    const globalstyle = getGlobalStyles();

    return (
        <View style={[styles.container, globalstyle.container]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.container}>
                    <Text style={[globalstyle.text_22_bold_90]}>Choose a Game 🎮</Text>
                    <Text style={[styles.subtitle, globalstyle.text_16_reg_50]}>Find the perfect way to break the ice and have fun!</Text>
                    {/* Game Cards */}
                    {games && games?.map((game, index) => (
                        <GameCard
                            key={index}
                            title={game.title}
                            description={game.description}
                            image={game.image}
                            backgroundColor={game.backgroundColor}
                            screenName={game.screen}
                        />
                    ))}

                </View>
            </ScrollView>
        </View>
    );
};
/**
 * Styles for the Games component
 * @type {Object}
 */
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingTop: 16
    },
    container: {
        flex: 1,
    },
    subtitle: {
        marginTop: 8,
        marginBottom: 20,
    },
});

export default Games;