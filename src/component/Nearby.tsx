

import { useApi } from '@/hook/useApi';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl } from 'react-native';
import Toast from 'react-native-toast-message';
import AroundMeCardSkeleton from './skeletons/AroundMeCardSkeleton';
import AroundMeCard from './AroundMeCard';
import axios from 'axios';

// Type for the nearby user response
type NearbyUser = {
    id: string;
    firstName: string;
    birthDate: string;
    location: { latitude: number; longitude: number };
    city?: string;
    profilePictureUrl: string

};

// Type for Nominatim response (simplified)
type GeocodeResponse = {
    address: {
        city?: string;
        town?: string;
        village?: string;
    };
};

// Props type for the component
type NearbyUsersScreenProps = {
    radius?: number; // Optional radius prop with default value
};
const NearbyUsersScreen: React.FC<NearbyUsersScreenProps> = ({ radius = 1000 }) => {
    const { mutate, isPending, isError, isSuccess, error } = useApi();
    const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([]);
    const [isCityFetching, setIsCityFetching] = useState(false); // New state for city fetching

    const calculateAge = (birthDate: string): number => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    // Function to fetch city name using Nominatim
    const fetchCityName = async (latitude: number, longitude: number): Promise<string> => {
        try {
            const response = await axios.get<GeocodeResponse>(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
            );
            const { city, town, village } = response.data.address;
            return city || town || village || 'Unknown';
        } catch (err) {
            console.log('Error fetching city:', err);
            return 'Unknown';
        }
    };

    // // Fetch nearby users and their city names
    // useEffect(() => {
    //     mutate(
    //         {
    //             url: '/users/nearby',
    //             method: 'POST',
    //             showToast: false,
    //             data: {
    //                 radius: radius,
    //             },
    //         },
    //         {
    //             onSuccess: async (response) => {
    //                 console.log(response.data, 'response.data');
    //                 const users = response.data as NearbyUser[];
    //                 if (users.length === 0) {
    //                     setNearbyUsers([]);
    //                     return; // No users, skip city fetching
    //                 }
    //                 setIsCityFetching(true); // Start city fetching
    //                 const usersWithCities = await Promise.all(
    //                     users.map(async (user) => ({
    //                         ...user,
    //                         city: await fetchCityName(user.location.latitude, user.location.longitude),
    //                     }))
    //                 );
    //                 setNearbyUsers(usersWithCities);
    //                 setIsCityFetching(false); // City fetching complete
    //             },
    //             onError: (err) => {
    //                 console.log('Error fetching nearby:', err.message);
    //                 setIsCityFetching(false); // Ensure city fetching is reset on error
    //             },
    //         }
    //     );
    // }, [mutate, radius]);

    // Add this new state
    const [refreshing, setRefreshing] = useState(false);

    // Create a separate function to fetch users (for reuse in pull-to-refresh)
    const fetchNearbyUsers = () => {
        setRefreshing(true); // Show refresh loader
        mutate(
            {
                url: '/users/nearby',
                method: 'POST',
                showToast: false,
                data: {
                    radius: radius,
                },
            },
            {
                onSuccess: async (response) => {
                    const users = response.data as NearbyUser[];
                    if (users.length === 0) {
                        setNearbyUsers([]);
                        setRefreshing(false);
                        return;
                    }

                    setIsCityFetching(true);
                    const usersWithCities = await Promise.all(
                        users.map(async (user) => ({
                            ...user,
                            city: await fetchCityName(user.location.latitude, user.location.longitude),
                        }))
                    );
                    setNearbyUsers(usersWithCities);
                    setIsCityFetching(false);
                    setRefreshing(false);
                },
                onError: (err) => {
                    console.log('Error fetching nearby:', err.message);
                    setIsCityFetching(false);
                    setRefreshing(false);
                },
            }
        );
    };

    // useEffect to trigger once on mount
    useEffect(() => {
        fetchNearbyUsers();
    }, [radius]);
    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={fetchNearbyUsers} />
            }>
            {isPending || isCityFetching ? (
                Array.from({ length: 5 }).map((_, index) => (
                    <AroundMeCardSkeleton key={index} />
                ))
            ) : nearbyUsers.length > 0 ? (
                nearbyUsers.map((item, index) => (
                    console.log(item.id),
                    <AroundMeCard
                        receiverId={item.id}
                        key={item.id}
                        age={calculateAge(item.birthDate) || 18}
                        location={item.city || 'Unknown'}
                        name={item.firstName || "User"}
                        image={item.profilePictureUrl || require("@/assets/images/cardimg2.png")}
                    />
                ))
            ) : (
                <Text style={styles.emptyText}>No users found nearby.</Text>
            )}
            <Toast />
        </ScrollView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        flexDirection: "column",
        gap: 16
    },
    userCard: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    userDistance: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 16,
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        marginVertical: 16,
    },
});

export default NearbyUsersScreen;