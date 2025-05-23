import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { isTokenValid } from '../utils/jwtUtils';

export interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    login: (newToken: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    // Check login status on app start
    useEffect(() => {
        const checkLoginStatus = async () => {

            try {
                const storedToken = await AsyncStorage.getItem('idToken');
                await new Promise(resolve => setTimeout(resolve, 3000));
                if (storedToken && isTokenValid(storedToken)) {
                    setToken(storedToken);
                    setIsLoggedIn(true);
                } else {
                    await AsyncStorage.removeItem('idToken');
                    setIsLoggedIn(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'OnboardingScreen' }],
                    });
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };
        checkLoginStatus();
    }, [navigation]);

    // Handle login
    const login = async (newToken: string) => {
        try {
            await AsyncStorage.setItem('idToken', newToken);
            setToken(newToken);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    // Handle logout
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('idToken');
            setToken(null);
            setIsLoggedIn(false);
            navigation.reset({
                index: 0,
                routes: [{ name: 'OnboardingScreen' }],
            });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Monitor token expiration
    useEffect(() => {
        const checkTokenExpiration = async () => {
            if (token && !isTokenValid(token)) {
                await logout();
            }
        };
        checkTokenExpiration();
        const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [token]);

    const value: AuthContextType = { isLoggedIn, token, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};