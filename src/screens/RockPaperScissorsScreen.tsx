import Button from '@/component/Button';
import color, { globalstyle } from '@/styles/global';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';
import { GameImages } from '@/types/type';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Animated, Easing } from 'react-native';

// Define types for the game state and moves
type GameState = 'initial' | 'waiting' | 'win' | 'lose';
type Move = 'Rock' | 'Paper' | 'Scissors';


/**
 * @function RockPaperScissorsScreen
 * @description A React component that implements a Rock Paper Scissors game, allowing users to select a move, play against a simulated opponent, and view the result.
 * @returns {JSX.Element} The Rock Paper Scissors game screen component
 */
const RockPaperScissorsScreen: React.FC = () => {



    //    State to track the current state of the game
    const [gameState, setGameState] = useState<GameState>('initial');

    // State to store the user's selected move
    const [userMove, setUserMove] = useState<Move>('Rock');

    // State to store the opponent's move
    const [opponentMove, setOpponentMove] = useState<Move | null>(null);

    //   State to store the result message to display
    const [resultMessage, setResultMessage] = useState<string>('Choose Your Move');


    // Object mapping each move to its corresponding image
    const images: GameImages = {
        Rock: require('../assets/images/Rock1.png'),
        Paper: require('../assets/images/Paper.png'),
        Scissors: require('../assets/images/Scissors.png'),
    };

    /**
         * @constant {Move[]} moves - Array of possible moves in the game
         */
    const moves: Move[] = ['Rock', 'Paper', 'Scissors'];


    /**
     * Determines the winner of the game based on the user's and opponent's moves
     * @param {Move} user - The user's selected move
     * @param {Move} opponent - The opponent's selected move
     * @returns {'win' | 'lose' | 'tie'} The result of the game
     */

    const determineWinner = (user: Move, opponent: Move): 'win' | 'lose' | 'tie' => {
        if (user === opponent) return 'tie';
        if (
            (user === 'Rock' && opponent === 'Scissors') ||
            (user === 'Paper' && opponent === 'Rock') ||
            (user === 'Scissors' && opponent === 'Paper')
        ) {
            return 'win';
        }
        return 'lose';
    };

    /**
         * Handles the user's move selection and simulates the opponent's move
         * @param {Move} move - The move selected by the user
         */

    const handleMoveSelection = (move: Move) => {
        setUserMove(move);
        setGameState('waiting');
        setResultMessage("Waiting for other player's move");

        // Simulate opponent's move after a delay
        setTimeout(() => {
            const randomMove: Move = moves[Math.floor(Math.random() * moves.length)];
            setOpponentMove(randomMove);

            setGameState((prev) => {
                const result = determineWinner(move, randomMove);
                if (result === 'win') {
                    setResultMessage('Wow! You Won, Drop That First Line!');
                    return 'win';
                } else if (result === 'lose') {
                    setResultMessage('Bummer! Your Opponent Got The First Line.');
                    return 'lose';
                } else {
                    setResultMessage("It's a tie! Choose Your Move.");
                    return 'initial';
                }
            });
        }, 2000); // 2-second delay
    };

    /**
     * Resets the game state to allow the user to play again
     */

    const playAgain = () => {
        setGameState('initial');
        setUserMove('Rock');
        setOpponentMove(null);
        setResultMessage('Choose Your Move');
    };

    const isInitialState = gameState === 'initial' && !opponentMove;
    /**
       * @constant {NavigationProp} navigation - Navigation object to handle screen transitions
       */
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);  // Correct useRef usage

    useEffect(() => {
        if (gameState === 'waiting') {
            animationRef.current = Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            );
            animationRef.current.start();
        } else {
            if (animationRef.current) {
                animationRef.current.stop();
                rotateAnim.setValue(0);
            }
        }

        return () => {
            if (animationRef.current) {
                animationRef.current.stop();
            }
        };
    }, [gameState]);

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const globalstyle = getGlobalStyles();
    const { isDarkMode } = useTheme();

    return (
        <View style={[styles.container, globalstyle.container]}>
            {/* Back Arrow */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Image style={{
                    width: 24, height: 24,
                    tintColor: isDarkMode ? colors.white : colors.black
                }} source={require("../assets/icons/backarrow.png")} />
            </TouchableOpacity>

            {/* Title and Description */}
            <Text style={[globalstyle.text_22_bold_90]}>Rock Paper Scissors</Text>
            <Text style={[styles.description, globalstyle.text_16_reg_50]}>
                The classic quick decision-maker game. Let's see who wins!
            </Text>

            {/* Image Area */}
            <View style={[styles.imageContainermain,]}>
                <View style={styles.imageContainer}>
                    <View style={styles.imageRow}>

                        {/* Opponent's Move (Left Side) - Show only after waiting */}

                        {opponentMove ? (
                            <Image source={images[opponentMove]} style={[styles.gameImagetop, { transform: [{ rotate: '180deg' }] }]} />
                        ) : (
                            <View style={styles.placeholder} />
                        )}

                        {userMove && (
                            <Image
                                source={images[userMove]}
                                style={[
                                    styles.gameImage,
                                    {
                                        height: isInitialState ? 190 : 130
                                    }
                                ]}
                            />
                        )}

                    </View>
                </View>

                {/* Move Selection Buttons */}
                <View style={[styles.buttonContainer]}>
                    {moves?.map((move) => (
                        <TouchableOpacity
                            key={move}
                            style={[
                                styles.moveButton,
                                userMove === move && styles.selectedButton,
                                gameState === 'waiting' && styles.disabledButton,
                            ]}
                            onPress={() => handleMoveSelection(move)}
                            disabled={gameState === 'waiting'}
                        >
                            <Text
                                style={[
                                    globalstyle.text_16_med_90,
                                    userMove === move && globalstyle.text_14_reg_white,
                                ]}
                            >
                                {move}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Result Message */}
            <View style={styles.resultContainer}>
                {gameState === 'waiting' ?
                    (
                        <View style={[styles.waitingContainer, { backgroundColor: isDarkMode ? colors.charcol100 : colors.charcol05 }]}>
                            <Animated.Image
                                source={require("../assets/icons/loader.png")}
                                style={[{
                                    width: 20,
                                    height: 20,
                                    transform: [{ rotate: rotateInterpolate }],


                                }, { tintColor: isDarkMode ? colors.white : colors.black }]}
                            />
                            <Text style={globalstyle.text_16_med_100}>{resultMessage}</Text>
                        </View>
                    ) : gameState === 'win' || gameState === 'lose' ? (
                        <View>
                            <Button style={{ paddingHorizontal: 16 }} title={resultMessage} onPress={playAgain} />
                            {
                                gameState === 'lose' && <Text style={[globalstyle.text_12_reg_50, { alignSelf: "center", marginTop: 8 }]}>But You're Still Cool</Text>
                            }

                        </View>
                    ) : (
                        <Text style={[styles.resultText, globalstyle.text_16_med_100, globalstyle.border]}>{resultMessage}</Text>

                    )}
            </View>

        </View>
    );
};

// Updated styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    backButton: {
        paddingVertical: 8,
        marginBottom: 16
    },
    description: {
        marginTop: 8,
        marginBottom: 20,
    },
    imageContainer: {
        backgroundColor: color.purple,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 16,

    },
    imageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 211,
        position: 'relative'
    },
    gameImagetop: {
        width: 123,
        height: 130,
        resizeMode: 'contain',
        marginHorizontal: 10,
        position: 'absolute',
        top: 0,
        right: 0,
    },
    gameImage: {
        width: 123,
        resizeMode: 'cover',
        marginHorizontal: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    placeholder: {
        width: 100,
        height: 75,
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 28,
        padding: 8,
        borderWidth: 1,
        borderColor: color.charcol10

    },
    moveButton: {
        borderRadius: 40,
        paddingVertical: 6,
        paddingHorizontal: 20,
    },
    selectedButton: {
        backgroundColor: color.charcol100,
    },
    disabledButton: {
        opacity: 0.5,
    },

    resultContainer: {
        paddingTop: 32,
        alignItems: 'center',
    },
    waitingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: color.charcol10,
        gap: 16,
        borderRadius: 12,
        padding: 16
    },
    resultText: {
        textAlign: 'center',
        marginLeft: 10,
        paddingHorizontal: 32,
        paddingVertical: 16,
        width: "100%",
        borderRadius: 12
    },

    imageContainermain: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: color.charcol20
    }
});

export default RockPaperScissorsScreen;