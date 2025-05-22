
import AroundMeCardSkeleton from '@/component/skeletons/AroundMeCardSkeleton';
import WinkReceiveCard from '@/component/WinkReceiveCard';
import { useApi } from '@/hook/useApi';
import color from '@/styles/global';
import { getGlobalStyles } from '@/styles/globaltheme';
import { WinkReceiveCardProps } from '@/types/type';
import React, { useEffect, useState, useCallback } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native';

const imageMap: { [key: string]: any } = {
    'cardimg1.png': require('../assets/images/cardimg1.png'),
    'cardimg2.png': require('../assets/images/cardimg2.png'),
    'cardimg3.png': require('../assets/images/cardimg3.png'),
    'cardimg4.png': require('../assets/images/cardimg4.png'),
};

const Winks = () => {
    const globalstyle = getGlobalStyles();
    const [winks, setWinks] = useState<WinkReceiveCardProps[]>([]);
    const { mutate: fetchWink, isPending: loading } = useApi();
    const [refreshing, setRefreshing] = useState(false);

    const loadWinks = useCallback(() => {
        fetchWink(
            {
                url: '/winks/received',
                method: 'GET',
                showToast: true,
            },
            {
                onSuccess: (response) => {
                    const winkData = Array.isArray(response.data) ? response.data : [];
                    setWinks(winkData);
                    setRefreshing(false);
                },
                onError: (err) => {
                    console.log('Error fetching winks:', err.message);
                    setRefreshing(false);
                },
            }
        );
    }, [fetchWink]);

    useEffect(() => {
        loadWinks();
    }, [loadWinks]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadWinks();
    }, [loadWinks]);

    return (
        <View style={[styles.container, globalstyle.container]}>
            <Text style={[globalstyle.text_16_bold_90, styles.heading]}>People who wink at you</Text>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {loading && !refreshing ? (
                    <AroundMeCardSkeleton />
                ) : winks.length <= 0 ? (
                    <View style={styles.noWinksContainer}>
                        <Image source={require('../assets/images/noitem.png')} style={styles.noWinksImage} />
                        <Text style={[globalstyle.text_22_reg_40, { maxWidth: 205, textAlign: 'center' }]}>
                            No Winks Yet. Keep Exploring.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.cardContainer}>
                        {winks.map((person, index) => (
                            <WinkReceiveCard
                                key={index}
                                name={"name"}
                                firstName={"name"}
                                age={15}
                                senderId={person.senderId}
                                id={person.id}
                                location={"abohar"}
                                status={person.isAccepted ? "Winked" : "Wink back"}
                                image={require("@/assets/images/cardimg2.png")}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        paddingTop: 16,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 16,
    },
    cardContainer: {
        flexDirection: 'column',
        gap: 16,
    },
    heading: {
        paddingBottom: 16,
    },
    noWinksContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    noWinksImage: {
        width: 60,
        height: 60,
        marginBottom: 16,
    },
});

export default Winks;
